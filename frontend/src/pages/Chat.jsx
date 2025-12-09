import { useState } from "react";
import axios from "axios";
import Message from "../components/Message";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  async function ask() {
    if (!input) return;

    const userMsg = { role: "user", text: input };
    setMessages([...messages, userMsg]);

    const response = await axios.post("http://localhost:5000/api/search", {
      query: input
    });

    const botMsg = { role: "bot", text: response.data.answer };
    setMessages(prev => [...prev, botMsg]);
    setInput("");
  }

  return (
    <div className="chat-container">
      <h2>AI Search Assistant</h2>

      <div className="messages-box">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} text={m.text} />
        ))}
      </div>

      <div className="input-box">
        <input
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={ask}>Send</button>
      </div>
    </div>
  );
}
