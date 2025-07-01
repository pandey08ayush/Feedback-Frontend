import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export default function FeedbackForm({ onFeedback }) {
  const [text, setText] = useState("");
  const { user, axios, setShowUserLogin } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first to submit feedback.");
      setShowUserLogin(true); // open login modal
      return;
    }

    if (!text.trim()) {
      toast.error("Please enter some feedback text.");
      return;
    }

    try {
      const { data } = await axios.post("/api/submission/feedback", { text });
      console.log("API response:", data);

      if (data.success && data.submission?.feedback) {
        console.log("AI Feedback:", data.submission.feedback);
        onFeedback(data.submission.feedback);
        setText("");
      } else {
        toast.error(data.message || "Failed to submit feedback.");
      }
    } catch (err) {
      console.error("Error submitting feedback:", err);
      toast.error("Something went wrong while submitting feedback.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        className="flex-1 border rounded p-2"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write your feedback..."
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
