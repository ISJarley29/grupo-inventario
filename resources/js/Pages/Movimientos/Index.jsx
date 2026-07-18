import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; // Ajusta la ruta de tu Layout
import MovimientosToolbar from '@/Components/Movimientos/MovimientosToolbar';
import MovimientosTable from '@/Components/Movimientos/MovimientosTable';
import MovimientoDrawer from '@/Components/Movimientos/MovimientoDrawer';

export default function MovimientosIndex({ auth, movimientos, productos }) {
    // Estado para controlar la visibilidad del Drawer (Formulario lateral)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // Función para abrir el Drawer
    const handleOpenDrawer = () => {
        setIsDrawerOpen(true);
    };

    // Función para cerrar el Drawer
    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Movimientos (Kardex)" />

            <div className="p-4 sm:p-6 lg:p-8 w-full">
                <div className="bg-white dark:bg-[#11111d] rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6">
                    
                    {/* Renderizamos el Toolbar de la Parte 1 */}
                    <MovimientosToolbar onAddClick={handleOpenDrawer} />

                    {/* Renderizamos la Tabla (Parte 2) limpia sin bordes punteados */}
                    <div className="mt-6 border-t border-gray-100 dark:border-gray-800 pt-6">
                        <MovimientosTable movimientos={movimientos} />
                    </div>

                </div>
            </div>

            {/* Renderizamos el Drawer (Parte 3) pasando la variable productos */}
            <MovimientoDrawer 
                isOpen={isDrawerOpen} 
                onClose={handleCloseDrawer} 
                productos={productos} 
            />

        </AuthenticatedLayout>
    );
}