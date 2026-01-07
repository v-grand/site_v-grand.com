
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage, languages } from './LanguageContext.tsx';

const LanguageRouter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { language, setLanguage } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const pathLanguage = location.pathname.split('/')[1] as typeof language;
        if (languages.includes(pathLanguage) && pathLanguage !== language) {
            setLanguage(pathLanguage);
        } else if (!languages.includes(pathLanguage)) {
            navigate(`/${language}${location.pathname}`, { replace: true });
        }
    }, [location, language, setLanguage, navigate]);

    return <>{children}</>;
};

export default LanguageRouter;
