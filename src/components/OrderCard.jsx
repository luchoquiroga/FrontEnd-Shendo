import { STEPS, BTN_STEP_COLORS } from "../data/mockData";

export default function OrderCard({ order, onAccept, onReject, onAdvance }) {
  const step = STEPS[order.estado];
  const isDone = order.estado === 4; 
  const isNew = order.estado === 0;

  return (
    <div className={`bg-white dark:bg-gray-800 border ${isNew ? 'border-red-400 dark:border-red-500 shadow-md' : 'border-gray-100 dark:border-gray-700'} rounded-2xl p-4 flex flex-col gap-3 shadow-sm transition-colors duration-300`}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">#{order.id_pedido}</span>
        <span className="text-xs text-gray-400 dark:text-gray-500">{order.fecha}</span>
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{order.items_detalle}</p>

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          ${order.total.toLocaleString("es-AR")}
        </span>
        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${step.badge}`}>
          {step.label}
        </span>
      </div>

      {isNew ? (
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => onReject(order.id_pedido)}
            className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/50 active:scale-[0.98] transition-all duration-150"
          >
            ✕ Rechazar
          </button>
          <button
            onClick={() => onAccept(order.id_pedido)}
            className="flex-1 py-2 px-4 rounded-xl text-xs font-semibold bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98] transition-all duration-150 shadow-sm"
          >
            ✓ Aceptar
          </button>
        </div>
      ) : (
        <button
          onClick={() => !isDone && onAdvance(order.id_pedido)}
          disabled={isDone}
          className={`
            w-full py-2 px-4 rounded-xl text-xs font-medium border transition-all duration-150
            active:scale-[0.98] disabled:opacity-40 disabled:cursor-default mt-1
            ${BTN_STEP_COLORS[order.estado]}
          `}
        >
          {isDone ? "✓ Completado" : `→ ${step.next}`}
        </button>
      )}
    </div>
  );
}