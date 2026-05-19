import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import ModalNueva from './Categorias/Partials/ModalNueva';
import ModalEditar from './Categorias/Partials/ModalEditar'; // Importamos el nuevo modal

export default function Dashboard({ auth, categorias }) {
    // Estados para el Modal de Creación
    const [isModalNuevaOpen, setIsModalNuevaOpen] = useState(false);

    // Estados para el Modal de Edición
    const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);

    // Función para activar la Edición
    const handleEditarClick = (categoria) => {
        setCategoriaSeleccionada(categoria); // Guardamos la categoría que se va a editar
        setIsModalEditarOpen(true);          // Abrimos la ventana flotante
    };

    // Función para procesar la Eliminación definitiva
    const handleEliminar = (id) => {
        if (confirm('¿Estás seguro de eliminar esta categoría de forma permanente?')) {
            // Mandamos el delete a la ruta resource 'categorias.destroy'
            router.delete(route('categorias.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard General</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        
                        <div className="p-6 bg-white border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-700">Test de Categorías</h3>
                            <button 
                                onClick={() => setIsModalNuevaOpen(true)}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded shadow transition text-sm font-medium"
                            >
                                + Nueva Categoría
                            </button>
                        </div>

                        <div className="p-6 bg-gray-50">
                            <table className="w-full border-collapse border border-gray-200 bg-white rounded-lg overflow-hidden shadow-sm">
                                <thead className="bg-gray-100">
                                    <tr className="text-left text-xs uppercase font-semibold text-gray-600">
                                        <th className="p-3 border-b">ID</th>
                                        <th className="p-3 border-b">Nombre</th>
                                        <th className="p-3 border-b">Descripción</th>
                                        <th className="p-3 border-b text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 text-sm">
                                    {!categorias || categorias.length === 0 ? (
                                        <tr>
                                            <td colSpan="4" className="text-center p-6 text-gray-400">
                                                No hay categorías registradas en XAMPP. ¡Crea una!
                                            </td>
                                        </tr>
                                    ) : (
                                        categorias.map((cat) => (
                                            <tr key={cat.id} className="hover:bg-gray-50 border-b border-gray-100 transition">
                                                <td className="p-3 font-mono text-gray-400">{cat.id}</td>
                                                <td className="p-3 font-semibold text-gray-900">{cat.nombre}</td>
                                                <td className="p-3 text-gray-500">{cat.descripcion || '-'}</td>
                                                <td className="p-3 text-center flex justify-center gap-4">
                                                    {/* Botón Editar: Pasa toda la fila del bucle */}
                                                    <button 
                                                        onClick={() => handleEditarClick(cat)}
                                                        className="text-amber-600 hover:text-amber-800 font-medium hover:underline"
                                                    >
                                                        Editar
                                                    </button>
                                                    {/* Botón Eliminar */}
                                                    <button 
                                                        onClick={() => handleEliminar(cat.id)} 
                                                        className="text-red-600 hover:text-red-800 font-medium hover:underline"
                                                    >
                                                        Eliminar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ventana Flotante 1: Registro */}
            <ModalNueva 
                isOpen={isModalNuevaOpen} 
                onClose={() => setIsModalNuevaOpen(false)} 
            />

            {/* Ventana Flotante 2: Edición */}
            <ModalEditar 
                isOpen={isModalEditarOpen} 
                onClose={() => {
                    setIsModalEditarOpen(false);
                    setCategoriaSeleccionada(null); // Limpiamos la selección al cerrar
                }} 
                categoria={categoriaSeleccionada}
            />
        </AuthenticatedLayout>
    );
}