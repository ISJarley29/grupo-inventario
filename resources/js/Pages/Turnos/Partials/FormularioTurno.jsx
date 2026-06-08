import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

// Recibimos las props del padre
export default function FormularioTurno({ turnoEditando, setTurnoEditando }) {
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        Nombre: '',
        Hora_inicio: '',
        Hora_fin: '',
        Descripcion: '',
        Estado: 'Activo',
    });

    // EFFECT: Se ejecuta cada vez que "turnoEditando" cambia
    useEffect(() => {
        if (turnoEditando) {
            // Si hay un turno seleccionado, llenamos el formulario (Asegurando formato HH:mm)
            setData({
                Nombre: turnoEditando.Nombre,
                Hora_inicio: turnoEditando.Hora_inicio.substring(0, 5), // Cortamos los segundos si existen
                Hora_fin: turnoEditando.Hora_fin.substring(0, 5),
                Descripcion: turnoEditando.Descripcion || '',
                Estado: turnoEditando.Estado,
            });
            clearErrors();
        } else {
            // Si es null, limpiamos el formulario para crear uno nuevo
            reset();
            clearErrors();
        }
    }, [turnoEditando]);

    const submit = (e) => {
        e.preventDefault();

        if (turnoEditando) {
            // ACTUALIZAR (PUT)
            put(route('turnos.update', turnoEditando.IdTurno), {
                onSuccess: () => {
                    reset();
                    setTurnoEditando(null); // Salimos del modo edición
                },
            });
        } else {
            // CREAR (POST)
            post(route('turnos.store'), {
                onSuccess: () => reset(), 
            });
        }
    };

    const cancelarEdicion = () => {
        setTurnoEditando(null);
        reset();
        clearErrors();
    };

    return (
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <span className="mr-2 text-xl">{turnoEditando ? '✏️' : '+'}</span> 
                {turnoEditando ? 'Editar Turno' : 'Nuevo Turno'}
            </h3>

            <form onSubmit={submit} className="space-y-4">
                {/* Nombre */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                        type="text"
                        className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                        placeholder="Ej: Mañana"
                        value={data.Nombre}
                        onChange={e => setData('Nombre', e.target.value)}
                    />
                    {errors.Nombre && <div className="text-red-500 text-xs mt-1">{errors.Nombre}</div>}
                </div>

                {/* Horas (Grid de 2 columnas) */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hora Inicio</label>
                        <input
                            type="time"
                            className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                            value={data.Hora_inicio}
                            onChange={e => setData('Hora_inicio', e.target.value)}
                        />
                        {errors.Hora_inicio && <div className="text-red-500 text-xs mt-1">{errors.Hora_inicio}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hora Fin</label>
                        <input
                            type="time"
                            className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                            value={data.Hora_fin}
                            onChange={e => setData('Hora_fin', e.target.value)}
                        />
                        {errors.Hora_fin && <div className="text-red-500 text-xs mt-1">{errors.Hora_fin}</div>}
                    </div>
                </div>

                {/* Descripción */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Descripción</label>
                    <textarea
                        className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                        rows="3"
                        placeholder="Detalles del turno..."
                        value={data.Descripcion}
                        onChange={e => setData('Descripcion', e.target.value)}
                    ></textarea>
                </div>

                {/* Estado */}
                <div>
                    <label className="block text-sm font-medium text-gray-700">Estado</label>
                    <select
                        className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-md shadow-sm"
                        value={data.Estado}
                        onChange={e => setData('Estado', e.target.value)}
                    >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                    </select>
                </div>

                {/* Botones */}
                <div className="flex flex-col space-y-2 mt-4">
                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                    >
                        {turnoEditando ? 'Actualizar Turno' : 'Crear Turno'}
                    </button>
                    
                    {turnoEditando && (
                        <button
                            type="button"
                            onClick={cancelarEdicion}
                            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
                        >
                            Cancelar Edición
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}