import React from 'react';

// 1. Recibimos las nuevas props: categorias, almacenes, unidades
export default function ProductosTable({ productos, categorias, almacenes, unidades, onEditClick }) {
    
    // Funciones auxiliares para buscar los nombres según el ID
    const getCategoriaNombre = (id) => {
        const categoria = categorias?.find(c => c.id === id);
        return categoria ? categoria.nombre : 'Sin categoría';
    };

    const getAlmacenNombre = (id) => {
        const almacen = almacenes?.find(a => a.id === id);
        return almacen ? almacen.nombre : 'Sin almacén';
    };

    const getUnidadAbreviatura = (id) => {
        const unidad = unidades?.find(u => u.id === id);
        return unidad ? unidad.abreviatura : '-';
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-4 font-medium">NOMBRE</th>
                        <th className="px-6 py-4 font-medium">CATEGORÍA</th>
                        <th className="px-6 py-4 font-medium">ALMACÉN</th>
                        <th className="px-6 py-4 font-medium">STOCK ACTUAL</th>
                        <th className="px-6 py-4 font-medium">STOCK MÍNIMO</th>
                        <th className="px-6 py-4 font-medium">UNIDAD</th>
                        <th className="px-6 py-4 font-medium">VENCIMIENTO</th>
                        <th className="px-6 py-4 font-medium text-right">ACCIONES</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {productos && productos.length > 0 ? (
                        productos.map((producto) => (
                            <tr key={producto.id} className="bg-white hover:bg-gray-50">
                                
                                {/* Nombre */}
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                        {producto.Nombre ? producto.Nombre.charAt(0).toUpperCase() : '?'}
                                    </div>
                                    {producto.Nombre}
                                </td>

                                {/* Categoría: Intenta usar la relación de backend, si no, cruza los datos con la prop */}
                                <td className="px-6 py-4">
                                    {producto.categoria?.nombre || getCategoriaNombre(producto.IdCategoria)}
                                </td>
                                
                                {/* Almacén: Intenta usar la relación de backend, si no, cruza los datos con la prop */}
                                <td className="px-6 py-4">
                                    {producto.almacen?.nombre || getAlmacenNombre(producto.IdAlmacen)}
                                </td>
                                
                                {/* Stock Actual */}
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                        producto.StockActual <= producto.StockMinimo 
                                        ? 'bg-red-100 text-red-800' 
                                        : 'bg-green-100 text-green-800'
                                    }`}>
                                        {producto.StockActual}
                                    </span>
                                </td>

                                {/* Stock Mínimo */}
                                <td className="px-6 py-4 text-gray-600 font-medium">
                                    {producto.StockMinimo}
                                </td>

                                {/* Unidad de Medida */}
                                <td className="px-6 py-4 font-medium text-gray-500 uppercase">
                                    {producto.unidad_medida?.abreviatura || producto.unidadMedida?.abreviatura || getUnidadAbreviatura(producto.UnidadDeMedida)}
                                </td>
                                
                                {/* Vencimiento */}
                                <td className="px-6 py-4">{producto.FechaDeVencimiento || '-'}</td>
                                
                                {/* Acciones */}
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button 
                                            onClick={() => onEditClick(producto)}
                                            className="font-medium text-green-600 hover:text-green-800 flex items-center gap-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                            Editar
                                        </button>
                                        <button className="font-medium text-red-400 hover:text-red-600 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                            Dar de baja
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                No hay productos registrados o no coinciden con la búsqueda.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}