import React from 'react';
import { Carousel } from 'antd';

function Home() {
  const carouselItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1491933382434-500287f9b54b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    }
  ];

  return (
    <div className="font-sans py-8 neu-bg min-h-screen">
      {/* Hero Carousel in Neumorphic Container */}
      <div className="neu-flat rounded-[32px] overflow-hidden relative max-w-[1440px] mx-auto w-full p-2 md:p-4">
        <div className="rounded-[24px] overflow-hidden neu-pressed">
          <Carousel arrows autoplay effect="fade" dotPosition="bottom">
            {carouselItems.map(item => (
              <div key={item.id} className="relative h-[500px] md:h-[650px] outline-none">
                <div 
                  className="absolute inset-0 bg-cover bg-center mix-blend-multiply opacity-90 dark:opacity-80"
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

export default Home;