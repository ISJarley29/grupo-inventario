import React from 'react';
import { useForm } from '@inertiajs/react';

export default function MovimientoForm({ onClose, productos = [] }) {
    // Inicializamos el formulario con Inertia
    const { data, setData, post, processing, errors, reset } = useForm({
        id_producto: '',
        tipo_movimiento: '', // Ahora guardará 'ingreso' o 'salida' en minúsculas
        cantidad: '',
        motivo: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log("1. [Frontend] Iniciando envío de datos:", data);

        post(route('movimientos.store'), {
            preserveScroll: true,
            onSuccess: () => {
                console.log("2. [Backend] ¡Éxito! Movimiento registrado correctamente.");
                reset();
                onClose();
            },
            onError: (erroresValidacion) => {
                console.error("2. [Backend] Error. Laravel rechazó la solicitud:", erroresValidacion);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Campo: Producto */}
                <div>
                    <label htmlFor="id_producto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Producto *
                    </label>
                    <select
                        id="id_producto"
                        value={data.id_producto}
                        onChange={(e) => setData('id_producto', e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500 dark:bg-[#1a1a27] dark:text-white outline-none transition-colors"
                        required
                    >
                        <option value="">Seleccione un producto...</option>
                        {productos.map((producto) => (
                            <option key={producto.id} value={producto.id}>
                                {producto.Nombre}
                            </option>
                        ))}
                    </select>
                    {errors.id_producto && <span className="text-red-500 text-xs mt-1">{errors.id_producto}</span>}
                </div>

                {/* Campo: Tipo de Movimiento */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        Tipo de Movimiento *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        {/* Tarjeta: INGRESO */}
                        <button
                            type="button"
                            onClick={() => setData('tipo_movimiento', 'ingreso')} // <- En minúscula para Laravel
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                data.tipo_movimiento === 'ingreso'
                                    ? 'border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20 dark:bg-emerald-900/20 dark:border-emerald-500'
                                    : 'border-gray-200 bg-white hover:border-emerald-200 hover:bg-emerald-50/50 dark:bg-[#11111d] dark:border-gray-700 dark:hover:border-emerald-900'
                            }`}
                        >
                            <div className={`p-2 rounded-full mb-2 ${data.tipo_movimiento === 'ingreso' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900 dark:text-emerald-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 21h16" className="opacity-50"></path>
                                </svg>
                            </div>
                            <span className={`font-semibold ${data.tipo_movimiento === 'ingreso' ? 'text-emerald-700 dark:text-emerald-400' : 'text-gray-700 dark:text-gray-300'}`}>Ingreso</span>
                            <span className="text-xs text-gray-500 text-center mt-1">Suma al stock actual</span>
                        </button>

                        {/* Tarjeta: SALIDA */}
                        <button
                            type="button"
                            onClick={() => setData('tipo_movimiento', 'salida')} // <- En minúscula para Laravel
                            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                                data.tipo_movimiento === 'salida'
                                    ? 'border-red-500 bg-red-50 ring-2 ring-red-500/20 dark:bg-red-900/20 dark:border-red-500'
                                    : 'border-gray-200 bg-white hover:border-red-200 hover:bg-red-50/50 dark:bg-[#11111d] dark:border-gray-700 dark:hover:border-red-900'
                            }`}
                        >
                            <div className={`p-2 rounded-full mb-2 ${data.tipo_movimiento === 'salida' ? 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 21h16" className="opacity-50"></path>
                                </svg>
                            </div>
                            <span className={`font-semibold ${data.tipo_movimiento === 'salida' ? 'text-red-700 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>Salida</span>
                            <span className="text-xs text-gray-500 text-center mt-1">Resta al stock actual</span>
                        </button>
                    </div>
                    {errors.tipo_movimiento && <span className="text-red-500 text-xs mt-1">{errors.tipo_movimiento}</span>}
                </div>

                {/* Campo: Cantidad */}
                <div>
                    <label htmlFor="cantidad" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cantidad *
                    </label>
                    <input
                        type="number"
                        id="cantidad"
                        min="1"
                        value={data.cantidad}
                        onChange={(e) => setData('cantidad', e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500 dark:bg-[#1a1a27] dark:text-white outline-none transition-colors"
                        placeholder="Ej: 50"
                        required
                    />
                    {errors.cantidad && <span className="text-red-500 text-xs mt-1">{errors.cantidad}</span>}
                </div>

                {/* Campo: Motivo */}
                <div>
                    <label htmlFor="motivo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Motivo / Justificación *
                    </label>
                    <textarea
                        id="motivo"
                        rows="3"
                        value={data.motivo}
                        onChange={(e) => setData('motivo', e.target.value)}
                        className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 focus:ring-red-500 focus:border-red-500 dark:bg-[#1a1a27] dark:text-white outline-none transition-colors resize-none"
                        placeholder="Escriba el motivo de este movimiento..."
                        required
                    ></textarea>
                    {errors.motivo && <span className="text-red-500 text-xs mt-1">{errors.motivo}</span>}
                </div>
                
                {/* Mensaje informativo */}
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800 flex items-start gap-3">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="text-xs text-blue-700 dark:text-blue-300">
                        La fecha, hora, usuario y turno se registrarán automáticamente. El saldo del stock se recalculará según la operación elegida.
                    </p>
                </div>
            </div>

            {/* Footer Fijo con Botones */}
            <div className="border-t border-gray-200 dark:border-gray-800 p-4 bg-gray-50 dark:bg-[#11111d] flex justify-end gap-3 rounded-b-2xl md:rounded-bl-none">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium transition-colors"
                >
                    Cancelar
                </button>
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium shadow-sm transition-colors disabled:opacity-50"
                >
                    {processing ? 'Guardando...' : 'Guardar Movimiento'}
                </button>
            </div>
        </form>
    );
}