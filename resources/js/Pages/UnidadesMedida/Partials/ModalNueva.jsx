import React from 'react';
import { useForm } from '@inertiajs/react';
import Formulario from './Formulario';

export default function ModalNueva({ isOpen, onClose }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        nombre: '',
        abreviatura: '',
    });

    const submit = (e) => {
        e.preventDefault();
        // Usamos la URL directa en lugar de Ziggy
        post('/unidad-medidas', {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold text-gray-800">Registrar Unidad de Medida</h2>

                <form onSubmit={submit}>
                    <Formulario
                        data={data}
                        setData={setData}
                        errors={errors}
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
                            className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 disabled:opacity-50"
                        >
                            {processing ? 'Guardando...' : 'Guardar Unidad'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
