import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

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
