import { useRef, useEffect } from "react";
import ChatBubble from "../ChatBubble/ChatBubble";
import "./ChatCard.scss";

function ChatCard({ chatHistory, newMessage, setNewMessage, handleSend }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory]);

  return (
    <div className="chat-card">
      <div className="chat-card__chat-window" ref={scrollRef}>
        {chatHistory.map((msg, index) => (
          <ChatBubble
            key={index}
            sender={msg.sender}
            message={msg.message}
            timestamp={msg.timestamp}
          />
        ))}
      </div>

      <div className="chat-card__input-bar">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-card__input"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="chat-card__send" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatCard;
