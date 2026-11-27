import { useState } from "react";
import "./CareerChat.css";

function CareerChat() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    let reply = "Please ask a career-related question.";

    if (message.toLowerCase().includes("career")) {
      reply = "Choose a career based on your interests and skills.";
    } else if (message.toLowerCase().includes("skill")) {
      reply = "Learn new skills and practice with real projects.";
    } else if (message.toLowerCase().includes("job")) {
      reply = "Prepare your CV and apply for suitable jobs.";
    } else if (message.toLowerCase().includes("internship")) {
      reply = "Build your skills and apply for internships.";
    } else if (message.toLowerCase().includes("hello")) {
      reply = "Hello! How can I help you with your career?";
    }

    setChats([...chats, { user: message, bot: reply }]);
    setMessage("");
  };

  return (
    <div className="career-chat">
      <h1>UniCareer</h1>
      <h2>Career Assistant</h2>

      <div className="chat-box">
        <p className="bot-message">
          Hello! Ask me about your career.
        </p>

        {chats.map((chat, index) => (
          <div key={index}>
            <p className="user-message">
              You: {chat.user}
            </p>

            <p className="bot-message">
              Career Assistant: {chat.bot}
            </p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type your message..."
        />

        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default CareerChat;