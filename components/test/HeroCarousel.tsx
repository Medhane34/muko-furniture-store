// components/HeroCarousel.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Sample slide data with high-quality images
const slidesData = [
  {
    src: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2059&q=80",
    title: "Explore Our Latest Collection",
    description: "Discover new arrivals with exclusive offers.",
  },
  {
    src: "https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    title: "Summer Sale Now Live",
    description: "Up to 50% off on selected items.",
  },
  {
    src: "https://images.unsplash.com/photo-1489599102910-59206b8ca314?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    title: "Premium Furniture Deals",
    description: "Quality you can trust at unbeatable prices.",
  },
];

export function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progressKey, setProgressKey] = useState(0); // Key to reset animation
  const swiperRef = useRef<SwiperType | null>(null);
  const progressTimeout = useRef<NodeJS.Timeout | null>(null);

  // Reset progress animation when slide changes
  useEffect(() => {
    setProgressKey(prev => prev + 1);
    
    // Clear any existing timeout
    if (progressTimeout.current) {
      clearTimeout(progressTimeout.current);
    }
    
    // Set timeout to move to next slide after 10 seconds
    progressTimeout.current = setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    }, 10000);
    
    return () => {
      if (progressTimeout.current) {
        clearTimeout(progressTimeout.current);
      }
    };
  }, [currentSlide]);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={false} // We're handling autoplay manually
        pagination={{
          el: ".custom-pagination",
          clickable: true,
          renderBullet: (index, className) => {
            return `<div class="${className}"></div>`;
          },
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        loop={true}
        speed={800}
        onInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex);
        }}
        className="w-full h-96 md:h-[500px] rounded-lg overflow-hidden shadow-xl"
      >
        {slidesData.map((slide, index) => (
          <SwiperSlide key={index} className="relative">
            <div className="w-full h-full relative">
              <Image
                src={slide.src}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover"
                onError={(e) => console.error("Image load error:", slide.src)}
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-white text-center p-4">
                <div className="max-w-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{slide.title}</h2>
                  <p className="text-lg md:text-xl">{slide.description}</p>
                  <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors">
                    Watch now
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <div className="swiper-button-prev absolute top-1/2 left-4 transform -translate-y-1/2 text-white z-10 cursor-pointer bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all">
        ❮
      </div>
      <div className="swiper-button-next absolute top-1/2 right-4 transform -translate-y-1/2 text-white z-10 cursor-pointer bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70 transition-all">
        ❯
      </div>

      {/* Custom Pagination with Progress Bars */}
      <div className="custom-pagination-container absolute bottom-6 left-0 right-0 flex justify-center z-10">
        <div className="custom-pagination flex justify-center space-x-2 bg-black bg-opacity-50 rounded-full px-4 py-2">
          {slidesData.map((_, index) => (
            <div 
              key={index} 
              className="relative w-12 h-1 mx-1 rounded-full bg-gray-400 overflow-hidden cursor-pointer"
              onClick={() => {
                if (swiperRef.current) {
                  swiperRef.current.slideTo(index);
                }
              }}
            >
              {/* Grey background for all progress bars */}
              <div className="absolute inset-0 bg-gray-400 rounded-full"></div>
              
              {/* Blue progress bar for active slide */}
              {index === currentSlide && (
                <motion.div
                  key={progressKey} // Reset animation when key changes
                  className="absolute inset-0 bg-blue-500 rounded-full origin-left"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 10, ease: "linear" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .custom-pagination-container {
          display: flex;
          justify-content: center;
          position: absolute;
          bottom: 24px;
          left: 0;
          right: 0;
          z-index: 20;
        }
        
        .custom-pagination {
          display: flex;
          justify-content: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.5);
        }
        
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.3);
          opacity: 1;
          border-radius: 50%;
        }
        
        .swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 0.9);
        }
        
        .swiper-button-prev,
        .swiper-button-next {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }
        
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          opacity: 1;
        }
        
        .swiper-button-prev:after,
        .swiper-button-next:after {
          content: none;
        }
      `}</style>
    </div>
  );
}