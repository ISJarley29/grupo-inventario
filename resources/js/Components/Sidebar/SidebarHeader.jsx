import React from 'react';
import logoCefop from '../../../imagenes/logo.png';

export default function SidebarHeader({ user, isCollapsed }) {
    return (
        <div className="flex items-center mb-8">

            <div className="flex items-center justify-center w-12 h-12 min-w-[48px]">
                <img
                    src={logoCefop}
                    alt="Logo CEFOP"
                    className="w-full h-full object-contain"
                />
            </div>

            {!isCollapsed && (
                <div className="ml-3 overflow-hidden">
                    <h2 className="text-base font-semibold text-gray-800 dark:text-white truncate">
                        {user?.name || 'Usuario'}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.role || 'Administrador'}
                    </p>
                </div>
            )}
        </div>
    );
}
