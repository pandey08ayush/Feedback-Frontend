import { useEffect, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import ChatWindow from "../components/ChatWindow";
import HistoryPanel from "../components/HistoryPanel";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, axios, showUserLogin, setShowUserLogin } = useAppContext();
  const [feedbacks, setFeedbacks] = useState([]);
  const [history, setHistory] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      setShowUserLogin(true);
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await axios.get("/api/submission/history");
        console.log(res.data.submission);
        if (res.data.success) {
          const aiFeedbacks = res.data.history.map((item) => item.text);
          setHistory(aiFeedbacks);
        }
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };

    fetchHistory();
  }, [user, navigate, showUserLogin]);

  const handleFeedback = (aiFeedback) => {
    const newEntry = { user: feedbacks.length + 1, ai: aiFeedback };
    setFeedbacks((prev) => [...prev, newEntry]);
    setHistory((prev) => [aiFeedback, ...prev.slice(0, 4)]);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar: Visible on md+ screens, hidden on mobile */}
      <div className="hidden md:block md:w-1/4 border-r bg-white">
        <HistoryPanel history={history} />
      </div>

      {/* Mobile History Panel on top (optional) */}
      <div className="block md:hidden border-b">
        <HistoryPanel history={history} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-4 py-3 text-base md:text-lg font-semibold shadow-sm">
          Welcome, {user?.email || "User"}
        </header>

        <main className="flex-1 overflow-y-auto px-4 py-3">
          <ChatWindow feedbacks={feedbacks} />
        </main>

        <footer className="border-t bg-white px-4 py-3">
          <FeedbackForm onFeedback={handleFeedback} />
        </footer>
      </div>
    </div>
  );
}
