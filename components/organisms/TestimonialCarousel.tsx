"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { fadeInUp } from "@/lib/motion";
import Image from "next/image";
import MainHeadline from "../atoms/MainHeadline";
import BadgeText from "../atoms/BadgeText";
import { UserIcon } from "@heroicons/react/24/outline";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  imageUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "I was hesitant about buying imported furniture online, but Muko made the process seamless. The quality of our new living room set exceeded expectations - it's both beautiful and incredibly durable. The delivery team was professional and careful with everything.",
    author: "Alemnesh Taddesse",
    title: "Homeowner, Bole",
    imageUrl: "/avatars/avatar-1.png",
  },
  {
    quote:
      "As an interior designer, I appreciate Muko's curated collections. They offer pieces I can't find anywhere else in Addis. Their customer service team helped me source the perfect statement pieces for my client's modern apartment. The quality is consistently excellent.",
    author: "Sara Mengistu",
    title: "Interior Designer",
    imageUrl: "/avatars/avatar-1.png",
  },
  {
    quote:
      "We furnished our entire office with Muko furniture and couldn't be happier. The ergonomic chairs and modern desks have held up perfectly with daily use. The warranty gave us peace of mind, and the bulk order discount made it affordable.",
    author: "Michael Getachew",
    title: "Office Manager, Tech Company",
    imageUrl: "/avatars/avatar-1.png",
  },
  {
    quote:
      "The dining table we purchased from Muko has become the heart of our home. It's stunningly beautiful and has survived countless family gatherings with young children. The scratch-resistant surface really works! Muko's quality is worth every birr.",
    author: "Yordanos Abebe",
    title: "Mother of Three, CMC",
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
            <BadgeText
              gradient="custom"
              customGradient="linear-gradient(90deg, #8B5CF6 0%, #EC4899 100%)"
              rounded="lg"icon={<UserIcon className="w-4 h-4" />} 
              >
               Customer Stories
              </BadgeText>
          
          </motion.div>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <MainHeadline gradientStyle="partial" size="lg">
              Loved by Ethiopian Homes
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