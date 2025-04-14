import { serve } from "bun";
import index from "./index.html";

const server = serve({
  routes: {
    // index.html para todas las rutas no coincidentes.
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production",
});

console.log(`🚀 Servidor web corriendo en http://localhost:${server.port}`);
