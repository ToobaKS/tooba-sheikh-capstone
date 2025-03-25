import { useEffect, useState } from "react";
import ChatCard from "../../components/ChatCard/ChatCard";
import { fetchChatHistory, chatWithBot } from "../../util/api";
import plant from "../../assets/svg/31.svg";
import table from "../../assets/images/34.png";
import backgroundDecor1 from "../../assets/svg/79.svg";
import backgroundDecor2 from "../../assets/svg/68.svg";
import backgroundDecor3 from "../../assets/svg/78.svg";
import "./ChatBotPage.scss";

function ChatBotPage() {
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const history = await fetchChatHistory();
        const formatted = history.flatMap((entry) => [
          {
            sender: "user",
            message: entry.user_message,
            timestamp: entry.timestamp,
          },
          {
            sender: "bot",
            message: entry.bot_response,
            timestamp: entry.timestamp,
          },
        ]);
        setChatHistory(formatted);
      } catch (error) {
        console.error("Error loading chat history:", error);
      }
    };
    loadHistory();
  }, []);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await chatWithBot(newMessage);

      const userMessage = {
        sender: "user",
        message: response.user_message,
        timestamp: response.timestamp,
      };

      const botMessage = {
        sender: "bot",
        message: response.bot_response,
        timestamp: response.timestamp,
      };

      setChatHistory((prev) => [...prev, userMessage, botMessage]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message to bot:", error);
    }
  };

  return (
    <>
      <main className="chatbot-page">
        <aside className="chatbot-page__decor">
          <img
            className="chatbot-page__decor-plant"
            src={plant}
            alt="Plant on table"
          />
          <img className="chatbot-page__decor-table" src={table} alt="Table" />
          {/* <img
            className="chatbot-page__decor-autumn"
            src={backgroundDecor1}
            alt="Table"
          /> */}
          {/* <img
            className="chatbot-page__decor-leaves"
            src={backgroundDecor2}
            alt="Table"
          /> */}
          <img
            className="chatbot-page__decor-heart"
            src={backgroundDecor3}
            alt="Table"
          />
        </aside>
        <h1 className="chatbot-page__title">Croot - AI companion</h1>
        <ChatCard
          className="chatbot-page__card"
          chatHistory={chatHistory}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleSend={handleSend}
        />
      </main>
    </>
  );
}

export default ChatBotPage;
