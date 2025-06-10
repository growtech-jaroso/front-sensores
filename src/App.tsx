import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from "./providers/UserProvider";
import AppRouter from "./routes/Router";

export default function App() {
  return (
    <Router>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </Router>
  );
}
