import { useState } from "react";
import { FALLBACK_EMOJIS } from "../data/mockData";

export default function ProductsView({ products, onAddProduct }) {
  const [imageFile, setImageFile] = useState(null);
  const [desc,  setDesc]  = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!desc.trim() || !price.trim()) {
      setError("La descripción y el precio son obligatorios.");
      return;
    }
    const numPrice = parseFloat(price);
    if (isNaN(numPrice) || numPrice <= 0) {
      setError("Ingresá un precio válido.");
      return;
    }
    setError("");

    let tempUrl = "";
    if (imageFile) {
      tempUrl = URL.createObjectURL(imageFile);
    }

    const emoji = FALLBACK_EMOJIS[Math.floor(Math.random() * FALLBACK_EMOJIS.length)];
    
    // Aquí enviamos el objeto tal cual lo espera la BD
    onAddProduct({ 
      imagen_url: tempUrl, 
      emoji, 
      nombre: desc.trim(), 
      precio: numPrice,
      descripcion: "Descripción pendiente", 
      stock: 0, 
      disponible: true 
    });

    setDesc(""); 
    setPrice("");
    setImageFile(null);
    document.getElementById("f-image").value = ""; 
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Formulario */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
          Agregar producto
        </h2>
        <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-gray-700/50 rounded-2xl p-4 flex flex-col gap-3 transition-colors duration-300">
          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1" htmlFor="f-image">
              Foto del producto <span className="text-gray-300 dark:text-gray-600">(opcional)</span>
            </label>
            <input
              id="f-image"
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="w-full text-sm text-gray-500 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl cursor-pointer file:mr-3 file:py-2 file:px-4 file:rounded-l-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 dark:file:bg-emerald-900/30 dark:file:text-emerald-400 hover:file:bg-emerald-100 dark:hover:file:bg-emerald-900/50 focus:outline-none transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1" htmlFor="f-desc">
              Nombre <span className="text-red-400 dark:text-red-500">*</span>
            </label>
            <input
              id="f-desc"
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Ej: Docena de empanadas"
              className="w-full text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-300 dark:placeholder-gray-500 transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1" htmlFor="f-price">
              Precio ($) <span className="text-red-400 dark:text-red-500">*</span>
            </label>
            <input
              id="f-price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0"
              className="w-full text-sm px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-gray-300 dark:placeholder-gray-500 transition-colors duration-300"
            />
          </div>

          {error && <p className="text-xs text-red-500 dark:text-red-400">{error}</p>}

          <button type="submit" className="mt-1 w-full py-2.5 bg-emerald-500 text-white text-sm font-medium rounded-xl hover:bg-emerald-600 active:scale-[0.98] transition-all duration-150">
            + Agregar producto
          </button>
        </form>
      </div>

      {/* Grilla de productos */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
          Mis productos ({products.length})
        </h2>

        {products.length === 0 ? (
          <div className="text-center py-10 text-gray-400 dark:text-gray-500">
            <span className="text-3xl block mb-2">📦</span>
            <p className="text-sm">Todavía no cargaste productos</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {products.map((p) => (
              <div key={p.id_producto} className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl overflow-hidden shadow-sm transition-colors duration-300">
                <div className="h-20 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center transition-colors duration-300">
                  {p.imagen_url ? (
                    <img
                      src={p.imagen_url}
                      alt={p.nombre}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <span className="text-3xl" style={{ display: p.imagen_url ? "none" : "flex" }}>
                    {p.emoji}
                  </span>
                </div>
                <div className="px-3 py-2">
                  <p className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{p.nombre}</p>
                  <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                    ${p.precio.toLocaleString("es-AR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}