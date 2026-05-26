import React, { useState } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, usuarios: usuariosBackend }) {
    // ESTADOS DEL DRAWER Y MODO EDICIÓN
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    // MOCK DATA (Se usa si el backend aún no envía datos)
    const mockUsuarios = [
        { id: 1, name: 'Ana Silva', email: 'ana.silva@sistema.com', role: 'admin', status: true },
        { id: 2, name: 'Carlos Gomez', email: 'carlos.gomez@sistema.com', role: 'docente', status: true },
        { id: 3, name: 'Luis Ramirez', email: 'luis.ram@sistema.com', role: 'estudiante', status: false },
    ];

    const usuarios = usuariosBackend?.length > 0 ? usuariosBackend : mockUsuarios;

    // INERTIA FORM HOOK
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'estudiante',
        status: true,
    });

    // ABRIR DRAWER PARA CREAR
    const openCreateDrawer = () => {
        setIsEditing(false);
        setEditingUserId(null);
        reset();
        clearErrors();
        setIsDrawerOpen(true);
    };

    // ABRIR DRAWER PARA EDITAR
    const openEditDrawer = (user) => {
        setIsEditing(true);
        setEditingUserId(user.id);
        setData({
            name: user.name,
            email: user.email,
            password: '', // Se deja vacío; el backend debe ignorarlo si no se llena
            role: user.role,
            status: user.status,
        });
        clearErrors();
        setIsDrawerOpen(true);
    };

    // CERRAR DRAWER
    const closeDrawer = () => {
        setIsDrawerOpen(false);
        reset();
        clearErrors();
    };

    // ENVIAR FORMULARIO (CREAR O ACTUALIZAR)
    const submitForm = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('usuarios.update', editingUserId), {
                onSuccess: () => closeDrawer(),
            });
        } else {
            post(route('usuarios.store'), {
                onSuccess: () => closeDrawer(),
            });
        }
    };

    // DAR DE BAJA (ELIMINADO LÓGICO)
    const handleDarDeBaja = (user) => {
        if (window.confirm(`¿Estás seguro de dar de baja al usuario ${user.name}?`)) {
            router.put(route('usuarios.update', user.id), {
                name: user.name,
                email: user.email,
                role: user.role,
                status: false,
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Gestión de Usuarios" />

            <div className="min-h-screen bg-gray-50 p-8 dark:bg-[#11111d]">
                
                {/* ENCABEZADO Y BOTONES SUPERIORES */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Usuarios</h1>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Gestiona los accesos y roles del sistema.</p>
                    </div>
                    
                    <div className="flex space-x-3">
                        <button className="flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Descargar en Excel
                        </button>
                        <button 
                            onClick={openCreateDrawer}
                            className="flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700"
                        >
                            + Agregar Usuario
                        </button>
                    </div>
                </div>

                {/* TABLA DE DATOS */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 dark:bg-[#1a1a27] dark:ring-gray-800">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Nombre</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Email</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Rol</th>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Estado</th>
                                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#1a1a27]">
                            {usuarios.map((user) => (
                                <tr key={user.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                                        {user.email}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className="text-sm capitalize text-gray-600 dark:text-gray-300">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                            user.status 
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                                                : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                        }`}>
                                            {user.status ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                                        <div className="flex justify-end space-x-2">
                                            <button 
                                                onClick={() => openEditDrawer(user)}
                                                className="flex items-center rounded-md bg-green-50 px-2 py-1.5 text-green-600 transition-colors hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400 dark:hover:bg-green-900/40"
                                                title="Editar Usuario"
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" /></svg>
                                                Editar
                                            </button>

                                            <button 
                                                onClick={() => handleDarDeBaja(user)}
                                                disabled={!user.status}
                                                className={`flex items-center rounded-md px-2 py-1.5 transition-colors ${
                                                    user.status 
                                                        ? 'bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40' 
                                                        : 'cursor-not-allowed bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600'
                                                }`}
                                                title={user.status ? "Dar de baja" : "Usuario inactivo (Activar desde edición)"}
                                            >
                                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" /></svg>
                                                {user.status ? 'Dar de baja' : 'Inactivo'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* DRAWER LATERAL */}
                {isDrawerOpen && (
                    <div className="relative z-50">
                        {/* Backdrop Oscuro */}
                        <div 
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                            onClick={closeDrawer}
                        ></div>

                        {/* Panel */}
                        <div className="fixed inset-y-0 right-0 flex w-full max-w-md transform flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-[#1a1a27]">
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-800">
                                <h2 className={`text-lg font-semibold ${isEditing ? 'text-green-600' : 'text-gray-900 dark:text-white'}`}>
                                    {isEditing ? 'Actualizar Usuario' : 'Registrar Usuario'}
                                </h2>
                                <button onClick={closeDrawer} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            {/* FORMULARIO INERTIA */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <form onSubmit={submitForm} className="space-y-5">
                                    
                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Nombre Completo</label>
                                        <input 
                                            type="text" 
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#11111d] dark:text-white"
                                            required
                                        />
                                        {errors.name && <div className="mt-1 text-xs font-semibold text-red-500">{errors.name}</div>}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Correo Electrónico</label>
                                        <input 
                                            type="email" 
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#11111d] dark:text-white"
                                            required
                                        />
                                        {errors.email && <div className="mt-1 text-xs font-semibold text-red-500">{errors.email}</div>}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                            Contraseña {isEditing && <span className="text-xs text-gray-400 font-normal">(Dejar en blanco para no cambiar)</span>}
                                        </label>
                                        <input 
                                            type="password" 
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#11111d] dark:text-white"
                                            placeholder="••••••••"
                                            required={!isEditing}
                                        />
                                        {errors.password && <div className="mt-1 text-xs font-semibold text-red-500">{errors.password}</div>}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Rol del Usuario</label>
                                        <select 
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#11111d] dark:text-white"
                                        >
                                            <option value="admin">Administrador</option>
                                            <option value="docente">Docente</option>
                                            <option value="estudiante">Estudiante</option>
                                        </select>
                                        {errors.role && <div className="mt-1 text-xs font-semibold text-red-500">{errors.role}</div>}
                                    </div>

                                    <div>
                                        <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Estado</label>
                                        <select 
                                            value={data.status ? '1' : '0'}
                                            onChange={(e) => setData('status', e.target.value === '1')}
                                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700 dark:bg-[#11111d] dark:text-white"
                                        >
                                            <option value="1">Activo</option>
                                            <option value="0">Inactivo</option>
                                        </select>
                                        {errors.status && <div className="mt-1 text-xs font-semibold text-red-500">{errors.status}</div>}
                                    </div>

                                </form>
                            </div>

                            {/* FOOTER DEL DRAWER */}
                            <div className="border-t border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-[#1a1a27]">
                                <div className="flex justify-end space-x-3">
                                    <button 
                                        type="button" 
                                        onClick={closeDrawer}
                                        className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                                    >
                                        Cancelar
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={submitForm}
                                        disabled={processing}
                                        className={`rounded-lg px-4 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-50 ${
                                            isEditing 
                                                ? 'bg-green-600 hover:bg-green-700' 
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    >
                                        {processing ? 'Procesando...' : (isEditing ? 'Actualizar' : 'Guardar Usuario')}
                                    </button>
                                </div>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}