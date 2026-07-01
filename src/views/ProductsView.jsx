import { useState } from "react";
import { FALLBACK_EMOJIS } from "../data/mockData";

export default function ProductsView({ products, onAddProduct, onEditProduct }) {
  // Estados para crear producto
  const [imageFile, setImageFile] = useState(null);
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [error, setError] = useState("");

  // Estados para editar producto (Modal)
  const [editingProduct, setEditingProduct] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editPrecio, setEditPrecio] = useState("");
  const [editCategoria, setEditCategoria] = useState("");

  // Manejar creación
  function handleSubmit(e) {
    e.preventDefault();
    if (!nombre.trim() || !precio.trim() || !categoria.trim()) {
      setError("El nombre, precio y categoría son obligatorios.");
      return;
    }
    const numPrecio = parseFloat(precio);
    if (isNaN(numPrecio) || numPrecio <= 0) {
      setError("Ingresá un precio válido.");
      return;
    }
    setError("");

    let tempUrl = "";
    if (imageFile) {
      tempUrl = URL.createObjectURL(imageFile);
    }

    const emoji = FALLBACK_EMOJIS[Math.floor(Math.random() * FALLBACK_EMOJIS.length)];
    onAddProduct({ 
      imagen_url: tempUrl, 
      emoji, 
      nombre: nombre.trim(), 
      precio: numPrecio,
      categoria: categoria.trim() 
    });

    setNombre(""); 
    setPrecio("");
    setCategoria("");
    setImageFile(null);
    document.getElementById("f-image").value = ""; 
  }

  // Abrir modal de edición y cargar datos
  function handleOpenEdit(product) {
    setEditingProduct(product);
    setEditNombre(product.nombre);
    setEditPrecio(product.precio.toString());
    setEditCategoria(product.categoria || "");
  }

  // Guardar cambios de edición
  function handleSaveEdit(e) {
    e.preventDefault();
    const numPrecio = parseFloat(editPrecio);
    if (!editNombre.trim() || isNaN(numPrecio) || numPrecio <= 0 || !editCategoria.trim()) {
      alert("Por favor, completa todos los campos correctamente.");
      return;
    }

    onEditProduct({
      ...editingProduct,
      nombre: editNombre.trim(),
      precio: numPrecio,
      categoria: editCategoria.trim()
    });

    setEditingProduct(null); // Cierra el modal
  }

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto relative">

      {/* Formulario Desktop-Friendly */}
      <section>
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
          Agregar producto
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 md:p-6 shadow-sm transition-colors duration-300"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-5">
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2" htmlFor="f-image">
                Foto <span className="text-gray-400 dark:text-gray-500 font-normal">(opcional)</span>
              </label>
              <input
                id="f-image"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="
                  w-full text-sm text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer
                  file:mr-3 file:py-2.5 file:px-3 file:rounded-l-xl file:border-0
                  file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-600
                  dark:file:bg-emerald-500/20 dark:file:text-emerald-400
                  hover:file:bg-emerald-500/20 transition-all duration-300 h-[42px]
                "
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2" htmlFor="f-nombre">
                Nombre del producto <span className="text-red-500">*</span>
              </label>
              <input
                id="f-nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej: Empanadas x3"
                className="w-full text-sm px-4 py-2.5 h-[42px] rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2" htmlFor="f-cat">
                Categoría <span className="text-red-500">*</span>
              </label>
              <input
                id="f-cat"
                type="text"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                placeholder="Ej: Entradas, Bebidas..."
                className="w-full text-sm px-4 py-2.5 h-[42px] rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
              />
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2" htmlFor="f-precio">
                Precio ($) <span className="text-red-500">*</span>
              </label>
              <input
                id="f-precio"
                type="number"
                min="0"
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="0"
                className="w-full text-sm px-4 py-2.5 h-[42px] rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 placeholder-gray-400 dark:placeholder-gray-500 transition-all duration-300"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500 dark:text-red-400 mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl active:scale-[0.99] transition-all duration-150 shadow-sm shadow-emerald-500/20"
          >
            + Añadir nuevo producto
          </button>
        </form>
      </section>

      {/* Grilla de productos responsiva */}
      <section>
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4">
          Mis productos ({products.length})
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl">
            <span className="text-5xl block mb-4 opacity-50">📦</span>
            <p className="text-gray-500 dark:text-gray-400">Todavía no cargaste productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5">
            {products.map((p) => (
              <div key={p.id_producto} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col">
                <div className="h-32 md:h-40 bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center transition-colors duration-300 relative overflow-hidden shrink-0">
                  {p.categoria && (
                    <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md z-10">
                      {p.categoria}
                    </span>
                  )}
                  {p.imagen_url ? (
                    <img
                      src={p.imagen_url}
                      alt={p.nombre}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <span className="text-5xl drop-shadow-sm" style={{ display: p.imagen_url ? "none" : "flex" }}>
                    {p.emoji}
                  </span>
                </div>
                
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200 line-clamp-2" title={p.nombre}>
                      {p.nombre}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3">
                    <p className="text-base font-bold text-emerald-600 dark:text-emerald-400">
                      ${p.precio.toLocaleString("es-AR")}
                    </p>
                    
                    <div className="flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleOpenEdit(p)}
                        className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                        title="Editar producto"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button 
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                        title="Eliminar producto"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Modal de Edición */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">Editar Producto</h3>
              <button 
                onClick={() => setEditingProduct(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSaveEdit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Nombre del producto</label>
                <input
                  type="text"
                  value={editNombre}
                  onChange={(e) => setEditNombre(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Categoría</label>
                <input
                  type="text"
                  value={editCategoria}
                  onChange={(e) => setEditCategoria(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Precio ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={editPrecio}
                  onChange={(e) => setEditPrecio(e.target.value)}
                  className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500/50 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}