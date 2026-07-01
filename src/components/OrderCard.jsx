import { STEPS, BTN_STEP_COLORS } from "../data/mockData";

export default function OrderCard({ order, onAccept, onReject, onAdvance }) {
  const step = STEPS[order.estado];
  const isDone = order.estado === 4; 
  const isNew = order.estado === 0;

  return (
    <div className={`bg-white dark:bg-gray-800 border ${isNew ? 'border-red-400 dark:border-red-500 shadow-md ring-1 ring-red-400/30' : 'border-gray-100 dark:border-gray-700'} rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-all duration-300`}>
      
      {/* Header: ID y Fecha */}
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-700 pb-3">
        <span className="text-base font-bold text-gray-800 dark:text-gray-100">{order.id_pedido}</span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded-md">
          {order.fecha}
        </span>
      </div>

      {/* Contenido Principal */}
      <div className="flex-1 flex flex-col gap-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">
          {order.items_detalle}
        </p>
        
        {/* Dirección de Entrega (Nuevo Campo) */}
        {order.direccion_entrega && (
          <div className="flex items-start gap-1.5 mt-1 text-gray-500 dark:text-gray-400">
            <span className="text-sm">📍</span>
            <p className="text-xs font-medium leading-tight pt-0.5">{order.direccion_entrega}</p>
          </div>
        )}
      </div>

      {/* Footer: Total y Badge de Estado */}
      <div className="flex items-center justify-between pt-2">
        <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
          ${order.total.toLocaleString("es-AR")}
        </span>
        <span className={`text-[11px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg ${step.badge}`}>
          {step.label}
        </span>
      </div>

      {/* Botones de Acción */}
      {isNew ? (
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => onReject(order.id_pedido)}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold border border-red-200 dark:border-red-800/50 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/40 active:scale-[0.98] transition-all duration-150"
          >
            ✕ Rechazar
          </button>
          <button
            onClick={() => onAccept(order.id_pedido)}
            className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-500 text-white hover:bg-emerald-600 active:scale-[0.98] transition-all duration-150 shadow-sm shadow-emerald-500/20"
          >
            ✓ Aceptar
          </button>
        </div>
      ) : (
        <button
          onClick={() => !isDone && onAdvance(order.id_pedido)}
          disabled={isDone}
          className={`
            w-full py-2.5 px-4 rounded-xl text-xs font-bold border transition-all duration-150
            active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-2
            ${BTN_STEP_COLORS[order.estado]}
          `}
        >
          {isDone ? "✓ Completado" : `→ ${step.next}`}
        </button>
      )}
    </div>
  );
}