
import React from 'react';
import { useLanguage } from '../../LanguageContext.tsx';

const Footer: React.FC = () => {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-base text-slate-500">
                        {t('footer.copyright', { year: currentYear })}
                    </p>
                    <div className="flex items-center space-x-6">
                        <a href="#" className="text-sm text-slate-500 hover:text-sky-500 transition-colors">{t('footer.privacy')}</a>
                        <a href="#" className="text-sm text-slate-500 hover:text-sky-500 transition-colors">{t('footer.terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
