
import { useEffect, useState } from "react";
import "./ChatHistory.css";

function ChatHistory({ currentUser }) {
  const userId = currentUser?.userId || "unknown";
  const storageKey = `unicareerChat_${userId}`;

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      const parsed = saved ? JSON.parse(saved) : [];

      setMessages(
        Array.isArray(parsed)
          ? parsed.filter(
              (item) =>
                item.role === "user" ||
                item.role === "assistant"
            )
          : []
      );
    } catch {
      setMessages([]);
    }
  }, [storageKey]);

  const conversationMessages = messages.filter(
    (message) =>
      message.role === "user" ||
      message.role === "assistant"
  );

  return (
    <section className="chat-history-page">
      <div className="chat-history-heading">
        <span>YOUR PREVIOUS CONVERSATIONS</span>
        <h2>Chat History</h2>
        <p>Review your previous conversations with UniCareer AI.</p>
      </div>

      {conversationMessages.length === 0 ? (
        <div className="chat-history-empty">
          <div>▤</div>
          <h3>No Chat History Yet</h3>
          <p>
            Your conversations with AI Career Assistant
            will appear here.
          </p>
        </div>
      ) : (
        <div className="chat-history-list">
          {conversationMessages.map((message, index) => (
            <div
              className={`history-message ${
                message.role === "user"
                  ? "history-user"
                  : "history-ai"
              }`}
              key={index}
            >
              <div className="history-message-top">
                <span>
                  {message.role === "user"
                    ? "You"
                    : "UniCareer AI"}
                </span>
                <span>
                  {message.role === "user" ? "User" : "Assistant"}
                </span>
              </div>

              <p>{message.content}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default ChatHistory;
