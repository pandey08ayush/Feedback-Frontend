import { useEffect, useState } from "react";
import FeedbackForm from "../components/FeedbackForm";
import ChatWindow from "../components/ChatWindow";
import HistoryPanel from "../components/HistoryPanel";
import { useAppContext } from "../context/AppContext";

export default function Home() {
  const {
    user,
    showUserLogin,
    setShowUserLogin,
    history,
    fetchHistory,
  } = useAppContext();

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    if (!user) {
      setShowUserLogin(true);
      return;
    }

      if (user) {
    fetchHistory();
      }
  }, [user]);

  const handleFeedback = (aiFeedback) => {
    const newEntry = { user: feedbacks.length + 1, ai: aiFeedback };
    setFeedbacks((prev) => [...prev, newEntry]);
    // Optimistically update local history (you can also call fetchHistory again if needed)
    // This line just updates local display instantly
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      {/* Sidebar: Desktop */}
      <div className="hidden md:block md:w-1/4 border-r bg-white">
        <HistoryPanel history={history} />
      </div>

      {/* Mobile History Panel */}
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
