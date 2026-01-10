import { useState } from "react";
import { sendMessage } from "./api";
import "./style.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const [userName, setUserName] = useState("");
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (!userName) return;
    setStarted(true);
    setMessages([]); 
  };

  const handleSend = async () => {
    if (!input) return;

    setMessages(prev => [...prev, { sender: "user", text: input }]);

    const reply = await sendMessage(userName.toLowerCase(), input);

    setMessages(prev => [...prev, { sender: "bot", text: reply }]);
    setInput("");
  };

  // ----------- USER NAME SCREEN -----------
  if (!started) {
    return (
      <div className="chat-container">
        <h2>Welcome to Nova AI 🤖</h2>
        <p>Enter your name to start chat</p>

        <input
          placeholder="Your name..."
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />

        <button onClick={handleStart}>Start Chat</button>
      </div>
    );
  }

  // ----------- CHAT SCREEN -----------
  return (
    <div className="chat-container">
      <h2>Nova AI 💬</h2>
      <p>User: {userName}</p>

      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={m.sender}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="input-box">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
