import React, { useState } from 'react';
import { router } from '@inertiajs/react';

export default function AlmacenTable({ almacenes, onEdit }) {
    const [busqueda, setBusqueda] = useState('');

    // Filtrar almacenes por la búsqueda (nombre o descripción)
    const almacenesFiltrados = almacenes.filter(almacen => 
        almacen.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        (almacen.descripcion && almacen.descripcion.toLowerCase().includes(busqueda.toLowerCase()))
    );

    // Función para el botón de Eliminar (eliminado lógico)
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de dar de baja este almacén?')) {
            router.delete(route('almacenes.destroy', id));
        }
    };

    return (
        <div>
            {/* Buscador Superior */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-700">📋 Lista de Almacenes</h2>
                <input 
                    type="text" 
                    placeholder="Buscar almacén..." 
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:border-indigo-500"
                />
            </div>

            {/* Tabla Responsive */}
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-2 text-left font-medium text-gray-500">ID</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-500">Nombre</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-500">Descripción</th>
                            <th className="px-4 py-2 text-left font-medium text-gray-500">Estado</th>
                            <th className="px-4 py-2 text-center font-medium text-gray-500">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {almacenesFiltrados.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                                    No se encontraron registros.
                                </td>
                            </tr>
                        ) : (
                            almacenesFiltrados.map((almacen) => (
                                <tr key={almacen.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-2 text-gray-600 font-medium">{almacen.id}</td>
                                    <td className="px-4 py-2 text-gray-800">{almacen.nombre}</td>
                                    <td className="px-4 py-2 text-gray-600 truncate max-w-xs">{almacen.descripcion || '-'}</td>
                                    <td className="px-4 py-2">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${almacen.estado ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {almacen.estado ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 text-center space-x-2">
                                        <button 
                                            onClick={() => onEdit(almacen)}
                                            className="text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded border border-blue-200 transition"
                                        >
                                            Editar
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(almacen.id)}
                                            className="text-red-600 hover:text-red-800 font-medium bg-red-50 hover:bg-red-100 px-2 py-1 rounded border border-red-200 transition"
                                        >
                                            Dar de baja
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}