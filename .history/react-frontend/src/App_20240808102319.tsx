import { useSelector } from "react-redux";
import { RootState } from "./types/RootState";
import { Navigate } from "react-router-dom";
import ChatPage from "./pages/Chat/Chat-page";

const App = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? <ChatPage /> : <Navigate to="/login" replace={true} />;
};

export default App;
