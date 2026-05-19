import { useState, useEffect } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarMenuItem from './SidebarMenuItem';
import SidebarFooter from './SidebarFooter';

export default function Sidebar({ user }) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

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

    // Lista de menús con rutas dinámicas
    const menuItems = [
        {
            label: 'Dashboard',
            routeName: route('dashboard'),
            active: route().current('dashboard'),
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
        },
        {
            label: 'Revenue',
            routeName: '#',
            active: false,
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        },
        {
            label: 'Notifications',
            routeName: '#',
            active: false,
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
        },
        {
            label: 'Analytics',
            routeName: '#',
            active: false,
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path></svg>
        },
        {
            label: 'Likes',
            routeName: '#',
            active: false,
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
        },
        {
            label: 'Categorias',
            routeName: route('categorias.index'),
            active:  route().current('categorias.index'),
            icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
        },
    ];

    return (
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
                {menuItems.map((item, index) => (
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
            />
        </aside>
    );
}
