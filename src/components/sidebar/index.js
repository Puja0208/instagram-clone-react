import React from "react";
import useUser from "../../hooks/use-user";
export default function Sidebar() {
  const { user: { docId, userId, following, username, fullName } = {} } =
    useUser();

  return <p>Hello from sidebar</p>;
}
