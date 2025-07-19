import { createContext, useEffect, useState } from "react";
import { authApi } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { redirect } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authApi(API_PATHS.Auth.GET_PROFILE);
        if (response.status === 200) {
          setUser(response.data.user);
        }
        return null;
      } catch (error) {
        console.log(error);
        setUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);
  const updateUser = (userData) => {
    if (userData) {
      setUser(userData);
      setLoading(false);
    } else {
      return null;
    }
  };
  const clearUser = async () => {
    try {
      const response = await authApi.post(API_PATHS.Auth.LOGOUT); // this calls backend to clear cookie
      console.log(response);
      if (response.status === 200) {
        return redirect("/");
      }
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;
