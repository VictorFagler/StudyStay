import { React, useContext } from "react";
import { UserContext } from "../../context/userContext";

const MyProfile = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div>
        <h1>Min Profil</h1>
        {!!user && <h2>Välkommen {user.name} !</h2>}
      </div>
    </>
  );
};

export default MyProfile;
