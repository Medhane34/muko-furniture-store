// components/HeroCarousel.tsx
"use client"; // Required for Swiper's client-side rendering

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

// Sample slide data (replace with dynamic Sanity data later)
const slidesData = [
  {
    src: "/features/homepage/beds-hero-2.png",
    title: "Explore Our Latest Collection",
    description: "Discover new arrivals with exclusive offers.",
  },
  {
    src: "/features/homepage/beds-hero-2.png",
    title: "Summer Sale Now Live",
    description: "Up to 50% off on selected items.",
  },
  {
    src: "/features/homepage/beds-hero-2.png",
    title: "Premium Furniture Deals",
    description: "Quality you can trust at unbeatable prices.",
  },
];

export function HeroCarousel() {
  const [progress, setProgress] = useState(0);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;
      swiper.on("progress", (swiper: any, progress: number) => {
        const slideProgress = 1 - Math.abs(progress); // Normalize progress
        setProgress(slideProgress * 100); // Convert to percentage
      });

      swiper.on("slideChange", () => {
        setProgress(0); // Reset progress on slide change
      });
    }
  }, []);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 1000, disableOnInteraction: false }} // 1-second delay
        pagination={{
          el: ".swiper-pagination",
          type: "custom",
          renderCustom: (swiper: any, current: number, total: number) => {
            return `<div class="swiper-progress-bar">
              <div class="progress-fill" style="width: ${progress}%"></div>
            </div>`;
          },
        }} 
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        speed={300} // Smooth 300ms transition
        className="w-full h-96"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <Image
              src={slide.src}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-center p-4">
              <div>
                <h2 className="text-2xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg">{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="swiper-button-prev absolute top-1/2 left-4 transform -translate-y-1/2 text-white z-10 cursor-pointer">
        ❮
      </div>
      <div className="swiper-button-next absolute top-1/2 right-4 transform -translate-y-1/2 text-white z-10 cursor-pointer">
        ❯
      </div>

      {/* Custom Pagination with Progress Bar */}
      <div className="swiper-pagination absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"></div>

      <style jsx>{`
        .swiper-progress-bar {
          width: 60px;
          height: 4px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 2px;
        }
        .progress-fill {
          height: 100%;
          background: #00ff00; /* Green progress bar */
          border-radius: 2px;
          transition: width 1s linear; /* Smooth fill over 1 second */
        }
        .swiper-button-prev, .swiper-button-next {
          font-size: 24px;
        }
      `}</style>
    </div>
  );
}