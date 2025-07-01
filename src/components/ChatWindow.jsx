// components/ChatWindow.jsx
export default function ChatWindow({ feedbacks }) {
  return (
    <div className="space-y-4">
      {feedbacks.length === 0 && (
        <p className="text-gray-500">No feedback yet. Submit something!</p>
      )}
      {feedbacks.map((f, i) => (
        <div key={i} className="bg-white p-4 rounded shadow">
          <p className="font-semibold">Feedback {i + 1}</p>
          <p className="text-gray-700 mt-2">{f.ai}</p>
        </div>
      ))}
    </div>
  );
}
