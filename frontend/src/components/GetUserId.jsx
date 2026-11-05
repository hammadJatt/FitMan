import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";

const GetUserId = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      console.log("Clerk User ID:", user.id); // <-- Copy this ID
      alert(`Your Clerk User ID: ${user.id}`); // Optional alert
    }
  }, [user]);

  return <div>Check your console for the Clerk User ID</div>;
};

export default GetUserId;
