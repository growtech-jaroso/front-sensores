import React, { useState } from "react";

interface FormularioProps {
  onSubmit: (email: string, password: string) => void;
  error: string;
}

const Formulario: React.FC<FormularioProps> = ({ onSubmit, error }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col space-y-5">
      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-6 py-4 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-lg focus:outline-none focus:border-green-500 focus:bg-white"
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full px-6 py-4 rounded-lg bg-gray-100 border border-gray-300 placeholder-gray-500 text-lg focus:outline-none focus:border-green-500 focus:bg-white"
      />
      {error && <p className="text-red-500 text-center font-semibold">{error}</p>}
      <button
        type="submit"
        className="w-full py-4 cursor-pointer bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default Formulario;
