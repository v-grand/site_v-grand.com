
import React, { useState, useEffect } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import type { Service } from '../../types.ts';
import { SERVICE_NAMES } from '../../constants.ts';
import { ServiceIcons } from '../ui/icons.tsx';

const API_KEY = process.env.API_KEY;

const Services: React.FC = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchServices = async () => {
            if (!API_KEY) {
                setError("API ключ не найден. Пожалуйста, настройте переменную окружения API_KEY.");
                setLoading(false);
                // Use mock data if API key is not available
                setServices(SERVICE_NAMES.map(name => ({
                    title: name,
                    description: "Описание услуги будет сгенерировано AI, когда API ключ будет доступен. Это пример текста."
                })));
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const ai = new GoogleGenAI({ apiKey: API_KEY, vertexai: true });
                
                const serviceList = SERVICE_NAMES.join(', ');
                const prompt = `Создай список из 8 технологических услуг для веб-сайта. Названия услуг: ${serviceList}. Для каждой услуги предоставь краткое, но емкое описание на русском языке (2-3 предложения), подчеркивающее ценность для клиента. Ответ должен быть в формате JSON.`;

                const response = await ai.models.generateContent({
                    model: 'gemini-2.5-flash',
                    contents: { role: 'user', parts: [{ text: prompt }] },
                    config: {
                        responseMimeType: 'application/json',
                        responseSchema: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    description: { type: Type.STRING },
                                },
                                required: ['title', 'description'],
                            },
                        },
                    },
                });
                
                const jsonText = response.text.trim();
                const parsedServices: Service[] = JSON.parse(jsonText);
                
                // Ensure the order matches SERVICE_NAMES
                const orderedServices = SERVICE_NAMES.map(name => {
                    const found = parsedServices.find(p => p.title.toLowerCase().includes(name.toLowerCase().split(' ')[0]));
                    return found || { title: name, description: "Не удалось сгенерировать описание." };
                });

                setServices(orderedServices);

            } catch (e) {
                console.error("Ошибка при вызове Gemini API:", e);
                setError("Не удалось загрузить описание услуг. Попробуйте обновить страницу.");
                // Fallback to showing titles if API fails
                setServices(SERVICE_NAMES.map(name => ({
                    title: name,
                    description: "Произошла ошибка при загрузке данных от AI."
                })));
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

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
                    <h2 className="text-base font-semibold text-sky-500 tracking-wider uppercase">Наши Услуги</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        Полный спектр цифровых решений
                    </p>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
                        Мы используем передовые технологии для решения ваших самых сложных задач.
                    </p>
                </div>

                {error && <div className="mt-12 text-center text-red-600 bg-red-100 p-4 rounded-lg">{error}</div>}

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
