
import React, { useState } from 'react';
import { useLanguage, languages } from '../../LanguageContext.tsx';
import { CloseIcon, ChevronDownIcon, LanguageIcon } from '../ui/icons.tsx';
import { useNavigate, useLocation } from 'react-router-dom';

interface MobileNavProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
    const [isServicesOpen, setServicesOpen] = useState(false);
    const [isLanguageOpen, setLanguageOpen] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const navigate = useNavigate();
    const location = useLocation();

    if (!isOpen) return null;

    const handleLanguageChange = (lang: typeof language) => {
        setLanguage(lang);
        const newPath = `/${lang}${location.pathname.substring(3) || ''}`;
        navigate(newPath);
        setLanguageOpen(false);
    };

    const navLinks = t('nav') as unknown as { name: string, href: string }[];
    const serviceNames = t('services.serviceNames') as unknown as string[];

    return (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>
            <div className={`fixed top-0 right-0 bottom-0 w-full max-w-sm bg-slate-50 shadow-lg`}>
                <div className="p-4 flex items-center justify-between border-b border-slate-200">
                    <a href={`/${language}`} className="text-2xl font-bold text-slate-800">
                        v-<span className="text-sky-500">grand</span>
                    </a>
                    <button onClick={onClose} className="p-2 rounded-md text-slate-600 hover:bg-slate-200">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                <nav className="p-6 space-y-4">
                    {navLinks.map(link => (
                        <a key={link.name} href={`/${language}`} onClick={onClose} className="block py-2 text-lg font-medium text-slate-700 hover:text-sky-500">
                            {link.name}
                        </a>
                    ))}
                    <div>
                        <button onClick={() => setServicesOpen(!isServicesOpen)} className="w-full flex justify-between items-center py-2 text-lg font-medium text-slate-700 hover:text-sky-500">
                            <span>{t('header.services')}</span>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isServicesOpen && (
                            <div className="mt-2 pl-4 space-y-2 border-l-2 border-slate-200">
                                {serviceNames.map(service => (
                                    <a key={service} href={`/${language}`} onClick={onClose} className="block py-1 text-base text-slate-600 hover:text-sky-500">
                                        {service}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                     <div>
                        <button onClick={() => setLanguageOpen(!isLanguageOpen)} className="w-full flex justify-between items-center py-2 text-lg font-medium text-slate-700 hover:text-sky-500">
                            <div className="flex items-center">
                                <LanguageIcon className="w-6 h-6 mr-2" />
                                <span>{language.toUpperCase()}</span>
                            </div>
                            <ChevronDownIcon className={`w-5 h-5 transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {isLanguageOpen && (
                            <div className="mt-2 pl-4 space-y-2 border-l-2 border-slate-200">
                                {languages.map(lang => (
                                    <button
                                        key={lang}
                                        onClick={() => handleLanguageChange(lang)}
                                        className="w-full text-left block py-1 text-base text-slate-600 hover:text-sky-500"
                                    >
                                        {lang.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="pt-6">
                        <a href={`/${language}`} className="w-full block text-center px-5 py-4 text-lg font-semibold text-white bg-orange-500 rounded-lg shadow-sm hover:bg-orange-600 transition-colors">
                            {t('header.contact')}
                        </a>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default MobileNav;
