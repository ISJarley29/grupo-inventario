import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function ProductoForm({ producto, categorias, almacenes, unidades, onSuccess, onCancel }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        Nombre: '',
        IdCategoria: '',
        IdAlmacen: '',
        UnidadDeMedida: '',
        StockActual: 0,
        StockMinimo: 0,
        FechaDeVencimiento: '',
    });

    // Llenar el formulario si estamos en modo edición
    useEffect(() => {
        if (producto) {
            setData({
                Nombre: producto.Nombre || '',
                IdCategoria: producto.IdCategoria || '',
                IdAlmacen: producto.IdAlmacen || '',
                UnidadDeMedida: producto.UnidadDeMedida || '',
                StockActual: producto.StockActual || 0,
                StockMinimo: producto.StockMinimo || 0,
                FechaDeVencimiento: producto.FechaDeVencimiento || '',
            });
        } else {
            reset();
        }
    }, [producto]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (producto) {
            // ✅ CORREGIDO: Se usa producto.id en lugar de IdProductos
            put(route('productos.update', producto.id), {
                onSuccess: () => {
                    reset();
                    onSuccess();
                },
            });
        } else {
            post(route('productos.store'), {
                onSuccess: () => {
                    reset();
                    onSuccess();
                },
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="p-6 space-y-5 flex-1">
                
                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
                    <input
                        type="text"
                        value={data.Nombre}
                        onChange={e => setData('Nombre', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
                        placeholder="Ej. Fideos don vitorio"
                    />
                    {errors.Nombre && <p className="text-red-500 text-xs mt-1">{errors.Nombre}</p>}
                </div>

                {/* Categoría */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                        value={data.IdCategoria}
                        onChange={e => setData('IdCategoria', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                        <option value="">Seleccione una categoría</option>
                        {categorias?.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                        ))}
                    </select>
                    {errors.IdCategoria && <p className="text-red-500 text-xs mt-1">{errors.IdCategoria}</p>}
                </div>

                {/* Almacén */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Almacén de destino</label>
                    <select
                        value={data.IdAlmacen}
                        onChange={e => setData('IdAlmacen', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                        <option value="">Seleccione un almacén</option>
                        {almacenes?.map(alm => (
                            <option key={alm.id} value={alm.id}>{alm.nombre}</option>
                        ))}
                    </select>
                    {errors.IdAlmacen && <p className="text-red-500 text-xs mt-1">{errors.IdAlmacen}</p>}
                </div>

                {/* Unidad de Medida */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Unidad de Medida</label>
                    <select
                        value={data.UnidadDeMedida}
                        onChange={e => setData('UnidadDeMedida', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-red-500"
                    >
                        <option value="">Seleccione una unidad</option>
                        {unidades?.map(uni => (
                            <option key={uni.id} value={uni.id}>{uni.nombre} ({uni.abreviatura})</option>
                        ))}
                    </select>
                    {errors.UnidadDeMedida && <p className="text-red-500 text-xs mt-1">{errors.UnidadDeMedida}</p>}
                </div>

                {/* Stock Actual y Mínimo */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Actual</label>
                        <input
                            type="number"
                            value={data.StockActual}
                            onChange={e => setData('StockActual', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        {errors.StockActual && <p className="text-red-500 text-xs mt-1">{errors.StockActual}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Stock Mínimo</label>
                        <input
                            type="number"
                            value={data.StockMinimo}
                            onChange={e => setData('StockMinimo', e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                        />
                        {errors.StockMinimo && <p className="text-red-500 text-xs mt-1">{errors.StockMinimo}</p>}
                    </div>
                </div>

                {/* Fecha de Vencimiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Vencimiento (Opcional)</label>
                    <input
                        type="date"
                        value={data.FechaDeVencimiento}
                        onChange={e => setData('FechaDeVencimiento', e.target.value)}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
                    />
                    {errors.FechaDeVencimiento && <p className="text-red-500 text-xs mt-1">{errors.FechaDeVencimiento}</p>}
                </div>
            </div>

            {/* Footer de botones */}
            <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end gap-3 shrink-0">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors disabled:opacity-70"
                >
                    {processing ? 'Guardando...' : (producto ? 'Actualizar Producto' : 'Guardar Producto')}
                </button>
            </div>
        </form>
    );
}