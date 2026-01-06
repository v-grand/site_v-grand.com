
import React from 'react';

const Hero: React.FC = () => {
    return (
        <section className="relative py-24 md:py-32 lg:py-40 overflow-hidden">
            {/* Gradient Mesh Background */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-sky-200/50 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-200/50 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
            </div>
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-4000 { animation-delay: -4s; }
            `}</style>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900">
                    Комплексный инжиниринг и проектирование
                </h1>
                <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-slate-600">
                    Мы предоставляем полный спектр услуг: от разработки концепции до авторского надзора и сдачи объекта в эксплуатацию.
                </p>
                <div className="mt-10 flex justify-center">
                    <a href="#" className="px-8 py-4 text-lg font-semibold text-white bg-orange-500 rounded-lg shadow-lg hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 hover:shadow-orange-300/50">
                        Начать проект
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
