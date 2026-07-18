import OrderCard from "../components/OrderCard";

export default function OrdersView({ orders, onAccept, onReject, onAdvance }) {
  if (!orders.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl">
        <span className="text-5xl mb-4 opacity-50">📋</span>
        <p className="text-gray-500 dark:text-gray-400">No hay pedidos activos</p>
      </div>
    );
  }

  return (
    // Diseño responsivo: 1 columna en móvil, 2 en tablets, 3 o 4 en PC
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5 max-w-7xl mx-auto">
      {orders.map((order) => (
        <OrderCard 
          key={order.id_pedido} 
          order={order} 
          onAccept={onAccept}
          onReject={onReject}
          onAdvance={onAdvance} 
        />
      ))}
    </div>
  );
}