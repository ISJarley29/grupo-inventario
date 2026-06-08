import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import FormularioTurno from './Partials/FormularioTurno';
import TablaTurnos from './Partials/TablaTurnos';

export default function Index({ auth, turnos }) {
    // ESTADO: Guarda el turno que seleccionamos para editar
    const [turnoEditando, setTurnoEditando] = useState(null);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Gestión de Turnos</h2>}
        >
            <Head title="Turnos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Columna Izquierda: Formulario */}
                        <div className="md:col-span-1">
                            <FormularioTurno 
                                turnoEditando={turnoEditando} 
                                setTurnoEditando={setTurnoEditando} 
                            />
                        </div>

                        {/* Columna Derecha: Tabla */}
                        <div className="md:col-span-2">
                            <TablaTurnos 
                                turnos={turnos} 
                                onEdit={setTurnoEditando} // Le pasamos la función para cambiar el estado
                            />
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}