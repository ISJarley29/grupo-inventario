import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import ModalNueva from './Partials/ModalNueva';
import ModalEditar from './Partials/ModalEditar';

export default function Index({ auth, categorias }) {

    console.log("Categorías recibidas de Laravel:", categorias);

    // Estados para Modal Nueva Categoría
    const [isModalNuevaOpen, setIsModalNuevaOpen] = useState(false);

    // Estados para Modal Editar Categoría
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
    const [categoriaAEditar, setCategoriaAEditar] = useState(null);

    // Función para eliminar
    const handleEliminar = (id) => {
        if (confirm('¿Estás seguro de eliminar esta categoría?')) {
            router.delete(`/categorias/${id}`);
        }
    };

    const abrirModalEditar = (categoria) => {
        setCategoriaAEditar(categoria);
        setIsModalEditarOpen(true);
    };

    return (
        <AuthenticatedLayout user={auth?.user}>
            <Head title="Gestión de Categorías" />

            <div className="min-h-screen bg-gray-50 p-8 dark:bg-[#11111d]">

                {/* ENCABEZADO Y BOTONES SUPERIORES */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Categorías</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Gestiona las categorías del sistema.</p>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            onClick={() => setIsModalNuevaOpen(true)}
                            className="flex items-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-700"
                        >
                            + Nueva Categoría
                        </button>
                    </div>
                </div>

                {/* TABLA DE DATOS AL 100% DEL ANCHO */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 dark:bg-[#1a1a27] dark:ring-gray-800">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Nombre</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Descripción</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#1a1a27]">
                            {categorias.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                                        No hay categorías registradas.
                                    </td>
                                </tr>
                            ) : (
                                categorias.map((cat, index) => (
                                    <tr key={cat.id || cat.id_categoria} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                            {index + 1}
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white">{cat.nombre}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600 dark:text-gray-300">
                                                {cat.descripcion || 'Sin descripción'}
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                            <div className="flex justify-end space-x-2">
                                                <button
                                                    onClick={() => abrirModalEditar(cat)}
                                                    className="flex items-center rounded-md bg-amber-50 px-2 py-1.5 text-amber-600 transition-colors hover:bg-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:hover:bg-amber-900/40"
                                                    title="Editar Categoría"
                                                >
                                                    <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>
                                                    Editar
                                                </button>

                                                <button
                                                    onClick={() => handleEliminar(cat.id)}
                                                    className="flex items-center rounded-md bg-red-50 px-2 py-1.5 text-red-600 transition-colors hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40"
                                                    title="Eliminar Categoría"
                                                >
                                                    <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>
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

            {/* Modal para CREAR */}
            <ModalNueva
                isOpen={isModalNuevaOpen}
                onClose={() => setIsModalNuevaOpen(false)}
            />

            {/* Modal para EDITAR */}
            <ModalEditar
                isOpen={isModalEditarOpen}
                onClose={() => {
                    setIsModalEditarOpen(false);
                    setCategoriaAEditar(null);
                }}
                categoria={categoriaAEditar}
            />
        </AuthenticatedLayout>
    );
}
