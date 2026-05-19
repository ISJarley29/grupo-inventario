import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

// Importamos los dos modales de tu compañero
import ModalNueva from './Partials/ModalNueva';
import ModalEditar from './Partials/ModalEditar';

export default function Index({ auth, categorias }) {

  // Estados para Modal Nueva Categoría
  const [isModalNuevaOpen, setIsModalNuevaOpen] = useState(false);

  // Estados para Modal Editar Categoría
  const [isModalEditarOpen, setIsModalEditarOpen] = useState(false);
  const [categoriaAEditar, setCategoriaAEditar] = useState(null); // Aquí guardaremos los datos de la fila que clickeamos

  const handleEliminar = (id) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      router.delete(`/categorias/${id}`);
    }
  };

  // Función para abrir el modal de edición pasándole la categoría correcta
  const abrirModalEditar = (categoria) => {
      setCategoriaAEditar(categoria);
      setIsModalEditarOpen(true);
  };

  return (
    <AuthenticatedLayout
        user={auth?.user}
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Mantenimiento de Categorías</h2>}
    >
        <Head title="Categorías" />

        <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto">

                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Lista de Categorías</h1>

                    <button
                      onClick={() => setIsModalNuevaOpen(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
                    >
                      + Nueva Categoría
                    </button>
                  </div>

                  <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700 text-left">
                        <th className="border-b p-3">ID</th>
                        <th className="border-b p-3">Nombre</th>
                        <th className="border-b p-3">Descripción</th>
                        <th className="border-b p-3 text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categorias.length === 0 ? (
                        <tr>
                          <td colSpan="4" className="text-center p-4 text-gray-500">No hay categorías registradas.</td>
                        </tr>
                      ) : (
                        categorias.map((cat) => (
                          <tr key={cat.IdCategoria} className="hover:bg-gray-50 text-gray-600">
                            <td className="border-b p-3">{cat.IdCategoria}</td>
                            <td className="border-b p-3 font-medium text-gray-900">{cat.Nombre}</td>
                            <td className="border-b p-3">{cat.Descripcion || 'Sin descripción'}</td>
                            <td className="border-b p-3 text-center flex justify-center gap-2">

                              {/* 1. CAMBIAMOS EL <Link> POR UN <button> Y LLAMAMOS A LA FUNCIÓN */}
                              <button
                                onClick={() => abrirModalEditar(cat)}
                                className="text-amber-600 hover:text-amber-700 font-medium"
                              >
                                Editar
                              </button>

                              <button
                                onClick={() => handleEliminar(cat.IdCategoria)}
                                className="text-red-600 hover:text-red-700 font-medium"
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

        {/* Modal para CREAR */}
        <ModalNueva
            isOpen={isModalNuevaOpen}
            onClose={() => setIsModalNuevaOpen(false)}
        />

        {/* 2. AGREGAMOS EL MODAL PARA EDITAR */}
        <ModalEditar
            isOpen={isModalEditarOpen}
            onClose={() => {
                setIsModalEditarOpen(false);
                setCategoriaAEditar(null); // Limpiamos la categoría al cerrar
            }}
            categoria={categoriaAEditar} // Le pasamos la categoría que seleccionamos
        />

    </AuthenticatedLayout>
  );
}
