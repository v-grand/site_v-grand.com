
import React from 'react';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-base text-slate-500">
                        &copy; {currentYear} u-cloud24.com. Все права защищены.
                    </p>
                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-sm text-slate-500 hover:text-sky-500 transition-colors">Политика конфиденциальности</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-sky-500 transition-colors">Условия использования</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
