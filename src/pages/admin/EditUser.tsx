import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import Layout from "../../layout/Layout";

export default function EditUser() {
  const navigate = useNavigate();
  const { userId } = useParams();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    role: "USER",
  });

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get(`/users/${userId}`);
        const user = res.data?.data;

        setForm({
          username: user.username || "",
          email: user.email || "",
          password: "",
          confirm_password: "",
          role: user.role || "USER",
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setMessage({ type: "error", text: "Error al cargar el usuario." });
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    const { username, email, role, password, confirm_password } = form;

    // ✅ Solo validamos si se están escribiendo
    const isPasswordBeingChanged = password.trim() !== "" || confirm_password.trim() !== "";

    if (isPasswordBeingChanged && password !== confirm_password) {
      return setMessage({ type: "error", text: "Las contraseñas no coinciden." });
    }

    setSubmitting(true);

    try {
      const payload: Record<string, string> = {
        username: username.trim(),
        email: email.trim(),
        role,
        password: password.trim(),
        confirm_password: confirm_password.trim(),
      };

      console.log("📦 Payload enviado:", payload);

      await axiosClient.put(`/users/${userId}`, payload);
      setMessage({ type: "success", text: "Usuario actualizado correctamente." });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("❌ Error completo:", error);
      const backendErrors = error.response?.data?.errors;
      const message =
        backendErrors && Array.isArray(backendErrors)
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            backendErrors.map((err: any) => err.message).join(" | ")
          : error.response?.data?.message || "Error al actualizar el usuario.";
      setMessage({ type: "error", text: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md animate-fadeIn">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>

        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center text-sm text-gray-600 cursor-pointer hover:text-green-600 transition"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Volver
        </button>

        <h2 className="text-2xl font-bold text-green-700 mb-6">✏️ Editar Usuario</h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando usuario...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <input
                type="password"
                name="confirm_password"
                value={form.confirm_password}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
              >
                <option value="USER">Usuario</option>
                <option value="SUPPORT">Soporte</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {submitting ? "Guardando..." : "Guardar Cambios"}
            </button>

            {message && (
              <div
                className={`flex items-center gap-2 mt-4 text-sm px-4 py-2 rounded-md ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-red-100 text-red-700 border border-red-300"
                }`}
              >
                {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                <span>{message.text}</span>
              </div>
            )}
          </form>
        )}
      </div>
    </Layout>
  );
}
