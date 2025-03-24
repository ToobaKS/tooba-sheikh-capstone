import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HabitPage from "./pages/HabitPage/HabitPage";
import ChatBotPage from "./pages/ChatBotPage/ChatBotPage";
import TimeCapsulePage from "./pages/TimeCapsulePage/TimeCapsulePage";
import DataPage from "./pages/DataPage/DataPage";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const hideSidebar = ["/", "/login", "/register"].includes(location.pathname);

  return (
    <>
      {hideSidebar ? (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      ) : (
        <div className="app-container">
          <SideBar />
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/habit/:categoryName" element={<HabitPage />} />
            <Route path="/time-capsule" element={<TimeCapsulePage />} />
            <Route path="/chatbot" element={<ChatBotPage />} />
            <Route path="/data" element={<DataPage />} />
          </Routes>
        </div>
      )}
    </>
  );
}

export default App;
