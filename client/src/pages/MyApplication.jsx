import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";

const MyApplication = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`/users/${user.id}`);
        const userData = response.data;

        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (user && user.id) {
      fetchUserData();
    }
  }, [user, setUser]);

  const handleDeleteApplication = async (user, application) => {
    try {
      const userId = user._id;
      const applicationId = application._id;
      await axios.delete(`/users/${userId}/applications/${applicationId}`);
      const updatedUser = {
        ...user,
        applications: user.applications.filter(
          (app) => app._id !== applicationId
        ),
      };
      setUser(updatedUser);
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };
  const ReloadButton = () => {
    const handleReloadClick = () => {
      window.location.reload();
    };

    return (
      <div className="w-32 h-22 text-center bg-red-200 rounded p-2">
        <button onClick={handleReloadClick}>Reload Page</button>
      </div>
    );
  };

  return (
    <div className="container w-10/12 mx-auto mt-6">
      {user ? (
        <div className="applications-list flex flex-col items-center p-10">
          <h2 className="opacity-40">Användarnamn: {user.name}</h2>
          <h3 className="">Applications:</h3>
          {user.applications ? (
            user.applications.map((application) => (
              <div
                key={application._id}
                className="application-box bg-gray-200 p-6 mt-6 flex flex-col"
              >
                <p className="text-center opacity-60">
                  appId: {application._id}
                </p>
                {application.images && application.images.length > 0 ? (
                  <div>
                    <img
                      className="p-1 rounded-2xl object-cover h-36 w-96"
                      src={application.images[0].data[0]}
                      alt={`Image`}
                      onError={(e) => console.error("Error loading image:", e)}
                    />
                  </div>
                ) : (
                  <div>
                    <p>No images found</p>
                    <ReloadButton />
                  </div>
                )}
                <p className="font-bold">
                  {application.street + " " + application.streetNumber}
                </p>
                <p>{application.unitType}</p>
                <p>{application.zipcode}</p>
                <p>{application.area}</p>
                {application.isOpen === false ? (
                  <div className="bg-red-200 text-center">
                    <p>False</p>
                  </div>
                ) : (
                  <div className="bg-green-200 text-center">
                    <p>True</p>
                  </div>
                )}

                <button
                  onClick={() => handleDeleteApplication(user, application)}
                  className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete Application
                </button>
              </div>
            ))
          ) : (
            <p>No applications found</p>
          )}
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </div>
  );
};

export default MyApplication;
