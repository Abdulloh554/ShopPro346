import React from "react";
import { Carousel } from "antd";
import { useTranslation } from "react-i18next";
import { useCarousels } from "../hooks/useQuaryCarousel";

function Carusel() {
    const { t } = useTranslation();
    const { data: slides, isLoading, isError } = useCarousels();
    console.log("Carousel data:", slides);

    if (isLoading) return <p className="text-center mt-10 neu-text">{t("loading", "Yuklanmoqda...")}</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">{t("error", "Xatolik yuz berdi!")}</p>;

    return (
        <div className="font-sans py-8 neu-bg min-h-screen">
            <div className="neu-flat rounded-[32px] overflow-hidden relative max-w-[1440px] mx-auto w-full p-2 md:p-4">
                <div className="rounded-[24px] overflow-hidden neu-pressed">
                    <Carousel arrows autoplay effect="fade" dotPosition="bottom">
                        {slides && Array.isArray(slides) && slides.map((item) => (
                            <div
                                key={item.id}
                                className="relative h-[400px] md:h-[500px] outline-none"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center mix-blend-normal rounded-[24px]"
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