import OrderCard from "../components/OrderCard";

export default function OrdersView({ orders, onAccept, onReject, onAdvance }) {
  if (!orders.length) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-16 text-gray-400 dark:text-gray-500">
        <span className="text-4xl mb-3">📋</span>
        <p className="text-sm">No hay pedidos activos</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
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