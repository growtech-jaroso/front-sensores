// App.tsx
import PlantationTable from "./components/PlantationTable";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Layout>
      <PlantationTable plantations={[
        { id: "1", nombre: "Planta 1", ubicacion: "Madrid", estado: "Activo", temperatura: 25, humedad: 60 },
        { id: "2", nombre: "Planta 2", ubicacion: "Barcelona", estado: "Inactivo", temperatura: 20, humedad: 70 },
        { id: "3", nombre: "Planta 3", ubicacion: "Valencia", estado: "Activo", temperatura: 30, humedad: 80 },
        { id: "4", nombre: "Planta 4", ubicacion: "Sevilla", estado: "Inactivo", temperatura: 22, humedad: 65 },
      ]} />
      <Dashboard />
    </Layout>
  );
}
