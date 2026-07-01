import { useState, useEffect } from "react";
import { INITIAL_ORDERS, INITIAL_PRODUCTS } from "./data/mockData";
import StoreToggle from "./components/StoreToggle";
import OrdersView from "./views/OrdersView";
import ProductsView from "./views/ProductsView";

export default function App() {
  const [isOpen, setIsOpen] = useState(true);
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // 1. Aceptar cambia el estado de 0 a 1
  function acceptOrder(id_pedido) {
    setOrders((prev) =>
      prev.map((o) => (o.id_pedido === id_pedido ? { ...o, estado: 1 } : o))
    );
  }

  // 2. Rechazar elimina el pedido
  function rejectOrder(id_pedido) {
    setOrders((prev) => prev.filter((o) => o.id_pedido !== id_pedido));
  }

  // 3. Avanzar mueve los pedidos desde el estado 1 al 4
  function advanceOrder(id_pedido) {
    setOrders((prev) =>
      prev.map((o) => (o.id_pedido === id_pedido && o.estado > 0 && o.estado < 4 ? { ...o, estado: o.estado + 1 } : o))
    );
  }

  // Modificamos addProduct para usar snake_case
  function addProduct({ imagen_url, emoji, nombre, precio, categoria }) {
    setProducts((prev) => [{ 
      id_producto: Date.now(), 
      imagen_url, 
      emoji, 
      nombre, 
      precio, 
      categoria,
      disponible: true // Añadido del contrato original
    }, ...prev]);
  }

  // Modificamos editProduct para buscar por id_producto
  function editProduct(updatedProduct) {
    setProducts((prev) =>
      prev.map((p) => (p.id_producto === updatedProduct.id_producto ? updatedProduct : p))
    );
  }

  return (
    // Layout principal: Columna en móvil, Fila en escritorio
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col md:flex-row transition-colors duration-300">
      
      {/* Sidebar (Escritorio) / Header (Móvil) */}
      <aside className="w-full md:w-72 bg-white dark:bg-gray-800 border-b md:border-b-0 md:border-r border-gray-200 dark:border-gray-700 flex flex-col shrink-0 z-20">
        
        {/* Logo y Controles */}
        <div className="px-5 py-5 border-b border-gray-100 dark:border-gray-700 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xl font-semibold text-gray-900 dark:text-white">
                shen<span className="text-emerald-500">do</span>
              </span>
              <span className="text-sm text-gray-400 ml-1.5">· panel</span>
            </div>
            
            <button 
              onClick={() => setIsDark(!isDark)}
              className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-300"
              title="Cambiar tema"
            >
              {isDark ? "🌙" : "☀️"}
            </button>
          </div>
          
          <div className="flex items-center justify-between mt-2">
            <StoreToggle isOpen={isOpen} onToggle={() => setIsOpen((v) => !v)} />
          </div>
        </div>

        {/* Navegación (Horizontal en móvil, Vertical en escritorio) */}
        <nav className="flex md:flex-col p-2 gap-1 overflow-x-auto md:overflow-visible">
          {[
            { key: "orders", label: "Pedidos", icon: "📄" },
            { key: "products", label: "Productos", icon: "📦" },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`
                flex items-center gap-3 flex-1 md:flex-none px-4 py-3 text-sm font-medium rounded-xl transition-all duration-150
                ${tab === key
                  ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50"
                }
              `}
            >
              <span>{icon}</span>
              {label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Área Principal de Contenido */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {!isOpen && (
          <div className="bg-red-50 dark:bg-red-900/30 border-b border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-sm font-medium text-center py-2 px-4 shrink-0">
            ⚠ Comercio cerrado — los clientes no pueden ver tu tienda
          </div>
        )}

        {/* Título de la sección actual (Solo visible en escritorio para dar contexto) */}
        <header className="hidden md:block px-8 pt-8 pb-4 shrink-0">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Panel de {tab === 'orders' ? 'Pedidos' : 'Productos'}
          </h1>
        </header>

        {/* Contenedor scrolleable para las vistas */}
        <div className="flex-1 p-4 md:px-8 md:pb-8 overflow-y-auto">
          {tab === "orders" ? (
            <OrdersView 
              orders={orders} 
              onAccept={acceptOrder} 
              onReject={rejectOrder} 
              onAdvance={advanceOrder} 
            />
          ) : (
            <ProductsView 
    products={products} 
    onAddProduct={addProduct} 
    onEditProduct={editProduct} 
  />
          )}
        </div>
      </main>

    </div>
  );
}