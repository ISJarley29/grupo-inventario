import { Link } from '@inertiajs/react';

export default function SidebarFooter({ isCollapsed, isDarkMode, toggleTheme }) {
    return (
        <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-800">
            <Link
                href={route('logout')}
                method="post"
                as="button"
                className="flex items-center w-full p-3 mb-2 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-red-400 transition-colors"
                title={isCollapsed ? "Logout" : ""}
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                {!isCollapsed && <span className="ml-4 text-sm font-medium">Cerrar Sesión</span>}
            </Link>

            {/* Selector de Modo Oscuro */}
            <div className={`flex items-center p-3 bg-gray-100 dark:bg-[#1a1a27] rounded-xl transition-colors ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                {!isCollapsed && (
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        <span className="text-sm font-medium">{isDarkMode ? 'Modo claro' : 'Modo oscuro'}</span>
                    </div>
                )}
                <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDarkMode ? 'bg-red-600' : 'bg-gray-300'}`}
                >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
            </div>
        </div>
    );
}
