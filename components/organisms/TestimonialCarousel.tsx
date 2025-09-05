"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { fadeInUp } from "@/lib/motion";
import Image from "next/image";
import MainHeadline from "../atoms/MainHeadline";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  imageUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The HeroUI framework is an absolute game-changer. It saved us countless hours on development and allowed our team to focus on what matters most: building great products. The component library is intuitive and beautiful.",
    author: "Alex Chen",
    title: "Lead Product Designer",
    imageUrl: "/avatars/avatar-1.png",
  },
  {
    quote:
      "I've tried numerous design systems, but HeroUI's integration with Tailwind is the most seamless experience I've had. The documentation is clear, and the flexibility to customize every aspect is unparalleled.",
    author: "Samantha Lee",
    title: "Senior Frontend Engineer",
    imageUrl: "/avatars/avatar-1.png",
  },
  {
    quote:
      "As a startup founder, speed is everything. Using HeroUI, we went from concept to a production-ready MVP in record time. The pre-built components are a life-saver.",
    author: "David Rodriguez",
    title: "Founder & CEO",
    imageUrl: "/avatars/avatar-1.png",
  },
  {
    quote:
      "The attention to detail in the HeroUI design system is incredible. From the subtle animations to the thoughtful color palette, it’s clear a lot of care went into this. It's my go-to for all new projects.",
    author: "Emily Carter",
    title: "UX Consultant",
    imageUrl: "/avatars/avatar-1.png",
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
    <section 
      className="py-16 md:py-24  dark:bg-background-dark " 
      role="region"
      aria-label="Testimonial carousel"
    >
      <div className="container mx-auto px-4 flex flex-col items-center overflow-hidden">
        <div className="text-center mb-12">
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <Badge color="primary" className="mb-4">
              Testimonials
            </Badge>
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <MainHeadline gradientStyle="partial" size="lg">
              What Our Clients Say
            </MainHeadline>
          </motion.div>
        </div>
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
              className="absolute inset-0 flex flex-col justify-center items-center text-center bg-background-light dark:bg-background-dark p-8 rounded-lg shadow-xl dark:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.3),_0_10px_10px_-5px_rgba(0,0,0,0.2)]"
            >
              <p className="text-lg md:text-xl italic mb-4 text-text-light/80 dark:text-text-dark/80">
                "{currentTestimonial.quote}"
              </p>
              <div className="text-text-light dark:text-text-dark">
                <p className="font-semibold">{currentTestimonial.author}</p>
                <p className="text-sm text-text-light/80 dark:text-text-dark/80">
                  {currentTestimonial.title}
                </p>
              </div>
              {currentTestimonial.imageUrl && (
                <div className="mt-4">
                  <Image
                    src={currentTestimonial.imageUrl}
                    alt={currentTestimonial.author}
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <Button
            variant="outline"
            color="primary"
            size="sm"
            onClick={() => paginate(-1)}
            aria-label="Previous Testimonial"
            className="p-2 rounded-full hover:scale-105 transition-transform"
          >
            <ChevronLeft size={20} />
          </Button>
          <Button
            variant="outline"
            color="primary"
            size="sm"
            onClick={() => paginate(1)}
            aria-label="Next Testimonial"
            className="p-2 rounded-full hover:scale-105 transition-transform"
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </section>
  );
};