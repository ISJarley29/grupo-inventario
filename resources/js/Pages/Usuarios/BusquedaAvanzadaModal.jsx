import React, { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';

export default function BusquedaAvanzadaModal({ isOpen, onClose, filtrosAnteriores }) {
    // Estado local del formulario del modal
    const [formFiltros, setFormFiltros] = useState({
        name: '',
        email: '',
        role: '',
        status: '',
    });

    // Sincronizar los filtros si ya venían aplicados desde la URL
    useEffect(() => {
        if (filtrosAnteriores) {
            setFormFiltros({
                name: filtrosAnteriores.name || '',
                email: filtrosAnteriores.email || '',
                role: filtrosAnteriores.role || '',
                status: filtrosAnteriores.status || '',
            });
        }
    }, [filtrosAnteriores, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormFiltros((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        
        // Enviamos los filtros al backend mediante una petición GET limpia
        router.get(route('usuarios.index'), formFiltros, {
            preserveState: true, // Evita que se pierda el estado del componente Index
            replace: true,       // No llena el historial del navegador con cada búsqueda
            onSuccess: () => onClose(), // Cierra el modal al terminar
        });
    };

    const handleLimpiar = () => {
        const filtrosVacios = { name: '', email: '', role: '', status: '' };
        setFormFiltros(filtrosVacios);
        router.get(route('usuarios.index'), filtrosVacios, { preserveState: true });
        onClose();
    };

    return (
        <div className="relative z-50">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

            {/* Contenedor del Modal */}
            <div className="fixed inset-0 flex items-center justify-center p-4">
                <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-[#1a1a27]">
                    <div className="mb-4 flex items-center justify-between border-b border-gray-200 pb-3 dark:border-gray-800">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Búsqueda Avanzada</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">✕</button>
                    </div>

                    <form onSubmit={handleFormSubmit} className="space-y-4">
                        {/* Filtro Nombre */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre</label>
                            <input
                                type="text"
                                name="name"
                                value={formFiltros.name}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#11111d] dark:text-white"
                                placeholder="Ej: Ana"
                            />
                        </div>

                        {/* Filtro Email */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                            <input
                                type="text"
                                name="email"
                                value={formFiltros.email}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#11111d] dark:text-white"
                                placeholder="Ej: sistema.com"
                            />
                        </div>

                        {/* Filtro Rol */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Rol del Usuario</label>
                            <select
                                name="role"
                                value={formFiltros.role}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#11111d] dark:text-white"
                            >
                                <option value="">Todos los roles</option>
                                <option value="admin">Administrador</option>
                                <option value="docente">Docente</option>
                                <option value="estudiante">Estudiante</option>
                            </select>
                        </div>

                        {/* Filtro Estado */}
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                            <select
                                name="status"
                                value={formFiltros.status}
                                onChange={handleChange}
                                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#11111d] dark:text-white"
                            >
                                <option value="">Todos los estados</option>
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                        </div>

                        {/* Botones de acción */}
                        <div className="mt-5 flex justify-end gap-3 border-t border-gray-200 pt-4 dark:border-gray-800">
                            <button
                                type="button"
                                onClick={handleLimpiar}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Limpiar Filtros
                            </button>
                            <button
                                type="submit"
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
                            >
                                Aplicar búsqueda
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}