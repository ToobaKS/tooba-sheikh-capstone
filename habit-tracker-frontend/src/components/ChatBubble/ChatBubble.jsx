import "./ChatBubble.scss";

function ChatBubble({ sender, message, timestamp }) {
  const isUser = sender === "user";

  return (
    <div
      className={`chat-bubble ${
        isUser ? "chat-bubble--user" : "chat-bubble--bot"
      }`}
    >
      <div className="chat-bubble__typing-indicator">
        <p className="chat-bubble__message">{message}</p>
        <span className="chat-bubble__timestamp">
          {new Date(timestamp).toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

export default ChatBubble;
