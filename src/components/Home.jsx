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
      setShowUserLogin(true); // show login modal if not logged in
      return;
    }

    const fetchHistory = async () => {
      try {
        const res = await axios.get("/api/submission/history");
        console.log(res.data.submission)
        if (res.data.success) {
          const aiFeedbacks = res.data.history.map((item) => item.text);
          setHistory(aiFeedbacks);
        }
      } catch (err) {
        console.error("Failed to fetch history", err);
      }
    };

    fetchHistory();
  },[user,navigate,showUserLogin]);

  const handleFeedback = (aiFeedback) => {
    const newEntry = { user: feedbacks.length + 1, ai: aiFeedback };
    setFeedbacks((prev) => [...prev, newEntry]);
    setHistory((prev) => [aiFeedback, ...prev.slice(0, 4)]); // keep last 5
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <HistoryPanel history={history} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b px-6 py-4 shadow-sm text-lg font-semibold">
          Welcome, {user?.email || "User"}
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-4">
          <ChatWindow feedbacks={feedbacks} />
        </main>

        <footer className="border-t bg-white px-6 py-4">
          <FeedbackForm onFeedback={handleFeedback} />
        </footer>
      </div>
    </div>
  );
}
