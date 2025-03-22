import { useEffect, useState } from "react";
import ChatCard from "../../components/ChatCard/ChatCard";
import ChatBubble from "../../components/ChatBubble/ChatBubble";
import { fetchChatHistory, chatWithBot } from "../../util/api";
import "./ChatBotPage.scss";

function ChatBotPage() {
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await fetchChatHistory();
        setChatHistory(history);
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };
    loadHistory();
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      sender: "user",
      message: newMessage,
      timestamp: new Date().toLocaleString(),
    };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const botResponse = await chatWithBot(newMessage);
      const botMessage = {
        sender: "bot",
        message: botResponse.message,
        timestamp: new Date().toLocaleString(),
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message to bot:", error);
    }

    setNewMessage("");
  };

  return (
    <main className="chatbot-page">
      <h1 className="chatbot-page__title">AI Buddy</h1>
      <ChatCard>
        <div className="chatbot-page__chat-window">
          {chatHistory.map((msg, index) => (
            <ChatBubble
              key={index}
              sender={msg.sender}
              message={msg.message}
              timestamp={msg.timestamp}
            />
          ))}
        </div>
        <div className="chatbot-page__input-bar">
          <input
            type="text"
            placeholder="Type a message..."
            className="chatbot-page__input"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button className="chatbot-page__send" onClick={handleSend}>
            Send
          </button>
        </div>
      </ChatCard>
    </main>
  );
}

export default ChatBotPage;

