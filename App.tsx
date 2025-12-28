
import React from 'react';
import Header from './components/layout/Header.tsx';
import Footer from './components/layout/Footer.tsx';
import Hero from './components/sections/Hero.tsx';
import Services from './components/sections/Services.tsx';

export default function App() {
    return (
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
            <Header />
            <main className="flex-grow">
                <Hero />
                <Services />
                {/* Other sections like "About" or "Blog" would go here */}
            </main>
            <Footer />
        </div>
    );
}
