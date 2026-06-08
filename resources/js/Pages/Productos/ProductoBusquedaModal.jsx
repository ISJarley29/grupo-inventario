import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function ProductoBusquedaModal({ isOpen, onClose, onSearch, categorias, almacenes, filtrosActuales }) {
    
    // Inicializamos el formulario de Inertia cargando los filtros existentes si los hay
    const { data, setData, reset } = useForm({
        Nombre: filtrosActuales.Nombre || '',
        IdCategoria: filtrosActuales.IdCategoria || '',
        IdAlmacen: filtrosActuales.IdAlmacen || '',
    });

    // Efecto para sincronizar los campos si los filtros cambian desde afuera
    useEffect(() => {
        if (isOpen) {
            setData({
                Nombre: filtrosActuales.Nombre || '',
                IdCategoria: filtrosActuales.IdCategoria || '',
                IdAlmacen: filtrosActuales.IdAlmacen || '',
            });
        }
    }, [isOpen, filtrosActuales]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(data); // Ejecuta la búsqueda enviando el estado actual
    };

    const handleLimpiar = () => {
        const filtrosLimpios = { Nombre: '', IdCategoria: '', IdAlmacen: '' };
        reset();
        onSearch(filtrosLimpios); // Ejecuta la búsqueda vacía para restablecer la tabla
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-40 backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full border border-gray-100 overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
                
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900">Búsqueda Avanzada</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>

                {/* Formulario */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Campo Nombre */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del producto</label>
                        <input 
                            type="text"
                            value={data.Nombre}
                            onChange={e => setData('Nombre', e.target.value)}
                            placeholder="Ej: Aceite, Fideos..."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                        />
                    </div>

                    {/* Selector de Categorías */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                        <select 
                            value={data.IdCategoria}
                            onChange={e => setData('IdCategoria', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                        >
                            <option value="">Todas las categorías</option>
                            {categorias.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Selector de Almacenes */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Almacén</label>
                        <select 
                            value={data.IdAlmacen}
                            onChange={e => setData('IdAlmacen', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow outline-none"
                        >
                            <option value="">Todos los almacenes</option>
                            {almacenes.map(alm => (
                                <option key={alm.id} value={alm.id}>{alm.nombre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Botones de Acción */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                        <button 
                            type="button"
                            onClick={handleLimpiar}
                            className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Limpiar Filtros
                        </button>
                        <button 
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-colors"
                        >
                            Aplicar búsqueda
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}