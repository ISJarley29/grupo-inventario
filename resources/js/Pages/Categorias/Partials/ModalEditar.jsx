import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Formulario from './Formulario';

export default function ModalEditar({ isOpen, onClose, categoria }) {
    // Inicializamos el formulario de Inertia vacío
    const { data, setData, put, processing, errors, reset } = useForm({
        nombre: '',
        descripcion: '',
    });

    // Cada vez que cambie la categoría seleccionada o se abra el modal, cargamos los datos
    useEffect(() => {
        if (categoria) {
            setData({
                nombre: categoria.nombre || '',
                descripcion: categoria.descripcion || '',
            });
        }
    }, [categoria, isOpen]);

    const submit = (e) => {
        e.preventDefault();
        // Enviamos por método PUT a la ruta 'categorias.update' pasándole el ID correspondente
        put(route('categorias.update', categoria.id), {
            onSuccess: () => {
                onClose(); // Cerramos el modal al terminar con éxito
            },
        });
    };

    if (!isOpen || !categoria) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-gray-800">Editar Categoría</h2>
                
                <form onSubmit={submit}>
                    {/* Reutilizamos exactamente el mismo Formulario de antes */}
                    <Formulario 
                        data={data} 
                        setData={setData} 
                        errors={errors} 
                        processing={processing} 
                    />

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700 disabled:opacity-50"
                        >
                            {processing ? 'Actualizando...' : 'Actualizar Cambios'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}