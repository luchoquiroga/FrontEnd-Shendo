import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StoreToggle from "../components/StoreToggle";
import OrdersView from "./OrderView.jsx";
import ProductsView from "./ProductsView.jsx";
import { getProducts, createProduct } from "../services/productService";
import { getOrders, updateOrderStatus } from "../services/orderService";

export default function Dashboard() { //Esto sirve para mostrar el dashboard del comercio, 
  const navigate = useNavigate();    //con sus respectivos pedidos y productos.
  const [isOpen, setIsOpen] = useState(true);
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [isDark, setIsDark] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const usuario = JSON.parse(sessionStorage.getItem("usuario") || "null");

  
  useEffect(() => {
    if (!usuario) navigate("/");
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Carga pedidos, lo mismo que productos pero con pedidos. FIN :D
  useEffect(() => {
    if (!usuario) return;
    setLoadingOrders(true);
    getOrders()
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error cargando pedidos:", err))
      .finally(() => setLoadingOrders(false));
  }, []);

  // esta funcion carga los productos
  // El backend sabe de qué restaurante por el token.
  useEffect(() => {
    if (!usuario) return;
    setLoadingProducts(true);
    getProducts()
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error cargando productos:", err))
      .finally(() => setLoadingProducts(false));
  }, []);

  async function addProduct(nuevoProducto) {
    try {
      const creado = await createProduct(nuevoProducto);
      setProducts((prev) => [creado, ...prev]);
    } catch (err) {
      console.error("Error creando producto:", err);
    }
  }

  async function acceptOrder(id_pedido) {
    setOrders((prev) =>
      prev.map((o) => (o.id_pedido === id_pedido ? { ...o, estado: 1 } : o))
    );
    await updateOrderStatus(id_pedido, 1).catch(console.error);
  }

  function rejectOrder(id_pedido) {
    setOrders((prev) => prev.filter((o) => o.id_pedido !== id_pedido));
  }

  async function advanceOrder(id_pedido) {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id_pedido === id_pedido && o.estado > 0 && o.estado < 4) {
          const nuevoEstado = o.estado + 1;
          updateOrderStatus(id_pedido, nuevoEstado).catch(console.error);
          return { ...o, estado: nuevoEstado };
        }
        return o;
      })
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-start justify-center py-0 sm:py-6 transition-colors duration-300">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 dark:text-gray-100 min-h-screen sm:min-h-0 sm:rounded-3xl sm:shadow-xl overflow-hidden flex flex-col transition-colors duration-300">

        {!isOpen && (
          <div className="bg-red-50 dark:bg-red-900/30 border-b border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium text-center py-2 px-4">
            ⚠ Comercio cerrado — los clientes no pueden ver tu tienda
          </div>
        )}

        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 z-10 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                shen<span className="text-emerald-500">do</span>
              </span>
              {usuario?.nombre_restaurante && (
                <span className="text-xs text-gray-400 ml-1.5">· {usuario.nombre_restaurante}</span>
              )}
            </div>
            <button
              onClick={() => setIsDark(!isDark)}
              className="ml-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-300"
            >
              {isDark ? "🌙" : "☀️"}
            </button>
          </div>
          <StoreToggle isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />
        </header>

        <nav className="flex border-b border-gray-100 dark:border-gray-700">
          {[
            { key: "orders", label: "Pedidos" },
            { key: "products", label: "Productos" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`
                flex-1 py-3 text-sm font-medium transition-colors duration-150 border-b-2
                ${tab === key
                  ? "text-emerald-600 dark:text-emerald-400 border-emerald-500"
                  : "text-gray-400 dark:text-gray-500 border-transparent hover:text-gray-600 dark:hover:text-gray-300"
                }
              `}
            >
              {label}
            </button>
          ))}
        </nav>

        <main className="flex-1 p-4 overflow-y-auto">
          {tab === "orders" ? (
            loadingOrders
              ? <div className="text-center py-10 text-gray-400">Cargando pedidos...</div>
              : <OrdersView orders={orders} onAccept={acceptOrder} onReject={rejectOrder} onAdvance={advanceOrder} />
          ) : (
            loadingProducts
              ? <div className="text-center py-10 text-gray-400">Cargando productos...</div>
              : <ProductsView products={products} onAddProduct={addProduct} />
          )}
        </main>

      </div>
    </div>
  );
}