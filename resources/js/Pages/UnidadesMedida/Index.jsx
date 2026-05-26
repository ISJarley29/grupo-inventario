import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ModalNueva from './Partials/ModalNueva';
import ModalEditar from './Partials/ModalEditar';

export default function Index({ auth, unidades }) {
    const [isModalNuevaOpen, setIsModalNuevaOpen] = useState(false);
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
    const [unidadAEditar, setUnidadAEditar] = useState(null);

    const handleEliminar = (id) => {
        if (confirm('¿Estás seguro de eliminar esta unidad de medida?')) {
            router.delete(`/unidad-medidas/${id}`);
        }
    };

    const abrirModalEditar = (unidad) => {
        setUnidadAEditar(unidad);
        setIsModalEditarOpen(true);
    };

    return (
        <AuthenticatedLayout
            user={auth?.user}
            header={<h2 className="font-semibold text-xl text-red-600 leading-tight">Gestión de Unidades de Medida</h2>}
        >
            <Head title="Unidades de Medida" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">

                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">Lista de Unidades</h1>
                            <button
                                onClick={() => setIsModalNuevaOpen(true)}
                                className="bg-red-600 hover:bg-res-600 text-white px-4 py-2 rounded shadow transition"
                            >
                                + Nueva Unidad
                            </button>
                        </div>

                        <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                            <thead>
                                <tr className="bg-gray-100 text-gray-700 text-left">
                                    <th className="border-b p-3">ID</th>
                                    <th className="border-b p-3">Nombre</th>
                                    <th className="border-b p-3">Abreviatura</th>
                                    <th className="border-b p-3 text-center">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {unidades.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="text-center p-4 text-gray-500">No hay unidades registradas.</td>
                                    </tr>
                                ) : (
                                    unidades.map((uni, index) => (
                                        <tr key={uni.id} className="hover:bg-gray-50 text-gray-600">
                                            <td className="border-b p-3">{index + 1}</td>
                                            <td className="border-b p-3 font-medium text-gray-900">{uni.nombre}</td>
                                            <td className="border-b p-3">{uni.abreviatura}</td>
                                            <td className="border-b p-3 text-center">
                                                <div className="flex justify-center gap-4">
                                                    <button
                                                        onClick={() => abrirModalEditar(uni)}
                                                        className="text-amber-600 hover:text-amber-700 font-medium transition"
                                                    >
                                                        Editar
                                                    </button>
                                                    <button
                                                        onClick={() => handleEliminar(uni.id)}
                                                        className="text-red-600 hover:text-red-700 font-medium transition"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <ModalNueva
                isOpen={isModalNuevaOpen}
                onClose={() => setIsModalNuevaOpen(false)}
            />

            <ModalEditar
                isOpen={isModalEditarOpen}
                onClose={() => {
                    setIsModalEditarOpen(false);
                    setUnidadAEditar(null);
                }}
                unidad={unidadAEditar}
            />

        </AuthenticatedLayout>
    );
}
