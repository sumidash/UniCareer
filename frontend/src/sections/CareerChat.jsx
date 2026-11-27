
import { useEffect, useRef, useState } from "react";
import "./CareerChat.css";

function CareerChat({ currentUser }) {
  const userId = currentUser?.userId || "unknown";
  const storageKey = `unicareerChat_${userId}`;

  const welcomeMessage = {
    role: "assistant",
    content: `Hello${currentUser?.fullName ? ` ${currentUser.fullName}` : ""}! I'm your UniCareer AI Career Assistant. Ask me anything about career paths, skills, learning plans, or professional development.`
  };

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [welcomeMessage];
    } catch {
      return [welcomeMessage];
    }
  });

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  }, [messages, storageKey]);

  const sendMessage = async (event) => {
    event.preventDefault();

    const message = input.trim();

    if (!message || isLoading) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: message }
    ];

    setMessages(updatedMessages);
    setInput("");
    setError("");
    setIsLoading(true);

    const history = messages
      .filter((item) => item.role === "user" || item.role === "assistant")
      .slice(1)
      .map((item) => ({
        role: item.role === "assistant" ? "model" : "user",
        parts: [{ text: item.content }]
      }));

    try {
      const response = await fetch("http://localhost:5000/api/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message,
          history
        })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to get an AI response.");
      }

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          content: data.reply
        }
      ]);
    } catch (requestError) {
  console.error("Career Chat Error:", requestError);

  setError(
    requestError.message ||
    "Unable to connect to the AI assistant. Please try again."
  );
} finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    if (isLoading) return;

    setMessages([welcomeMessage]);
    setError("");
    localStorage.removeItem(storageKey);
  };

  const suggestions = [
    "How can I become a frontend developer?",
    "What skills should I learn for my career?",
    "Help me choose a career path",
    "Create a learning plan for me"
  ];

  return (
    <section className="career-chat-page">
      <div className="career-chat-header">
        <div>
          <span className="career-chat-eyebrow">YOUR PERSONAL CAREER GUIDE</span>
          <h1>AI Career Assistant</h1>
          <p>Explore your future with personalized career guidance.</p>
        </div>

        <button
          type="button"
          className="career-chat-clear"
          onClick={clearChat}
          disabled={isLoading}
        >
          Clear Chat
        </button>
      </div>

      <div className="career-chat-card">
        <div className="career-chat-card-header">
          <div className="career-chat-avatar">✦</div>
          <div>
            <h3>UniCareer Assistant</h3>
            <span>
              <span className="career-chat-online-dot"></span>
              AI Assistant
            </span>
          </div>
        </div>

        <div className="career-chat-messages">
          {messages.map((message, index) => (
            <div
              className={`career-chat-message ${
                message.role === "user" ? "user-message" : "ai-message"
              }`}
              key={index}
            >
              {message.role === "assistant" && (
                <div className="career-chat-message-avatar">✦</div>
              )}

              <div className="career-chat-bubble">
                <span className="career-chat-sender">
                  {message.role === "user" ? "You" : "UniCareer AI"}
                </span>
                <p>{message.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="career-chat-message ai-message">
              <div className="career-chat-message-avatar">✦</div>
              <div className="career-chat-bubble">
                <span className="career-chat-sender">UniCareer AI</span>
                <div className="career-chat-typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="career-chat-suggestions">
            <h4>Try asking</h4>
            <div>
              {suggestions.map((suggestion) => (
                <button
                  type="button"
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="career-chat-error">
            {error}
          </div>
        )}

        <form className="career-chat-input-area" onSubmit={sendMessage}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask anything about your career..."
            rows="1"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage(event);
              }
            }}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
          >
            {isLoading ? "..." : "Send"}
            <span>➤</span>
          </button>
        </form>

        <p className="career-chat-footer-note">
          UniCareer AI can make mistakes. Review important career and education decisions carefully.
        </p>
      </div>
    </section>
  );
}

export default CareerChat;
