import React from 'react';

export default function MovimientosToolbar({ onAddClick }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            {/* Título */}
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Movimientos (Kardex)</h1>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    Gestiona las entradas y salidas de tu inventario
                </p>
            </div>

            {/* Filtros y Acciones */}
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                {/* Filtro: Desde */}
                <div className="flex items-center gap-2">
                    <label htmlFor="fechaDesde" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Desde:
                    </label>
                    <input
                        type="date"
                        id="fechaDesde"
                        className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-[#1a1a27] dark:text-white outline-none transition-colors"
                    />
                </div>

                {/* Filtro: Hasta */}
                <div className="flex items-center gap-2">
                    <label htmlFor="fechaHasta" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Hasta:
                    </label>
                    <input
                        type="date"
                        id="fechaHasta"
                        className="border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 text-sm focus:ring-red-500 focus:border-red-500 dark:bg-[#1a1a27] dark:text-white outline-none transition-colors"
                    />
                </div>

                {/* Divisor vertical (solo visible en pantallas medianas/grandes) */}
                <div className="hidden md:block w-px h-8 bg-gray-200 dark:bg-gray-700 mx-1"></div>

                {/* Botón Excel (Secundario/Outline Verde) */}
                <button
                    type="button"
                    className="flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 bg-transparent rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 text-sm font-medium transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Excel
                </button>

                {/* Botón Principal (Rojo) */}
                <button
                    onClick={onAddClick}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium shadow-sm transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Agregar Movimiento
                </button>
            </div>
        </div>
    );
}