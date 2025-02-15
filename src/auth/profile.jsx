import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
// profile component
const Profile = () => {
  // get all the required states and funtion from Auth0

  const { user, isAuthenticated, isLoading } = useAuth0();
  // laoding
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  // console.log(user);

  return (
    isAuthenticated && (
      <div>
        {/* {profile } */}
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
