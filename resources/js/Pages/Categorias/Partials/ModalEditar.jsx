import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import Formulario from './Formulario';

export default function ModalEditar({ isOpen, onClose, categoria }) {
    // Inicializamos el formulario de Inertia vacío (el controlador de Laravel espera minúsculas)
    const { data, setData, put, processing, errors, reset } = useForm({
        nombre: '',
        descripcion: '',
    });

    // Cada vez que cambie la categoría seleccionada, cargamos los datos
    useEffect(() => {
        if (categoria) {
            setData({
                // 🔥 EL SECRETO ESTÁ AQUÍ: Leemos la mayúscula de la BD y la guardamos en la minúscula del state
                nombre: categoria.Nombre || '',
                descripcion: categoria.Descripcion || '',
            });
        }
    }, [categoria, isOpen]);

    const submit = (e) => {
        e.preventDefault();

        // 🔥 ACTUALIZACIÓN SIN ZIGGY: Usamos la URL directa leyendo el IdCategoria (con mayúscula inicial)
        put(`/categorias/${categoria.IdCategoria}`, {
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
