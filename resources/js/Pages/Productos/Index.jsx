import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'; 
import ProductosToolbar from '@/Components/Productos/ProductosToolbar';
import ProductosTable from '@/Components/Productos/ProductosTable';
import ProductoDrawer from '@/Components/Productos/ProductoDrawer';
import ProductoForm from '@/Components/Productos/ProductoForm';
import ProductoBusquedaModal from './ProductoBusquedaModal';

export default function Index({ auth, productos, categorias, almacenes, unidades, filtros }) {
    
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [selectedProducto, setSelectedProducto] = useState(null);

    const openDrawerForCreate = () => {
        setSelectedProducto(null);
        setIsDrawerOpen(true);
    };

    const openDrawerForEdit = (producto) => {
        setSelectedProducto(producto);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedProducto(null);
    };

    const handleSearch = (nuevosFiltros) => {
        router.get(route('productos.index'), nuevosFiltros, {
            preserveState: true,
            replace: true
        });
        setIsSearchModalOpen(false);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Productos" />

            <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Cabecera y Herramientas */}
                <ProductosToolbar 
                    onAddClick={openDrawerForCreate} 
                    onAdvanceSearchClick={() => setIsSearchModalOpen(true)} 
                />

                {/* Tabla de Productos */}
                <div className="mt-6 bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
                    <ProductosTable 
                        productos={productos.data || productos} 
                        categorias={categorias} // <-- Propiedad agregada para el cruce de datos
                        almacenes={almacenes}   // <-- Propiedad agregada para el cruce de datos
                        unidades={unidades}     // <-- Propiedad agregada para el cruce de datos
                        onEditClick={openDrawerForEdit} 
                    />
                </div>
            </div>

            {/* Panel Lateral (Drawer) para Crear/Editar */}
            <ProductoDrawer 
                isOpen={isDrawerOpen} 
                onClose={closeDrawer}
                title={selectedProducto ? 'Editar Producto' : 'Registrar Producto'}
            >
                <ProductoForm 
                    producto={selectedProducto}
                    categorias={categorias}
                    almacenes={almacenes}
                    unidades={unidades}
                    onSuccess={closeDrawer}
                    onCancel={closeDrawer}
                />
            </ProductoDrawer>

            {/* Modal de Búsqueda Avanzada */}
            <ProductoBusquedaModal 
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
                onSearch={handleSearch}
                categorias={categorias}
                almacenes={almacenes}
                filtrosActuales={filtros || {}}
            />
        </AuthenticatedLayout>
    );
}