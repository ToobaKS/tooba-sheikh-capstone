import { useRef, useEffect } from "react";
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
          <div
            key={index}
            className={`chat-bubble ${
              msg.sender === "user" ? "chat-bubble--user" : "chat-bubble--bot"
            }`}
          >
            <p>{msg.message}</p>
            <span className="chat-bubble__timestamp">{msg.timestamp}</span>
          </div>
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
