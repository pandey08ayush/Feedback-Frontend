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
  const [history, setHistory] = useState([]);

  // ✅ Fetch user when app loads (used in Home, Navbar etc.)
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth", { withCredentials: true });
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

  // fetch history
 const fetchHistory = async () => {
      try {
        const res = await axios.get("/api/submission/history", { withCredentials: true });
        console.log(res.data.history);
        if (res.data.success) {
          const aiFeedbacks = res.data.history.map((item) => item.text);
          setHistory(aiFeedbacks);
        }
      } catch (err) {
        console.error("Failed to fetch history", err);
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
    history,   
    fetchUser, // export it in case we want to refetch user after login
    fetchHistory
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
