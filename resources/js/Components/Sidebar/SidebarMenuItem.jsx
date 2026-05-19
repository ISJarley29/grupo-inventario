import { Link } from '@inertiajs/react';

export default function SidebarMenuItem({ icon, label, routeName, active, isCollapsed }) {
    return (
        <li className="mb-1">
            <Link
                href={routeName}
                className={`flex items-center p-3 rounded-xl transition-all duration-200 ${
                    active
                        ? 'bg-red-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
                }`}
                title={isCollapsed ? label : ''}
            >
                <div className="flex items-center justify-center w-6 h-6">
                    {icon}
                </div>
                {!isCollapsed && (
                    <span className="ml-4 text-sm font-medium whitespace-nowrap">
                        {label}
                    </span>
                )}
            </Link>
        </li>
    );
}
