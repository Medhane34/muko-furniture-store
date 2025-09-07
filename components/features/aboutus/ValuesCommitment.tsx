'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Button } from "@/components/atoms/Button";
import { 
  Heart, 
  Shield, 
  Users, 
  TreePine, 
  Star,
  Target,
  Clock,
  Award
} from "lucide-react";
import AccentHeading from "@/components/atoms/AccentHeading";
import MainHeadline from "@/components/atoms/MainHeadline";

interface ValueItem {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  features: string[];
  color: 'primary' | 'green' | 'blue' | 'amber';
}

interface ValuesCommitmentProps {
  headline?: string;
  subtitle?: string;
  values?: ValueItem[];
  commitmentStatement?: string;
  className?: string;
}

export function ValuesCommitment({
  headline = "Our Commitment to You",
  subtitle = "The principles that guide every piece we select and every customer we serve",
  values = [
    {
      icon: Award,
      title: "Curated Excellence",
      description: "Rigorous selection of furniture that meets our high standards for design and durability",
      features: [
        "Partnerships with quality international brands",
        "Focus on timeless design and functionality",
        "Materials tested for longevity and safety",
        "Style that transcends trends"
      ],
      color: 'primary'
    },
    {
      icon: Shield,
      title: "Trust & Assurance",
      description: "Standing behind every product with reliable service and support",
      features: [
        "Comprehensive warranty on all products",
        "Transparent pricing with no hidden costs",
        "Dedicated customer service team",
        "Hassle-free return policy"
      ],
      color: 'blue'
    },
    {
      icon: Users,
      title: "Ethiopian Community", 
      description: "Supporting local employment and making quality furniture accessible",
      features: [
        "Creating local jobs in retail and logistics",
        "Investing in Ethiopian customer service talent",
        "Making global design accessible in Addis Ababa",
        "Supporting local interior design partnerships"
      ],
      color: 'green'
    },
    {
      icon: Heart,
      title: "Customer Happiness",
      description: "Building relationships that transform how you live in your home",
      features: [
        "Professional delivery and setup service",
        "Personalized design consultations",
        "After-sales support and maintenance guidance",
        "Continuous collection based on your feedback"
      ],
      color: 'amber'
    }
  ],
  commitmentStatement = "We don't just import furniture; we deliver trusted quality, exceptional service, and beautiful living spaces that Ethiopian families enjoy for years to come.",
  className = ""
}: ValuesCommitmentProps) {
  
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    green: 'bg-green-100 text-green-700',
    blue: 'bg-blue-100 text-blue-700', 
    amber: 'bg-amber-100 text-amber-700'
  };

  return (
    <section className={`py-20 md:py-28  dark:bg-background-dark ${className}`}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <AccentHeading size="sm" gradient="linear-gradient(90deg, #4361EE 0%, #3A0CA3 100%)">
          {subtitle}
        </AccentHeading>
        
          <MainHeadline >
            {headline}
          </MainHeadline>
          
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {values.map((value, index) => {
            const IconComponent = value.icon;
            const colorClass = colorClasses[value.color];
            
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* Icon Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-full ${colorClass}`}>
                    <IconComponent size={24} />
                  </div>
                  <h3 className="font-sans text-subheading font-bold text-gray-900">
                    {value.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="font-sans text-body text-gray-600 mb-6">
                  {value.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3">
                  {value.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        value.color === 'primary' ? 'bg-primary' :
                        value.color === 'green' ? 'bg-green-500' :
                        value.color === 'blue' ? 'bg-blue-500' : 'bg-amber-500'
                      }`} />
                      <span className="font-sans text-body text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Commitment Statement */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-primary">
            <Quote className="mx-auto mb-6 text-primary" size={32} />
            <p className="font-sans text-body md:text-xl text-gray-700 italic max-w-3xl mx-auto leading-relaxed">
              {commitmentStatement}
            </p>
          </div>
        </motion.div>

        {/* Certifications & Partnerships */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h4 className="font-sans font-semibold text-text-black dark:text-text-white mb-8">
            Trusted & Recognized
          </h4>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {/* International Quality Standards */}
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="text-primary" size={24} />
              </div>
              <p className="font-sans text-sm font-medium text-text-black dark:text-text-white ">International</p>
              <p className="font-sans text-xs text-gray-600">Quality Standards</p>
            </div>

            {/* Customer Service Excellence */}
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="text-blue-600" size={24} />
              </div>
              <p className="font-sans text-sm font-medium text-text-black dark:text-text-white ">Service</p>
              <p className="font-sans text-xs text-gray-600">Excellence</p>
            </div>

            {/* Ethiopian Business */}
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="text-green-600" size={24} />
              </div>
              <p className="font-sans text-sm font-medium text-text-black dark:text-text-white ">Proudly</p>
              <p className="font-sans text-xs text-gray-600">Ethiopian</p>
            </div>

            {/* Reliable Partner */}
            <div className="text-center p-4">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="text-amber-600" size={24} />
              </div>
              <p className="font-sans text-sm font-medium text-text-black dark:text-text-white ">Reliable</p>
              <p className="font-sans text-xs text-gray-600">Partner</p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button
            onClick={() => window.location.href = "/our-values"}
          >
            Discover Our Values
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

// Quote icon component
function Quote({ className, size }: { className?: string; size?: number }) {
  return (
    <svg 
      className={className}
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="currentColor"
    >
      <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
    </svg>
  );
}