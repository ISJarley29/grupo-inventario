export default function SidebarHeader({ user, isCollapsed }) {
    return (
        <div className="flex items-center mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-lg text-white font-bold text-xl min-w-[40px]">
                CL
            </div>
            {!isCollapsed && (
                <div className="ml-3 overflow-hidden">
                    <h2 className="text-base font-semibold text-gray-800 dark:text-white truncate">
                        {user?.name || 'Codinglab'}
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user?.role || 'Web developer'}
                    </p>
                </div>
            )}
        </div>
    );
}
