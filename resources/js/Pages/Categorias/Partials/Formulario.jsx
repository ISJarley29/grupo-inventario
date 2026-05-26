import React from 'react';

export default function Formulario({ data, setData, errors, processing }) {
    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de Categoría</label>
                <input
                    type="text"
                    value={data.nombre}
                    onChange={e => setData('nombre', e.target.value)}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${errors.nombre ? 'border-red-500' : ''}`}
                    placeholder="Ej: Periféricos"
                />
                {errors.nombre && <div className="text-red-500 text-xs mt-1">{errors.nombre}</div>}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                    value={data.descripcion}
                    onChange={e => setData('descripcion', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Opcional..."
                    rows="3"
                ></textarea>
                {errors.descripcion && <div className="text-red-500 text-xs mt-1">{errors.descripcion}</div>}
            </div>
        </div>
    );
}