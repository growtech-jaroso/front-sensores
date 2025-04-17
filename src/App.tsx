import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
// import Login from "./pages/Login";

export default function App() {
  return (
    <Layout>
      <Dashboard isSidebarOpen={false}/>
    </Layout>
  );
}
