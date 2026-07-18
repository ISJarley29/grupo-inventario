import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import SidebarHeader from './SidebarHeader';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarFooter from './SidebarFooter';

export default function Sidebar({ user }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    // FUNCIÓN PARA EJECUTAR EL CIERRE DE SESIÓN
    const confirmarCerrarSesion = () => {
        router.post(route('logout'));
    };

    // 1. AÑADIMOS allowedRoles A CADA MENÚ
    const menuItems = [
        {
            label: 'Dashboard',
            routeName: route('dashboard'),
            active: route().current('dashboard'),
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
            allowedRoles: ['admin'] // Solo Admin
        },
        {
            label: 'Unidades de Medida',
            routeName: route('unidad-medidas.index'),
            active: route().current('unidad-medidas.index'),
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>,
            allowedRoles: ['admin', 'docente'] // Admin y Docente
        },
        {
            label: 'Usuarios',
            routeName: route('usuarios.index'),
            active: route().current('usuarios.*'),
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>,
            allowedRoles: ['admin'] // Solo Admin
        },
        {
            label: 'Turnos',
            routeName: route('turnos.index'),
            active: route().current('turnos.*'),
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
            allowedRoles: ['admin', 'docente'] // Admin y Docente
        },
        {
            label: 'Productos',
            routeName: route('productos.index'),
            active: route().current('productos.*'),
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>,
            allowedRoles: ['admin', 'docente'] // Admin y Docente
        },
        {
            label: 'Movimientos',
            routeName: route('movimientos.index'),
            active: route().current('movimientos.*'),
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>,
            allowedRoles: ['admin', 'docente'] // Admin y Docente
        },
        {
            label: 'Categorias',
            routeName: route('categorias.index'),
            active: route().current('categorias.index'),
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>,
            allowedRoles: ['admin', 'docente', 'estudiante'] // Todos
        },
        {
            label: 'Almacenes',
            routeName: route('almacenes.index'),
            active: route().current('almacenes.*'),
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>,
            allowedRoles: ['admin', 'docente', 'estudiante'] // Todos
        },
    ];

    // 2. FILTRAMOS LOS MENÚS SEGÚN EL ROL DEL USUARIO
    const filteredMenuItems = menuItems.filter(item =>
        user && user.role && item.allowedRoles.includes(user.role)
    );

    return (
        <>
            <aside
                className={`${isCollapsed ? 'w-20' : 'w-64'} flex flex-col h-screen px-4 py-6 bg-white dark:bg-[#11111d] border-r border-gray-100 dark:border-gray-800 transition-all duration-300 relative shrink-0`}
            >
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-9 bg-red-600 text-white rounded-full p-1 shadow-md z-10 hover:bg-red-800 transition-colors"
                >
                    <svg className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                </button>

                <SidebarHeader user={user} isCollapsed={isCollapsed} />

                <div className={`flex items-center bg-gray-50 dark:bg-[#1a1a27] rounded-xl mb-6 p-3 ${isCollapsed ? 'justify-center' : ''}`}>
                    <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    {!isCollapsed && (
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700 dark:text-gray-300 placeholder-gray-400 focus:ring-0"
                        />
                    )}
                </div>

                <ul className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
                    {/* 3. DIBUJAMOS SOLO LOS MENÚS FILTRADOS */}
                    {filteredMenuItems.map((item, index) => (
                        <SidebarMenuItem
                            key={index}
                            label={item.label}
                            routeName={item.routeName}
                            active={item.active}
                            icon={item.icon}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </ul>

                <SidebarFooter
                    isCollapsed={isCollapsed}
                    isDarkMode={isDarkMode}
                    toggleTheme={toggleTheme}
                    onLogoutClick={() => setShowLogoutModal(true)}
                />
            </aside>

            {/* MODAL DE CONFIRMACIÓN DE CIERRE DE SESIÓN */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 px-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl w-full max-w-sm transform transition-all">

                        <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                            <svg className="w-6 h-6 text-red-600 dark:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white mb-2">
                            ¿Cerrar sesión?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-6">
                            ¿Estás seguro de que deseas salir del sistema? Tendrás que volver a ingresar tus credenciales.
                        </p>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 rounded-md transition-colors"
                            >
                                No, cancelar
                            </button>
                            <button
                                onClick={confirmarCerrarSesion}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-sm"
                            >
                                Sí, salir
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}