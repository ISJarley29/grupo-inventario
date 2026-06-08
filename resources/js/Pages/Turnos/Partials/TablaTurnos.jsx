import React from 'react';
import { Link } from '@inertiajs/react';

export default function TablaTurnos({ turnos, onEdit }) {
    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900 flex items-center">
                    <span className="mr-2">📋</span> Lista de Turnos
                </h3>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* ... (el thead se queda igual) ... */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Horario</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {turnos.map((turno) => (
                            <tr key={turno.IdTurno}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{turno.IdTurno}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{turno.Nombre}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {/* Aquí nos aseguramos de mostrar solo los primeros 5 caracteres (HH:mm) si trae segundos */}
                                    {turno.Hora_inicio.substring(0,5)} - {turno.Hora_fin.substring(0,5)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${turno.Estado === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {turno.Estado}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                    {/* 👇 AQUÍ ESTÁ LA MAGIA DEL BOTÓN EDITAR 👇 */}
                                    <button 
                                        onClick={() => onEdit(turno)} 
                                        className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded border border-blue-200"
                                    >
                                        Editar
                                    </button>

                                    <Link 
                                        href={route('turnos.destroy', turno.IdTurno)} 
                                        method="delete" 
                                        as="button"
                                        className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded border border-red-200"
                                    >
                                        Dar de baja
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}