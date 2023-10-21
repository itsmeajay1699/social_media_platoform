import React from "react";

const AuthenicateUser = async () => {
  try {
    const authUser = await fetch("http://localhost:3000/api/user-autenticate");

    if (authUser.status === 200) {
      const user = await authUser.json();
      console.log(user);
      return user;
    } else {
      console.error("Error fetching user data:", authUser.status);
      return null;
    }
  } catch (error) {
    return null;
  }
};

export default async function HomePage() {
  const user = await AuthenicateUser();

  return (
    <>
      <h1>This is the home page</h1>
      {user ? <p>{JSON.stringify(user)}</p> : <p>Error fetching user data</p>}
    </>
  );
}
