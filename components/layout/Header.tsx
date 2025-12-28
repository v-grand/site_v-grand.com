
import React, { useState, useRef, useEffect } from 'react';
import { NAV_LINKS, SERVICE_NAMES } from '../../constants.ts';
import { MenuIcon, CloseIcon, ChevronDownIcon, LanguageIcon } from '../ui/icons.tsx';
import MobileNav from './MobileNav.tsx';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isServicesOpen, setServicesOpen] = useState(false);
    const [language, setLanguage] = useState('RU');
    const servicesMenuRef = useRef<HTMLDivElement>(null);

    const toggleLanguage = () => setLanguage(lang => lang === 'RU' ? 'EN' : 'RU');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
                setServicesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <header className="sticky top-0 z-30 w-full bg-slate-50/80 backdrop-blur-lg border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a href="#" className="text-2xl font-bold text-slate-800">
                                u-cloud<span className="text-sky-500">24</span>
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {NAV_LINKS.map(link => (
                                <a key={link.name} href={link.href} className="text-base font-medium text-slate-600 hover:text-sky-500 transition-colors">
                                    {link.name}
                                </a>
                            ))}
                            <div className="relative" ref={servicesMenuRef}>
                                <button
                                    onClick={() => setServicesOpen(!isServicesOpen)}
                                    className="flex items-center text-base font-medium text-slate-600 hover:text-sky-500 transition-colors"
                                    aria-haspopup="true"
                                    aria-expanded={isServicesOpen}
                                >
                                    <span>Услуги</span>
                                    <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isServicesOpen && (
                                    <div className="absolute -left-8 mt-4 w-64 rounded-lg shadow-lg bg-white border border-slate-200 ring-1 ring-black ring-opacity-5">
                                        <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            {SERVICE_NAMES.map(service => (
                                                <a key={service} href="#services" onClick={() => setServicesOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-sky-500" role="menuitem">
                                                    {service}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </nav>

                        {/* Right side actions */}
                        <div className="hidden md:flex items-center space-x-6">
                            <button onClick={toggleLanguage} className="flex items-center p-2 rounded-md text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors">
                                <LanguageIcon className="w-6 h-6" />
                                <span className="ml-2 font-semibold text-sm">{language}</span>
                            </button>
                            <a href="#" className="px-5 py-3 text-base font-semibold text-white bg-orange-500 rounded-lg shadow-sm hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                                Запустить регистрацию
                            </a>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-slate-800 hover:bg-slate-200 focus:outline-none"
                                aria-label="Open main menu"
                            >
                                <MenuIcon className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>
            <MobileNav isOpen={isMobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
        </>
    );
};

export default Header;
