export const INITIAL_ORDERS = [
  { id_pedido: 1043, fecha: "hace 1 min",  items_detalle: "1× Promo Sushi, 2× Cerveza",        total: 4500, estado: 0, direccion_entega: "San Martín 123" },
  { id_pedido: 1042, fecha: "hace 3 min",  items_detalle: "2× Hamburguesa clásica, 1× Papas",  total: 2800, estado: 1, direccion_entega: "Belgrano 456" },
  { id_pedido: 1041, fecha: "hace 12 min", items_detalle: "1× Pizza muzzarella, 2× Coca",      total: 3100, estado: 2, direccion_entega: "Sarmiento 789" },
];

export const INITIAL_PRODUCTS = [
  { id_producto: 1, emoji: "🍔", nombre: "Hamburguesa clásica", precio: 1200, descripcion: "Clásica con cheddar", imagen_url: "", stock: 50, disponible: true },
  { id_producto: 2, emoji: "🍕", nombre: "Pizza muzzarella",    precio: 1800, descripcion: "8 porciones",         imagen_url: "", stock: 20, disponible: true },
  { id_producto: 3, emoji: "🥟", nombre: "Empanadas x3",        precio: 950,  descripcion: "Carne cortada a cuchillo", imagen_url: "", stock: 100, disponible: true },
];

export const STEPS = [
  { label: "NUEVO PEDIDO",   next: "Aceptar",       badge: "bg-red-100 text-red-800 animate-pulse font-bold border border-red-200" },
  { label: "En preparación", next: "Marcar listo",  badge: "bg-amber-100 text-amber-800" },
  { label: "Listo",          next: "En camino",     badge: "bg-blue-100 text-blue-800" },
  { label: "En camino",      next: "Entregado",     badge: "bg-purple-100 text-purple-800" },
  { label: "Entregado",      next: "Completado",    badge: "bg-green-100 text-green-800" },
];

export const BTN_STEP_COLORS = [
  "", 
  "bg-amber-50  text-amber-800  border-amber-200  hover:bg-amber-100",
  "bg-blue-50   text-blue-800   border-blue-200   hover:bg-blue-100",
  "bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-100",
  "bg-green-50  text-green-800  border-green-200  hover:bg-green-100",
];

export const FALLBACK_EMOJIS = ["🥗", "🌮", "🍜", "🥙", "🍱", "🫔", "🥘"];