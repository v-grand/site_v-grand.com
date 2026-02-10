
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import Hero from './components/sections/Hero.tsx';
import Services from './components/sections/Services.tsx';
import PresentationDownload from './components/sections/PresentationDownload.tsx';
import { useLanguage } from './LanguageContext.tsx';

export default function App() {
    const { language } = useLanguage();

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
            <Header />
            <main className="flex-grow">
                <Routes>
                    <Route path={`/${language}`} element={
                        <>
                            <Hero />
                            <Services />
                            {/* Other sections like "About" or "Blog" would go here */}
                        </>
                    } />
                    <Route path={`/${language}/presentation`} element={<PresentationDownload />} />
                </Routes>
            </main>
            <Footer />
        </div>
    );
}
