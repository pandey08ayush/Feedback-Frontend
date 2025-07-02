import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Feedback from "./components/FeedbackForm";
import HistoryPanel from "./components/HistoryPanel";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Auth from "./modals/Auth";
import { useAppContext } from "./context/AppContext";

const App = () => {
  const { showUserLogin } = useAppContext();

  return (
    <div className="text-default min-h-screen">
      <Navbar /> {/* ✅ Always visible */}
      {showUserLogin && <Auth />}
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/feedback"
          element={
            <div className="px-6 md:px-16 lg:px-24 xl:px-32">
              <Feedback />
            </div>
          }
        />
        <Route
          path="/history"
          element={
            <div className="px-6 md:px-16 lg:px-24 xl:px-32">
              <HistoryPanel />
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
