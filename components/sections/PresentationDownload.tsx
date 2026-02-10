
import React from 'react';
import { useLanguage } from '../../LanguageContext.tsx';

const PresentationDownload: React.FC = () => {
    const { t } = useLanguage();

    const handleDownload = () => {
        // Assuming the file is named presentation.pdf and located in public/presentations/
        const link = document.createElement('a');
        link.href = '/presentations/presentation.pdf';
        link.download = 'v-grand-presentation.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 text-center">
                <h1 className="text-2xl font-bold text-slate-800 mb-4">
                    {t('presentation.title')}
                </h1>
                <p className="text-slate-600 mb-8">
                    {t('presentation.description')}
                </p>
                <button
                    onClick={handleDownload}
                    className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded transition duration-300 flex items-center justify-center"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {t('presentation.downloadButton')}
                </button>
            </div>
        </div>
    );
};

export default PresentationDownload;
