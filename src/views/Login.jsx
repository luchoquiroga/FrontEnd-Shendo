import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // En el futuro, aquí enviaremos el usuario/contraseña a Python para validar.
    // Por ahora, simulamos un ingreso exitoso y redirigimos al panel:
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-sm w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 transition-colors duration-300">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            shen<span className="text-emerald-500">do</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Panel de Comercios
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="username">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              placeholder="Ej: rotiseria_centro"
              required
              className="w-full px-4 py-3 rounded-xl text-sm border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl text-sm border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full py-3 bg-emerald-500 text-white font-semibold rounded-xl hover:bg-emerald-600 active:scale-[0.98] transition-all duration-150"
          >
            Ingresar
          </button>
        </form>

      </div>
    </div>
  );
}