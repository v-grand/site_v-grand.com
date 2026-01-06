
import React, { useState, useEffect } from 'react';
import type { Service } from '../../types.ts';
import { ServiceIcons } from '../ui/icons.tsx';
import { useLanguage } from '../../LanguageContext.tsx';

const Services: React.FC = () => {
    const { t, language } = useLanguage();
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = () => {
            setError(t('services.error'));
            const serviceNames = t('services.serviceNames') as unknown as string[];
            setServices(serviceNames.map(name => ({
                title: name,
                description: t('services.mockDescription')
            })));
            setLoading(false);
        };

        fetchServices();
    }, [language, t]);

    const renderSkeleton = (index: number) => (
        <div key={index} style={{ '--stagger-index': index } as React.CSSProperties} className="bg-white p-6 rounded-xl border border-slate-200 animate-pulse">
            <div className="w-12 h-12 bg-slate-200 rounded-lg mb-4"></div>
            <div className="h-5 bg-slate-200 rounded w-3/4 mb-3"></div>
            <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
    );

    const renderServiceCard = (service: Service, index: number) => {
        const Icon = ServiceIcons[service.title] || ServiceIcons['Default'];
        return (
            <div key={service.title} style={{ '--stagger-index': index } as React.CSSProperties} className="card-hover-effect bg-white p-6 rounded-xl border border-slate-200 flex flex-col">
                <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-sky-100 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-sky-500" />
                    </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">{service.title}</h3>
                <p className="text-slate-600 text-base flex-grow">{service.description}</p>
            </div>
        );
    };

    return (
        <section id="services" className="py-20 sm:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-sky-500 tracking-wider uppercase">{t('services.sectionTitle')}</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        {t('services.title')}
                    </p>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        {t('services.subtitle')}
                    </p>
                </div>

                {error && <div className="mt-12 text-center text-orange-800 bg-orange-100 p-4 rounded-lg">{error}</div>}

                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 stagger-in">
                    {loading
                        ? Array.from({ length: 8 }).map((_, i) => renderSkeleton(i))
                        : services.map((service, i) => renderServiceCard(service, i))
                    }
                </div>
            </div>
        </section>
    );
};

export default Services;
