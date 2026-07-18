import React from 'react';

export default function MovimientosTable({ movimientos = [] }) {
    // Función auxiliar para obtener un color de fondo del avatar basado en la inicial
    const getAvatarColor = (initial) => {
        const colors = [
            'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400',
            'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400',
        ];
        // Lógica simple para rotar colores según el código char de la inicial
        const charCode = initial ? initial.charCodeAt(0) : 0;
        const index = charCode % colors.length;
        return colors[index];
    };

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300">
                <thead className="bg-gray-50 dark:bg-gray-800/50 text-xs uppercase text-gray-500 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3 font-medium">Usuario</th>
                        <th scope="col" className="px-4 py-3 font-medium">Producto</th>
                        <th scope="col" className="px-4 py-3 font-medium">Fecha</th>
                        <th scope="col" className="px-4 py-3 font-medium">Hora</th>
                        <th scope="col" className="px-4 py-3 font-medium">Tipo</th>
                        <th scope="col" className="px-4 py-3 font-medium text-right">Cant.</th>
                        <th scope="col" className="px-4 py-3 font-medium text-right">Stock Ant.</th>
                        <th scope="col" className="px-4 py-3 font-medium text-right">Saldo</th>
                        <th scope="col" className="px-4 py-3 font-medium">Motivo</th>
                        <th scope="col" className="px-4 py-3 font-medium">Turno</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                    {movimientos.length === 0 ? (
                        <tr>
                            <td colSpan="10" className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                No hay movimientos registrados aún.
                            </td>
                        </tr>
                    ) : (
                        movimientos.map((mov) => {
                            // 1. EXTRAEMOS DATOS SEGUROS (Evita errores si el objeto viene vacío o nulo)
                            const nombreProducto = mov.producto?.Nombre || 'Desconocido';
                            const inicialProducto = nombreProducto.charAt(0).toUpperCase();
                            
                            // Ajustamos el tipo para que el badge de color siempre funcione bien
                            const tipoMov = mov.tipo_movimiento || mov.tipo || '';
                            const esIngreso = tipoMov.toLowerCase() === 'ingreso';

                            // 2. CALCULAMOS EL SALDO DINÁMICAMENTE
                            const stockAnterior = Number(mov.stockAnt ?? mov.stock_anterior ?? 0);
                            const cantidad = Number(mov.cantidad ?? 0);
                            const saldoCalculado = esIngreso ? (stockAnterior + cantidad) : (stockAnterior - cantidad);

                            return (
                                <tr key={mov.id} className="hover:bg-gray-50 dark:hover:bg-[#1a1a27] transition-colors">
                                    
                                    {/* Columna Usuario: Manejo seguro para evitar error de objeto en React */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {mov.usuario?.name || mov.usuario?.Nombre || (typeof mov.usuario === 'string' ? mov.usuario : 'Sistema')}
                                    </td>

                                    {/* Columna Producto con Avatar */}
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${getAvatarColor(inicialProducto)}`}>
                                                {inicialProducto}
                                            </div>
                                            <span className="font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                                {nombreProducto}
                                            </span>
                                        </div>
                                    </td>
                                    
                                    {/* Resto de columnas */}
                                    <td className="px-4 py-3 whitespace-nowrap">{mov.fecha}</td>
                                    <td className="px-4 py-3 whitespace-nowrap">{mov.hora}</td>
                                    
                                    {/* Columna Tipo con Badges */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                                            esIngreso 
                                                ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800' 
                                                : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800'
                                        }`}>
                                            {/* Capitalizamos la primera letra */}
                                            {tipoMov ? tipoMov.charAt(0).toUpperCase() + tipoMov.slice(1).toLowerCase() : ''}
                                        </span>
                                    </td>

                                    <td className="px-4 py-3 text-right font-medium text-gray-900 dark:text-white">
                                        {mov.cantidad}
                                    </td>
                                    <td className="px-4 py-3 text-right text-gray-500 dark:text-gray-400">
                                        {mov.stockAnt ?? mov.stock_anterior ?? '-'}
                                    </td>
                                    
                                    {/* Columna Saldo: Intenta usar el dato del backend, si no existe o es nulo, usa nuestro cálculo */}
                                    <td className="px-4 py-3 text-right font-semibold text-gray-900 dark:text-white">
                                        {mov.saldo ?? mov.stock_actual ?? saldoCalculado}
                                    </td>
                                    
                                    <td className="px-4 py-3 min-w-[150px] truncate max-w-[200px]" title={mov.motivo}>
                                        {mov.motivo}
                                    </td>

                                    {/* Columna Turno: Manejo seguro para evitar error de objeto en React */}
                                    <td className="px-4 py-3 whitespace-nowrap">
                                        {mov.turno?.Nombre || mov.turno?.nombre || (typeof mov.turno === 'string' ? mov.turno : '-')}
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
}