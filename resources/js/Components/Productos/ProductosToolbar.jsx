import React from 'react';

// SOLUCIÓN: Cambiamos 'onSearch' por 'onAdvanceSearchClick' aquí adentro 👇
export default function ProductosToolbar({ onAddClick, onAdvanceSearchClick }) {
    return (
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Productos</h2>
                <p className="text-sm text-gray-500 mt-1">
                    Gestiona el catálogo de productos y controla sus niveles de inventario.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
                {/* Buscador Avanzado */}
                <button 
                    onClick={onAdvanceSearchClick} // <-- Ahora sí existe y funcionará
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 text-sm font-medium"
                >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3 7.293A1 1 0 013 6.586V4z"></path></svg>
                    Búsqueda avanzada
                </button>

                {/* Descargar en Excel */}
                <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Descargar en Excel
                </button>

                {/* Botón Agregar */}
                <button 
                    onClick={onAddClick}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                >
                    + Agregar Producto
                </button>
            </div>
        </div>
    );
}