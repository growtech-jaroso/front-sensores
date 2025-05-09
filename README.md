# 🌱 Growtech Jaroso - Frontend

Este es el repositorio del **frontend** del proyecto **Growtech Jaroso**. Aquí encontrarás todo lo necesario para levantar el entorno de desarrollo local utilizando [Vite](https://vitejs.dev/) y [Bun](https://bun.sh/).

## 🧰 Requisitos previos

- Tener instalado **[Bun](https://bun.sh/docs/installation)**.
- Tener acceso al archivo `.env` que contiene las variables de entorno necesarias para ejecutar el proyecto.
- Tener acceso a Docker Hub con las credenciales necesarias.

---

## ⚙️ Pasos para poner en funcionamiento el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/growtech-jaroso/front-sensores.git
cd front-sensores
```

### 2. Añadir el archivo .env
```bash
cp .env-template .env
```
- Luego, edita .env con las variables correspondientes.

### 3. Cambiar a la rama develop
```bash
git checkout develop
```

### 4. Instalar dependencias con Bun
```bash
bun install
```
### 5. Conectar con Docker Hub para instalar la imagen actual
```bash
docker login docker.project.comparitiko.dev
```
- Poner las credenciales que se te han otorgado

### 6. Poner en marcha los contenedores
```bash
docker compose up -d
```
- Instalará todo lo necesario para que la base de datos y el backend funcionen

### 7. Ejecutar el proyecto en desarrollo
```bash
bun dev
```
- Esto iniciará el servidor de desarrollo en http://localhost:5173




