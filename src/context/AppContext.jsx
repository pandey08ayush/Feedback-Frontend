import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

// Axios global config
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext(null);

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);

  // ✅ Fetch user when app loads (used in Home, Navbar etc.)
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
      } else {
        setUser(null);
        console.log(data.message);
      }
    } catch (error) {
      setUser(null);
      console.log("Auth Error:", error.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 🧠 Single place for all app-level shared data and functions
  const value = {
    navigate,
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    axios,
    fetchUser, // export it in case we want to refetch user after login
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
