'use client';

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { Instagram, Mail, MapPin, Award, Clock, Users } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  expertise: string[];
  years: number;
  image: string;
  story?: string;
  favoriteTool?: string;
  projects?: number;
}

interface TeamShowcaseProps {
  headline?: string;
  subtitle?: string;
  teamMembers?: TeamMember[];
  studioStats?: {
    totalTeam: number;
    totalExperience: number;
    projectsCompleted: number;
  };
  className?: string;
}

export function TeamShowcase({
  headline = "Meet Our Artisans",
  subtitle = "The skilled hands and creative minds behind every MUKO piece",
  teamMembers = [
    {
      id: "1",
      name: "Alemayehu Teshome",
      role: "Master Woodworker",
      expertise: ["Traditional Joinery", "Wood Carving", "Finish Work"],
      years: 25,
      image: "/team/alemayehu.jpg",
      story: "Third-generation craftsman from Gonder",
      favoriteTool: "Hand chisels",
      projects: 1200
    },
    {
      id: "2",
      name: "Selamawit Bekele", 
      role: "Upholstery Specialist",
      expertise: ["Fabric Cutting", "Hand Stitching", "Pattern Making"],
      years: 12,
      image: "/team/selamawit.jpg",
      story: "Started as apprentice, now leads upholstery team",
      favoriteTool: "Traditional needle",
      projects: 850
    },
    {
      id: "3",
      name: "Teklu Gebremichael",
      role: "Finishing Expert",
      expertise: ["Oil Finishes", "Staining", "Quality Control"],
      years: 18,
      image: "/team/teklu.jpg",
      story: "Perfected his craft in Addis Ababa workshops",
      favoriteTool: "Natural bristle brushes",
      projects: 1500
    }
  ],
  studioStats = {
    totalTeam: 15,
    totalExperience: 175,
    projectsCompleted: 5000
  },
  className = ""
}: TeamShowcaseProps) {
  const [selectedMember, setSelectedMember] = useState(0);

  return (
    <section className={`py-20 md:py-28 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-sans text-heading font-bold text-gray-900 mb-4">
            {headline}
          </h2>
          <p className="font-sans text-body text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* Studio Stats */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <Users className="mx-auto mb-4 text-primary" size={32} />
            <div className="text-3xl font-bold text-gray-900 mb-2">{studioStats.totalTeam}+</div>
            <p className="font-sans text-sm text-gray-600">Skilled Artisans</p>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <Clock className="mx-auto mb-4 text-primary" size={32} />
            <div className="text-3xl font-bold text-gray-900 mb-2">{studioStats.totalExperience}</div>
            <p className="font-sans text-sm text-gray-600">Years Combined Experience</p>
          </div>
          
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <Award className="mx-auto mb-4 text-primary" size={32} />
            <div className="text-3xl font-bold text-gray-900 mb-2">{studioStats.projectsCompleted}+</div>
            <p className="font-sans text-sm text-gray-600">Pieces Created</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Team Member Gallery */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className={`cursor-pointer group ${
                  selectedMember === index ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedMember(index)}
              >
                <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
                  
                  {/* Years badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="font-sans text-sm font-semibold text-gray-900">
                      {member.years} years
                    </span>
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="font-sans font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="font-sans text-sm text-gray-600">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Selected Member Details */}
          <motion.div
            key={selectedMember}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="sticky top-24"
          >
            <div className="bg-gray-50 rounded-2xl p-8 shadow-sm">
              <div className="text-center mb-6">
                <h3 className="font-sans text-subheading font-bold text-gray-900 mb-2">
                  {teamMembers[selectedMember].name}
                </h3>
                <p className="font-sans text-body text-primary font-medium mb-4">
                  {teamMembers[selectedMember].role}
                </p>
                
                {teamMembers[selectedMember].story && (
                  <p className="font-sans text-body text-gray-600 italic mb-6">
                    "{teamMembers[selectedMember].story}"
                  </p>
                )}
              </div>

              {/* Expertise */}
              <div className="mb-6">
                <h4 className="font-sans font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {teamMembers[selectedMember].expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-700 shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-xl font-bold text-primary mb-1">{teamMembers[selectedMember].years}</div>
                  <p className="font-sans text-xs text-gray-600">Years Experience</p>
                </div>
                
                <div className="text-center p-3 bg-white rounded-lg">
                  <div className="text-xl font-bold text-primary mb-1">{teamMembers[selectedMember].projects}</div>
                  <p className="font-sans text-xs text-gray-600">Pieces Created</p>
                </div>
              </div>

              {/* Favorite Tool */}
              {teamMembers[selectedMember].favoriteTool && (
                <div className="mb-6">
                  <h4 className="font-sans font-semibold text-gray-900 mb-2">Favorite Tool</h4>
                  <p className="font-sans text-body text-gray-600">
                    {teamMembers[selectedMember].favoriteTool}
                  </p>
                </div>
              )}

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <span className="font-sans text-sm">Addis Ababa Workshop</span>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mt-8"
            >
              <Button
                variant="outline"
                onClick={() => window.location.href = "/careers"}
              >
                Join Our Team
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Workshop Photo Footer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/team/workshop-overview.jpg"
              alt="MUKO Furniture workshop in Addis Ababa"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white">
                <MapPin className="mx-auto mb-4" size={32} />
                <h3 className="font-sans text-subheading font-bold mb-2">
                  Our Addis Ababa Workshop
                </h3>
                <p className="font-sans text-body">
                  Where tradition meets innovation
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}