import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSwipeable } from 'react-swipeable'; // Optional: For mobile swipe navigation

const defaultTestimonials = [
  {
    quote: "This platform launched my ideas into orbit—seamless and innovative!",
    author: "Jane Doe",
    role: "CTO at StarTech Innovations",
    rating: 5,
    avatarUrl: "https://via.placeholder.com/48?text=JD", // Replace with real URLs
    extendedQuote: "The tools provided exceeded expectations, with zero downtime.",
  },
  {
    quote: "A cosmic leap in productivity; highly recommend!",
    author: "Alex Rivera",
    role: "Freelance Developer",
    rating: 4.5,
    avatarUrl: "https://via.placeholder.com/48?text=AR",
    extendedQuote: "Integrated perfectly with my workflow, saving hours weekly.",
  },
  {
    quote: "Transformed our team's collaboration like a black hole sucking in inefficiencies.",
    author: "Sam Lee",
    role: "Project Manager at Nebula Corp",
    rating: 5,
    avatarUrl: "https://via.placeholder.com/48?text=SL",
    extendedQuote: "User-friendly interface with powerful features under the hood.",
  },
  {
    quote: "Out-of-this-world support and features—truly stellar!",
    author: "Riley Kim",
    role: "Designer at Galaxy Designs",
    rating: 5,
    avatarUrl: "https://via.placeholder.com/48?text=RK",
    extendedQuote: "Customizable and intuitive, perfect for creative projects.",
  },
];

function TestimonialGalaxy({
  testimonials = defaultTestimonials,
  theme = 'space',
  autoPlay = true,
  visibleCount = 4,
  onTestimonialClick = (index: {
      quote: string; author: string; role: string; rating: number; avatarUrl: string; // Replace with real URLs
      extendedQuote: string;
  }) => {},
}) {
  const [flipped, setFlipped] = useState<Record<number, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);
  const [rotation, setRotation] = useState(0); // For manual drag rotation

  // Auto-play rotation
  useEffect(() => {
    if (autoPlay && !isPaused) {
      const interval = setInterval(() => {
        setRotation((prev) => prev + 1); // Incremental rotation for smooth orbit
      }, 50); // 50ms for fluid animation (~20deg/s)
      return () => clearInterval(interval);
    }
  }, [autoPlay, isPaused]);

  // Handle flip
  const toggleFlip = (index: number) => {
    setFlipped((prev) => ({ ...prev, [index]: !prev[index] }));
    onTestimonialClick(testimonials[index]);
  };

  // Swipe handlers for mobile
  const handlers = useSwipeable({
    onSwipedLeft: () => setRotation((prev) => prev + 45),
    onSwipedRight: () => setRotation((prev) => prev - 45),
    trackMouse: true, // Enables drag on desktop too
  });

  // Theme-based styles
  const sectionBg = theme === 'space' ? 'bg-background-dark' : 'bg-background-light';
  const textColor = theme === 'space' ? 'text-text-dark' : 'text-text-light';
  const cardBg = theme === 'space' ? 'bg-white/10 backdrop-blur-md' : 'bg-white/80 shadow-md';

  // Limit to visibleCount (paginate if more, but for orbit, show all and adjust radius)
  const displayedTestimonials = testimonials.slice(0, visibleCount);

  return (
    <section className={`relative py-16 ${sectionBg} overflow-hidden`}>
      {/* Starry background for space theme */}
      {theme === 'space' && (
        <div className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 opacity-80">
          {/* Simple CSS stars */}
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(white, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }} />
        </div>
      )}

      <div className="relative z-10 container mx-auto flex flex-col items-center">
        {/* Central star */}
        <motion.div
          className="w-40 h-40 bg-primary rounded-full flex items-center justify-center mb-12 shadow-lg"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <p className={`text-lg font-bold ${textColor} text-center px-4`}>Hear from Our Explorers</p>
        </motion.div>

        {/* Orbital container */}
        <motion.div
          {...handlers}
          className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] hidden md:block" // Hide orbit on mobile, show stack
          style={{ transform: `rotate(${rotation}deg)` }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          animate="fadeIn" // Using your config's fade-in
        >
          {displayedTestimonials.map((test, index) => {
            const angle = (360 / displayedTestimonials.length) * index;
            const rad = (angle + rotation) * (Math.PI / 180); // Include rotation
            const radius = 150; // Adjust for md: 250
            const x = Math.cos(rad) * radius;
            const y = Math.sin(rad) * radius;

            return (
              <motion.div
                key={index}
                className={`absolute w-48 md:w-64 p-4 rounded-lg ${cardBg} flip-card`}
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
                whileHover={{ scale: 1.1, zIndex: 10 }}
                onClick={() => toggleFlip(index)}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className={`inner ${flipped[index] ? 'flipped' : ''}`}>
                  {/* Front */}
                  <div className="front flex flex-col items-center">
                    <img src={test.avatarUrl} alt={test.author} className="w-12 h-12 rounded-full mb-2" />
                    <p className={`text-sm md:text-base italic ${textColor} mb-2`}>{test.quote}</p>
                    <p className={`text-xs md:text-sm font-bold ${textColor}`}>{test.author}, {test.role}</p>
                    <div className="flex">{Array.from({ length: Math.floor(test.rating) }).map((_, i) => <span key={i}>⭐</span>)}</div>
                  </div>
                  {/* Back */}
                  <div className="back absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gradient-badge-primary text-white p-4 rounded-lg">
                    <p className="text-sm">{test.extendedQuote}</p>
                  </div>
                </div>
                {/* Simple particle trail */}
                <div className="absolute -bottom-1 left-1/2 w-1 h-1 bg-white rounded-full animate-badge-bounce" /> {/* Using your bounce anim */}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile stack fallback */}
        <div className="md:hidden flex flex-col space-y-4 w-full px-4">
          {displayedTestimonials.map((test, index) => (
            <motion.div
              key={index}
              className={`p-4 rounded-lg ${cardBg} cursor-pointer`}
              onClick={() => toggleFlip(index)}
              initial="slideUp" // Using your config's slide-up
            >
              <div className={`inner ${flipped[index] ? 'flipped' : ''}`}>
                <div className="front flex flex-col items-center">
                  <img src={test.avatarUrl} alt={test.author} className="w-12 h-12 rounded-full mb-2" />
                  <p className={`text-sm italic ${textColor} mb-2`}>{test.quote}</p>
                  <p className={`text-xs font-bold ${textColor}`}>{test.author}, {test.role}</p>
                  <div className="flex">{Array.from({ length: Math.floor(test.rating) }).map((_, i) => <span key={i}>⭐</span>)}</div>
                </div>
                <div className="back absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gradient-badge-primary text-white p-4 rounded-lg">
                  <p className="text-sm">{test.extendedQuote}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialGalaxy;