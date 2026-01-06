
import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../LanguageContext.tsx';
import { MenuIcon, ChevronDownIcon, LanguageIcon } from '../ui/icons.tsx';
import MobileNav from './MobileNav.tsx';
import logo from '../ui/logo.png';

const Header: React.FC = () => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isServicesOpen, setServicesOpen] = useState(false);
    const servicesMenuRef = useRef<HTMLDivElement>(null);
    const { language, setLanguage, t } = useLanguage();

    const toggleLanguage = () => setLanguage(language === 'ru' ? 'en' : 'ru');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (servicesMenuRef.current && !servicesMenuRef.current.contains(event.target as Node)) {
                setServicesOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const navLinks = t('nav') as unknown as { name: string, href: string }[];
    const serviceNames = t('services.serviceNames') as unknown as string[];

    return (
        <>
            <header className="sticky top-0 z-30 w-full bg-slate-50/80 backdrop-blur-lg border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <a href="https://ny2025.v-grand.com/">
                                <img className="h-8 w-auto" src={logo} alt="v-grand" />
                            </a>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center space-x-8">
                            {navLinks.map(link => (
                                <a key={link.name} href="https://ny2025.v-grand.com/" className="text-base font-medium text-slate-600 hover:text-sky-500 transition-colors">
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
                                    <span>{t('header.services')}</span>
                                    <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {isServicesOpen && (
                                    <div className="absolute -left-8 mt-4 w-64 rounded-lg shadow-lg bg-white border border-slate-200 ring-1 ring-black ring-opacity-5">
                                        <div className="py-2" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            {serviceNames.map(service => (
                                                <a key={service} href="https://ny2025.v-grand.com/" onClick={() => setServicesOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-sky-500" role="menuitem">
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
                                <span className="ml-2 font-semibold text-sm">{language.toUpperCase()}</span>
                            </button>
                            <a href="https://ny2025.v-grand.com/" className="px-5 py-3 text-base font-semibold text-white bg-orange-500 rounded-lg shadow-sm hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
                                {t('header.contact')}
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
