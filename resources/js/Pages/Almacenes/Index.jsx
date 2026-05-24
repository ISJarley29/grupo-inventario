import React, { useState } from 'react';
import AlmacenForm from '@/Components/Almacenes/AlmacenForm.jsx';
import AlmacenTable from '@/Components/Almacenes/AlmacenTable.jsx';

// 🌟 1. IMPORTA TU LAYOUT PRINCIPAL AQUÍ
// (Asegúrate de que se llame así en tu carpeta resources/js/Layouts/)
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; 

// 🌟 2. AGREGA "auth" A LAS PROPS (Para pasárselo al usuario del Sidebar)
export default function Index({ auth, almacenes }) {
    const [almacenEditando, setAlmacenEditando] = useState(null);

    const cancelarEdicion = () => {
        setAlmacenEditando(null);
    };

    return (
        // 🌟 3. ENVOLVEMOS TODO CON EL LAYOUT
        <AuthenticatedLayout user={auth.user}>
            
            {/* Todo tu contenido original se queda aquí dentro */}
            <div className="p-6 bg-gray-50 min-h-screen">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Gestión de Almacenes</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* LADO IZQUIERDO: Formulario */}
                    <div className="md:col-span-1 bg-white p-6 rounded-lg shadow border border-gray-200">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">
                            {almacenEditando ? '✏️ Editar Almacén' : '➕ Nuevo Almacén'}
                        </h2>
                        <AlmacenForm 
                            almacenEditando={almacenEditando} 
                            onSuccess={cancelarEdicion} 
                        />
                    </div>

                    {/* LADO DERECHO: Tabla */}
                    <div className="md:col-span-2 bg-white p-6 rounded-lg shadow border border-gray-200">
                        <AlmacenTable 
                            almacenes={almacenes} 
                            onEdit={setAlmacenEditando} 
                        />
                    </div>

                </div>
            </div>

        </AuthenticatedLayout>
    );
}