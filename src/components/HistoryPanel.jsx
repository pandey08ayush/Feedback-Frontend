import { useAppContext } from "../context/AppContext";

export default function HistoryPanel({ history: propHistory }) {
  const { history: contextHistory } = useAppContext();

  // Use prop if passed, otherwise fallback to context
  const history = Array.isArray(propHistory) ? propHistory : contextHistory;
  const safeHistory = Array.isArray(history) ? history : [];

  return (
    <aside className="w-full md:w-72 bg-white border-r px-4 py-6 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">History</h2>
      <ul className="space-y-3">
        {safeHistory.length === 0 && (
          <li className="text-gray-500">No history yet.</li>
        )}

        {safeHistory.map((item, index) => {
          const text = typeof item === "string" ? item : item.text || item.input || JSON.stringify(item);
          return (
            <li
              key={index}
              className="text-sm bg-gray-100 p-2 rounded shadow-sm truncate"
              title={text}
            >
              {text}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
