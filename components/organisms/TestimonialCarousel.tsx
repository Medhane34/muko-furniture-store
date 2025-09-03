// src/components/organisms/TestimonialCarousel.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The HeroUI framework is an absolute game-changer. It saved us countless hours on development and allowed our team to focus on what matters most: building great products. The component library is intuitive and beautiful.",
    author: "Alex Chen",
    title: "Lead Product Designer",
  },
  {
    quote:
      "I've tried numerous design systems, but HeroUI's integration with Tailwind is the most seamless experience I've had. The documentation is clear, and the flexibility to customize every aspect is unparalleled.",
    author: "Samantha Lee",
    title: "Senior Frontend Engineer",
  },
  {
    quote:
      "As a startup founder, speed is everything. Using HeroUI, we went from concept to a production-ready MVP in record time. The pre-built components are a life-saver.",
    author: "David Rodriguez",
    title: "Founder & CEO",
  },
  {
    quote:
      "The attention to detail in the HeroUI design system is incredible. From the subtle animations to the thoughtful color palette, it’s clear a lot of care went into this. It's my go-to for all new projects.",
    author: "Emily Carter",
    title: "UX Consultant",
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
  }),
};

export const TestimonialCarousel = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  const currentTestimonial = testimonials[page % testimonials.length];

  return (
    <section className="bg-background py-16">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
          What Our Clients Say
        </h2>
        <div className="relative w-full max-w-3xl h-80 md:h-96">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 flex flex-col justify-center items-center text-center bg-card p-8 rounded-lg shadow-xl"
            >
              <p className="text-lg md:text-xl italic mb-4 text-card-foreground">
                "{currentTestimonial.quote}"
              </p>
              <div className="text-foreground">
                <p className="font-semibold">{currentTestimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {currentTestimonial.title}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => paginate(-1)}
            className="p-3 rounded-full bg-accent text-accent-foreground hover:bg-muted transition-colors duration-200"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => paginate(1)}
            className="p-3 rounded-full bg-accent text-accent-foreground hover:bg-muted transition-colors duration-200"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};