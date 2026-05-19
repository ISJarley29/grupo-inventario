import React from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ categorias }) {
  
  const handleEliminar = (id) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      router.delete(`/categorias/${id}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto mt-10">
      <Head title="Categorías" />
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Mantenimiento de Categorías</h1>
        <Link 
          href="/categorias/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
        >
          + Nueva Categoría
        </Link>
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
                  <Link 
                    href={`/categorias/${cat.IdCategoria}/edit`} 
                    className="text-amber-600 hover:text-amber-700 font-medium"
                  >
                    Editar
                  </Link>
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
  );
}