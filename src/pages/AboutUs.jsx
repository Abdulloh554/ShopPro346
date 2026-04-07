import React from 'react';
import { Row, Col } from 'antd';
import { 
  RocketOutlined, 
  SafetyCertificateOutlined, 
  CustomerServiceOutlined, 
  GlobalOutlined 
} from '@ant-design/icons';
import { useTranslation } from "react-i18next";

function AboutUs() {
  const { t } = useTranslation();

  const features = [
    {
      title: t('feat_fast', "Tez yetkazib berish"),
      description: t('feat_fast_desc', "O'zbekiston bo'ylab eng tez yetkazib berish xizmati."),
      icon: <RocketOutlined className="text-4xl text-blue-500" />
    },
    {
      title: t('feat_quality', "Sifat kafolati"),
      description: t('feat_quality_desc', "Barcha mahsulotlarimiz kafolatlangan va yuqori sifatli."),
      icon: <SafetyCertificateOutlined className="text-4xl text-indigo-500" />
    },
    {
      title: t('feat_support', "24/7 Qo'llab-quvvatlash"),
      description: t('feat_support_desc', "Bizning mutaxassislarimiz har doim yordam berishga tayyor."),
      icon: <CustomerServiceOutlined className="text-4xl text-purple-500" />
    },
    {
      title: t('feat_choice', "Keng tanlov"),
      description: t('feat_choice_desc', "Dunyoning eng mashhur brendlaridan mahsulotlar."),
      icon: <GlobalOutlined className="text-4xl text-pink-500" />
    }
  ];

  return (
    <div className="font-sans py-12 md:py-20 space-y-20 md:space-y-32 neu-bg min-h-screen">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-black neu-text tracking-tight uppercase mb-8">
          {t('about_us', 'Biz Haqimizda')}
        </h1>
        <p className="text-xl md:text-2xl neu-text font-medium leading-relaxed max-w-3xl mx-auto neu-convex p-8 rounded-3xl">
          {t('about_hero', "Bizning do'konimiz mijozlarga eng yaxshi xizmat va yuqori sifatli mahsulotlarni taqdim etish maqsadida tashkil etilgan. Biz orqali xarid qilish oson, tez va ishonchli.")}
        </p>
      </section>

      {/* Stats Section */}
      <section className="px-6 max-w-6xl mx-auto">
        <div className="neu-flat rounded-4xl py-12 px-8">
          <Row gutter={[48, 48]} justify="center" className="text-center">
            <Col xs={12} md={6}>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-black text-blue-500 mb-2">5</span>
                <span className="text-sm font-bold uppercase tracking-widest neu-text">{t('stat_experience', 'Tajriba (Yil)')}</span>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-black text-indigo-500 mb-2">15k<span className="text-3xl">+</span></span>
                <span className="text-sm font-bold uppercase tracking-widest neu-text">{t('stat_customers', 'Mijozlar')}</span>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-black text-purple-500 mb-2">2.5k<span className="text-3xl">+</span></span>
                <span className="text-sm font-bold uppercase tracking-widest neu-text">{t('stat_products', 'Mahsulotlar')}</span>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <div className="flex flex-col items-center">
                <span className="text-5xl md:text-7xl font-black text-pink-500 mb-2">50<span className="text-3xl">+</span></span>
                <span className="text-sm font-bold uppercase tracking-widest neu-text">{t('stat_partners', 'Hamkorlar')}</span>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black neu-text uppercase tracking-tight mb-16 text-center">
          {t('why_choose_us', 'Nega aynan bizni tanlaysiz?')}
        </h2>
        <Row gutter={[32, 32]}>
          {features.map((feature, index) => (
             <Col xs={24} sm={12} lg={6} key={index}>
              <div className="flex flex-col items-center text-center p-8 neu-flat rounded-4xl h-full transition-transform duration-300">
                <div className="mb-6 flex justify-center items-center w-20 h-20 neu-pressed rounded-full">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold uppercase tracking-wide neu-text mb-4">
                  {feature.title}
                </h3>
                <p className="neu-text opacity-80 font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
             </Col>
          ))}
        </Row>
      </section>
      
      {/* Mission */}
      <section className="px-6 max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-sm font-bold uppercase tracking-widest neu-text opacity-70 mb-6">
          {t('mission', 'Bizning Maqsadimiz')}
        </h2>
        <div className="neu-flat p-4 rounded-[40px]">
          <div className="neu-pressed p-8 md:p-12 rounded-4xl">
            <p className="text-2xl md:text-3xl font-bold text-blue-500 dark:text-blue-400 leading-tight italic">
              "{t('mission_desc', "Sizning uyingizga quvonch va qulaylik olib kirish. Har bir xaridda sifat, ishonch va samimiylikni his etishingizni ta'minlash.")}"
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;