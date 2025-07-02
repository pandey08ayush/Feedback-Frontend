import { useState } from "react";
import HistoryPanel from "../components/HistoryPanel";

export default function HistoryPage() {
  const [history, setHistory] = useState([
    "Improve UI responsiveness",
    "Add token refresh logic",
    "Test error boundaries",
  ]); // you can later fetch real data from context or backend

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start px-4 py-6">
      <div className="w-full max-w-md">
        <HistoryPanel history={history} />
      </div>
    </div>
  );
}
