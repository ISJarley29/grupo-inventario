import { Link } from '@inertiajs/react';

export default function SidebarMenuItem({ icon, label, routeName, active, isCollapsed }) {
    // Verificamos si la ruta es un placeholder ('#') de un módulo que aún no construyes
    const isPlaceholder = routeName === '#';

    // Clases de Tailwind (extraídas para mantener el código limpio)
    const linkClasses = `flex items-center p-3 rounded-xl transition-all duration-200 ${
        active
            ? 'bg-red-600 text-white shadow-md'
            : 'text-gray-600 hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
    }`;

    // El contenido del botón (Icono + Texto)
    const content = (
        <>
            <div className="flex items-center justify-center w-6 h-6">
                {icon}
            </div>
            {!isCollapsed && (
                <span className="ml-4 text-sm font-medium whitespace-nowrap">
                    {label}
                </span>
            )}
        </>
    );

    return (
        <li className="mb-1">
            {isPlaceholder ? (
                // Si es '#', usamos una etiqueta <a> normal que no hace nada
                <a
                    href="#"
                    onClick={(e) => e.preventDefault()} // Evita que la página salte hacia arriba
                    className={linkClasses}
                    title={isCollapsed ? label : ''}
                >
                    {content}
                </a>
            ) : (
                // Si es una ruta real, usamos el Link de Inertia para la transición fluida
                <Link
                    href={routeName}
                    className={linkClasses}
                    title={isCollapsed ? label : ''}
                >
                    {content}
                </Link>
            )}
        </li>
    );
}
