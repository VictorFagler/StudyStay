import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/profile");
        setUser(response.data);
      } catch (error) {
        // Handle the error, e.g., by setting user to null or showing an error message.
        console.error("Error fetching user data:", error);
      }
    };

    // Only fetch user data if the user is not already set
    if (!user) {
      fetchUserData();
    }
  }, [user]); // Depend on 'user' to re-run when the user logs out and logs in

  
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
