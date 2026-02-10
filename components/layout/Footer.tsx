
import React from 'react';
import { useLanguage } from '../../LanguageContext.tsx';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    const { t, language } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-50 border-t border-slate-200">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-base text-slate-500">
                        {t('footer.copyright', { year: currentYear })}
                    </p>
                    <div className="flex items-center space-x-6">
                        <Link to={`/${language}/presentation`} className="text-sm text-slate-500 hover:text-sky-500 transition-colors">{t('footer.downloadPresentation')}</Link>
                        <a href={`mailto:${t('footer.email')}`} className="text-sm text-slate-500 hover:text-sky-500 transition-colors">{t('footer.email')}</a>
                        <a href="/" className="text-sm text-slate-500 hover:text-sky-500 transition-colors">{t('footer.privacy')}</a>
                        <a href="/" className="text-sm text-slate-500 hover:text-sky-500 transition-colors">{t('footer.terms')}</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
