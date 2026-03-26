import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "antd";
import { useTranslation } from "react-i18next";

function Carusel() {
    const { t } = useTranslation();
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSlides = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/carusel"
            );
            setSlides(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Xatolik:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    if (loading) return <p className="text-center mt-10 neu-text">{t("loading")}</p>;

    return (
        <div className="font-sans py-8 neu-bg min-h-screen">
            <div className="neu-flat rounded-[32px] overflow-hidden relative max-w-[1440px] mx-auto w-full p-2 md:p-4">
                <div className="rounded-[24px] overflow-hidden neu-pressed">
                    <Carousel arrows autoplay effect="fade" dotPosition="bottom">
                        {slides.map((item) => (
                            <div
                                key={item.id}
                                className="relative h-[500px] md:h-[650px] outline-none"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center mix-blend-normal dark:mix-blend-overlay opacity-95 dark:opacity-70"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Carusel;