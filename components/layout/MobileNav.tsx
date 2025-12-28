
import React, { useState } from 'react';
import { NAV_LINKS, SERVICE_NAMES } from '../../constants.ts';
import { CloseIcon, ChevronDownIcon } from '../ui/icons.tsx';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
    const [isServicesOpen, setServicesOpen] = useState(false);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>
            <div className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-slate-50 shadow-lg`}>
                <div className="p-4 flex items-center justify-between border-b border-slate-200">
                    <a href="#" className="text-2xl font-bold text-slate-800">
                        u-cloud<span className="text-sky-500">24</span>
                    </a>
                    <button onClick={onClose} className="p-2 rounded-md text-slate-600 hover:bg-slate-200">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <nav className="p-6 space-y-4">
                    {NAV_LINKS.map(link => (
                        <a key={link.name} href={link.href} onClick={onClose} className="block py-2 text-lg font-medium text-slate-700 hover:text-sky-500">
                            {link.name}
                        </a>
                    ))}
                    <div>
                        <button onClick={() => setServicesOpen(!isServicesOpen)} className="w-full flex justify-between items-center py-2 text-lg font-medium text-slate-700 hover:text-sky-500">
                            <span>Услуги</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isServicesOpen && (
                            <div className="mt-2 pl-4 space-y-2 border-l-2 border-slate-200">
                                {SERVICE_NAMES.map(service => (
                                    <a key={service} href="#services" onClick={onClose} className="block py-1 text-base text-slate-600 hover:text-sky-500">
                                        {service}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="pt-6">
                        <a href="#" className="w-full block text-center px-5 py-4 text-lg font-semibold text-white bg-orange-500 rounded-lg shadow-sm hover:bg-orange-600 transition-colors">
                            Запустить регистрацию
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MobileNav;
