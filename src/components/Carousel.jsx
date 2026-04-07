import React from "react";
import { Carousel as AntCarousel } from "antd";
import { useTranslation } from "react-i18next";
import { useCarousels } from "../hooks/useQueryCarousel";

function Carousel() {
    const { t } = useTranslation();
    const { data: slides, isLoading, isError } = useCarousels();
    console.log("Carousel data:", slides);

    if (isLoading) return <p className="text-center mt-10 neu-text">{t("loading", "Yuklanmoqda...")}</p>;
    if (isError) return <p className="text-center mt-10 text-red-500">{t("error", "Xatolik yuz berdi!")}</p>;

    return (
        <div className="font-sans py-8 neu-bg min-h-screen">
            <div className="neu-flat rounded-[32px] overflow-hidden relative max-w-[1440px] mx-auto w-full p-3 md:p-6">
                <div className="rounded-[24px] overflow-hidden neu-pressed border-2 border-purple-300">
                    <AntCarousel arrows autoplay effect="fade" dotPosition="bottom">
                        {slides && Array.isArray(slides) && slides.map((item) => (
                            <div
                                key={item.id}
                                className="relative h-[450px] md:h-[560px] outline-none"
                            >
                                <div
                                    className="absolute inset-0 bg-cover bg-center mix-blend-normal rounded-[24px]"
                                    style={{ backgroundImage: `url(${item.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/30 via-teal-500/20 to-cyan-200/15 rounded-[24px]" />
                                <div className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-20 text-white">
                                  <h2 className="text-3xl md:text-5xl font-black uppercase drop-shadow-xl tracking-tight">
                                    {t('uzum_special', 'Uzum Market: har kuni yangi chegirmalar')}
                                  </h2>
                                  <p className="mt-3 text-sm md:text-lg font-semibold max-w-xl">
                                    {t('uzum_slogan', 'Keng assortiment, tez yetkazib berish, ajoyib narxlar')}
                                  </p>
                                  <button className="mt-5 neu-convex px-6 py-3 rounded-full text-sm font-black shadow-lg hover:scale-105 transition-transform">
                                    {t('shop_now', 'Hozir xarid qiling')}
                                  </button>
                                </div>
                            </div>
                        ))}
                    </AntCarousel>
                </div>
            </div>
        </div>
    );
}

export default Carousel;