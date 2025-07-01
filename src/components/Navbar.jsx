import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, setShowUserLogin, navigate, axios } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <Link to="/">
        <h2 className="text-2xl font-bold text-primary">AI Feedback</h2>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        <Link to="/">Home</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/history" onClick={() => setOpen(false)}>History</Link>


        {user ? (
          <button
            onClick={logout}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-full"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <div className="sm:hidden flex items-center gap-4">
        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="21" height="1.5" rx=".75" fill="#426287" />
            <rect x="8" y="6" width="13" height="1.5" rx=".75" fill="#426287" />
            <rect x="6" y="13" width="15" height="1.5" rx=".75" fill="#426287" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-4 px-6 text-sm sm:hidden z-50`}
      >
        <Link to="/" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/feedback" onClick={() => setOpen(false)}>Feedback</Link>
        <Link to="/history" onClick={() => setOpen(false)}>History</Link>


        {user ? (
          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="text-red-600"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserLogin(true);
            }}
            className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
