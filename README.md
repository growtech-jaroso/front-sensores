# Web de sensores GrowTech Jaroso

## Development

### Requisitos
- Docker
- Docker Compose
- Node.js
- bun

### Instalación
- Clonar el repositorio
```bash
  git clone https://github.com/growtech-jaroso/front-sensores.git && cd front-sensores
```

- Instalar dependencias
```bash
  bun install
```

- Configurar variables de entorno
```bash
  cp .env.template .env
```

- Editar las variables de entorno del .env
- Ejecutar el proyecto
```bash
  docker compose up -d && bun run dev
```