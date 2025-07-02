// pages/FeedbackPage.jsx
import { useState } from "react";
import ChatWindow from "./ChatWindow";
import FeedbackForm from "./FeedbackForm";

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);

  const handleFeedback = (aiFeedback) => {
    const newEntry = { user: feedbacks.length + 1, ai: aiFeedback };
    setFeedbacks((prev) => [...prev, newEntry]);
  };

  return (
    <div className="min-h-screen p-4 max-w-3xl mx-auto space-y-6 bg-gray-50">
      <h1 className="text-xl font-bold">AI Feedback Chat</h1>
      <ChatWindow feedbacks={feedbacks} />
      <FeedbackForm onFeedback={handleFeedback} />
    </div>
  );
}
