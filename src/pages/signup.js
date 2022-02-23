import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import * as ROUTES from "../constants/routes";
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doesUsernameExists } from "../services/firebase";
function Signup() {
  const db = getFirestore();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid =
    username === "" ||
    fullName === "" ||
    password === "" ||
    emailAddress === "";

  const auth = getAuth();

  const handleSignUp = async (event) => {
    event.preventDefault();
    // check if the usernameExists
    const usernameExists = await doesUsernameExists(username);

    if (!usernameExists) {
      try {
        const createUserResult = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password
        );

        await updateProfile(createUserResult.user, {
          displayName: username,
        });
        await setDoc(
          doc(db, "users", `user-${username}`),
          {
            userId: createUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: [],
            followers: [],
            dataCreated: Date.now(),
          },
          { merge: true }
        );
        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setFullName("");
      setEmailAddress("");
      setPassword("");
      setError("That username is already taken, please try another!");
    }
  };

  useEffect(() => {
    document.title = "SIgn Up - Instagram";
  }, []);
  return (
    <div className="container flex  mx-auto max-w-xs items-center h-screen">
      <div className="flex flex-col">
        <div className="flex flex-col items-center bg-white p-4 border mb-4">
          <h1 className="flex justify-center w-full mt-2 w-6/12 mb-4">
            <img
              src={require("../images/logo.png")}
              alt="insta logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && (
            <p className="mb-4 text-xs text-red-500 text-center">{error}</p>
          )}
          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              placeholder="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value.toLowerCase())}
            />
            <input
              aria-label="Enter your full name"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              placeholder="Fullname"
            />
            <input
              aria-label="Enter your email address"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              value={emailAddress}
              placeholder="Email address"
              onChange={({ target }) =>
                setEmailAddress(target.value.toLocaleLowerCase())
              }
            />
            <input
              aria-label="Enter your password"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              type="submit"
              disabled={isInvalid}
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold ${
                isInvalid && " cursor-not-allowed opacity-50"
              } `}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            Don't have an account?{" "}
            <Link to={ROUTES.LOGIN} className="font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
