import React, { useEffect } from 'react';
import MovimientoForm from './MovimientoForm';

export default function MovimientoDrawer({ isOpen, onClose, productos }) {
    // Evitar scroll en el body cuando el Drawer está abierto
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <>
            {/* Overlay Oscuro */}
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
                    isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                onClick={onClose}
            ></div>

            {/* Panel del Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full md:w-[450px] bg-white dark:bg-[#11111d] shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Header del Drawer */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">Registrar Movimiento</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Añade o retira stock del almacén</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors bg-gray-100 dark:bg-gray-800 p-2 rounded-full"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Formulario */}
                <div className="flex-1 overflow-hidden">
                    <MovimientoForm onClose={onClose} productos={productos} />
                </div>
            </div>
        </>
    );
}