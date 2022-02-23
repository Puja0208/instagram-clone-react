import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useEffect } from "react/cjs/react.development";

export async function doesUsernameExists(username) {
  const db = getFirestore();
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("username", "==", username));
  const querySnapshot = await getDocs(q);
  let userData;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots

    userData = doc.data();
  });
  if (userData) return Object.getOwnPropertyNames(userData).length;
  else {
    return false;
  }
}

export async function getUserByUserId(uid) {
  const db = getFirestore();
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("userId", "==", uid));
  const querySnapshot = await getDocs(q);
  let userData = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    userData.push({ ...doc.data(), docId: doc.id });
  });
  return userData;
}

export async function getUserFollowedPhotos(userId, followingUserIds) {
  const db = getFirestore();

  const photosRef = collection(db, "photos");

  let userFollowedPhotos = [];

  const q = query(photosRef, where("userId", "in", followingUserIds));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    userFollowedPhotos.push({
      ...doc.data(),
      docId: doc.id,
    });
  });
  const photosWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);

      const username = user[0].username;
      return {
        username,
        ...photo,
        userLikedPhoto,
      };
    })
  );
  return photosWithUserDetails;
}
