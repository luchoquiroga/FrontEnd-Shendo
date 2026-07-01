export default function StoreToggle({ isOpen, onToggle }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-medium ${isOpen ? "text-emerald-700" : "text-red-600"}`}>
        {isOpen ? "Abierto" : "Cerrado"}
      </span>
      <button
        onClick={onToggle}
        aria-label={isOpen ? "Cerrar comercio" : "Abrir comercio"}
        className={`
          relative w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none
          focus-visible:ring-2 focus-visible:ring-offset-2
          ${isOpen
            ? "bg-emerald-500 focus-visible:ring-emerald-400"
            : "bg-red-400   focus-visible:ring-red-400"
          }
        `}
      >
        <span
          className={`
            absolute top-[3px] left-[3px] w-[22px] h-[22px] bg-white rounded-full shadow
            transition-transform duration-300
            ${isOpen ? "translate-x-7" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}