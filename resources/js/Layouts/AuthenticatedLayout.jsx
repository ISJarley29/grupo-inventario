import Sidebar from '@/Components/Sidebar/Sidebar';
import { usePage } from '@inertiajs/react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900 font-sans overflow-hidden">

            <Sidebar user={user} />

            <div className="flex-1 overflow-y-auto">

                {header && (
                    <header className="bg-white dark:bg-[#1a1a27] shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

                <main className="p-8">
                    {children}
                </main>

            </div>
        </div>
    );
}
