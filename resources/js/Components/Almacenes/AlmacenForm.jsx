import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';

export default function AlmacenForm({ almacenEditando, onSuccess }) {
    // Inicializamos el formulario con los campos de tu base de datos
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        nombre: '',
        descripcion: '',
        estado: true, // true = Activo por defecto
    });

    // Este useEffect "escucha" si el usuario hizo clic en editar
    // Si hay un almacén seleccionado, llena los datos. Si no, resetea el form.
    useEffect(() => {
        if (almacenEditando) {
            setData({
                nombre: almacenEditando.nombre,
                descripcion: almacenEditando.descripcion || '',
                estado: almacenEditando.estado === 1 || almacenEditando.estado === true,
            });
        } else {
            reset();
        }
        clearErrors();
    }, [almacenEditando]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (almacenEditando) {
            // Modo Edición: Enviamos al update del controlador
            put(route('almacenes.update', almacenEditando.id), {
                onSuccess: () => onSuccess(),
            });
        } else {
            // Modo Creación: Enviamos al store del controlador
            post(route('almacenes.store'), {
                onSuccess: () => reset(),
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Nombre */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input 
                    type="text"
                    value={data.nombre}
                    onChange={e => setData('nombre', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    placeholder="Ej: Almacén Central"
                />
                {errors.nombre && <p className="text-red-500 text-xs mt-1">{errors.nombre}</p>}
            </div>

            {/* Campo Descripción */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea 
                    value={data.descripcion}
                    onChange={e => setData('descripcion', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    placeholder="Ubicación o detalles..."
                    rows="3"
                />
                {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
            </div>

            {/* Campo Estado */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select 
                    value={data.estado ? '1' : '0'}
                    onChange={e => setData('estado', e.target.value === '1')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                >
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
                {errors.estado && <p className="text-red-500 text-xs mt-1">{errors.estado}</p>}
            </div>

            {/* Botones de acción */}
            <div className="flex gap-2 pt-2">
                <button 
                    type="submit" 
                    disabled={processing}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                >
                    {almacenEditando ? 'Actualizar Almacén' : 'Crear Almacén'}
                </button>
                
                {almacenEditando && (
                    <button 
                        type="button" 
                        onClick={onSuccess}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded text-sm transition-colors"
                    >
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}