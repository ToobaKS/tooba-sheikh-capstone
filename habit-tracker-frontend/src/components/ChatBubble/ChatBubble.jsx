import "./ChatBubble.scss";

function ChatBubble({ sender, message, timestamp }) {
  return (
    <div
      className={`chat-bubble ${
        sender === "user" ? "chat-bubble--user" : "chat-bubble--bot"
      }`}
    >
      <p className="chat-bubble__text">{message}</p>
      <span className="chat-bubble__timestamp">{timestamp}</span>
    </div>
  );
}

export default ChatBubble;
