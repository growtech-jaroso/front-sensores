import "./index.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow p-6 bg-gray-100">
          <Dashboard />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
