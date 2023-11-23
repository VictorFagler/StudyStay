import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const MyApplication = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      toast.success("Ansökan borttagen");
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className="container w-10/12 mx-auto my-6 mb-14 flex flex-col items-center justify-center">
      <h2 className="text-2xl md:text-4xl lg:text-6xl">Mina ansökningar</h2>
      <p>
        Nedan kan du se lägenheter som du har ansökt om och vad det är för
        status idag
      </p>
      {user ? (
        <div className="applications-list w-full lg:max-w-xl rounded-2xl">
          {user.applications ? (
            user.applications.map((application) => (
              <div
                key={application._id}
                className="application-box mt-6 flex flex-col pb-2 w-full rounded-xl"
              >
                {application.images && application.images.length > 0 ? (
                  <div className="flex w-100 h-36 overflow-hidden justify-center">
                    <img
                      className="object-cover w-full rounded-lg"
                      src={application.images[0].data}
                      alt={`Image`}
                      onError={(e) => console.error("Error loading image:", e)}
                    />
                  </div>
                ) : (
                  <div>
                    <p>No images found</p>
                  </div>
                )}
                <div className="grid grid-cols-2">
                  <Link to={`/listings/${application.listingId}`}>
                    <div className="py-2 pl-4 flex flex-col left">
                      <p className="font-bold">
                        {application.street + " " + application.streetNumber}
                      </p>
                      <p>{application.zipcode}</p>
                      <p>{application.area}</p>
                    </div>
                  </Link>
                  <div className="py-2 px-4 flex flex-col right justify-between text-right ml-auto">
                    {application.status === "denied" ? (
                      <>
                        <div className="flex items-center ml-auto">
                          <div className="bg-red-500 w-4 h-4 rounded-full mr-2"></div>
                          <div>
                            <p>Ej godkänd</p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            handleDeleteApplication(user, application)
                          }
                          className="mt-2 bg-primary text-white py-0.5 px-4 w-32 rounded-2xl shadow-md shadow-gray-500"
                        >
                          TA BORT
                        </button>
                      </>
                    ) : application.status === "pending" ? (
                      <>
                        <div className="flex items-center ml-auto">
                          <div className="bg-yellow-600 w-4 h-4 rounded-full mr-2"></div>
                          <div>
                            <p>Obehandlad</p>
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            handleDeleteApplication(user, application)
                          }
                          className="mt-2 bg-primary text-white py-0.5 px-4 w-32 rounded-2xl shadow-md shadow-gray-500"
                        >
                          TA BORT
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center ml-auto">
                          <div className="bg-green-500 w-4 h-4 rounded-full mr-2"></div>
                          <div className="">
                            <p>Godkänd</p>
                          </div>
                        </div>
                        <Link to={`/accepted/${application._id}`}>
                          <button className="mt-2 bg-primary text-white py-0.5 px-4 w-32 rounded-2xl shadow-md shadow-gray-500">
                            GÅ VIDARE
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
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
