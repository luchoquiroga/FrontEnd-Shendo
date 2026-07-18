import { useState, useEffect } from "react";
// Usamos ../ para salir de la carpeta views y buscar en data/components
import { INITIAL_ORDERS, INITIAL_PRODUCTS } from "../data/mockData";
import StoreToggle from "../components/StoreToggle";
// Estos quedan con ./ porque ya estamos adentro de views junto a ellos
import OrdersView from "./OrdersView";
import ProductsView from "./ProductsView";

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(true);
  const [tab, setTab] = useState("orders");
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  
  // 1. Estado para el modo oscuro
  const [isDark, setIsDark] = useState(true);

  // 2. Efecto para aplicar la clase 'dark' al HTML
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Modificado para recibir el objeto completo con la estructura de la BD
  function addProduct(nuevoProducto) {
    setProducts((prev) => [{ id_producto: Date.now(), ...nuevoProducto }, ...prev]);
  }

  // 1. Aceptar cambia el paso de 0 a 1 (ahora usa id_pedido y estado)
  function acceptOrder(id_pedido) {
    setOrders((prev) =>
      prev.map((o) => (o.id_pedido === id_pedido ? { ...o, estado: 1 } : o))
    );
  }

  // 2. Rechazar elimina el pedido de la vista actual
  function rejectOrder(id_pedido) {
    setOrders((prev) => prev.filter((o) => o.id_pedido !== id_pedido));
  }

  // 3. Avanzar mueve los pedidos desde el paso 1 al 4
  function advanceOrder(id_pedido) {
    setOrders((prev) =>
      prev.map((o) => (o.id_pedido === id_pedido && o.estado > 0 && o.estado < 4 ? { ...o, estado: o.estado + 1 } : o))
    );
  }

  return (
    // Agregamos dark:bg-gray-900 al fondo global
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-start justify-center py-0 sm:py-6 transition-colors duration-300">
      
      {/* Agregamos dark:bg-gray-800 y dark:text-white al panel central */}
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 dark:text-gray-100 min-h-screen sm:min-h-0 sm:rounded-3xl sm:shadow-xl overflow-hidden flex flex-col transition-colors duration-300">
        
        {!isOpen && (
          <div className="bg-red-50 dark:bg-red-900/30 border-b border-red-100 dark:border-red-800 text-red-600 dark:text-red-400 text-xs font-medium text-center py-2 px-4">
            ⚠ Comercio cerrado — los clientes no pueden ver tu tienda
          </div>
        )}
        
        {/* Header actualizado con el botón de Tema */}
        <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-800 z-10 transition-colors duration-300">
          <div className="flex items-center gap-2">
            <div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                shen<span className="text-emerald-500">do</span>
              </span>
              <span className="text-xs text-gray-400 ml-1.5">· panel</span>
            </div>
            
            {/* Botón Luna/Sol */}
            <button 
              onClick={() => setIsDark(!isDark)}
              className="ml-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-300"
              title="Cambiar tema"
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
            <OrdersView 
              orders={orders} 
              onAccept={acceptOrder} 
              onReject={rejectOrder} 
              onAdvance={advanceOrder} 
            />
          ) : (
            <ProductsView products={products} onAddProduct={addProduct} />
          )}
        </main>

      </div>
    </div>
  );
}