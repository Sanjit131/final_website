import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUsers, FiAward, FiHeart, FiGlobe } from 'react-icons/fi';
import AnimatedCounter from '../components/AnimatedCounter';

import CircularGallery from '../components/CircularGallery';
import { projects } from '../data/projects';

const FLAGSHIP_PROJECTS = [
  { image: '/gallery/food_donation.png', text: 'Anna Vriksha' },
  { image: '/gallery/udhiram.png', text: 'UDHIRAM' },
  { image: '/gallery/victo_ryla.png', text: 'Victo RYLA' },
];

export default function HomePage() {
  const heroImages = [
    "/gallery/WhatsApp Image 2025-08-11 at 23.23.53_d9a3a398.jpg",
    "/gallery/IMG_3163.JPG",
    "/gallery/IMG-20250811-WA0090.jpg",
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const [projectCount, setProjectCount] = useState(0);

  useEffect(() => {
    setProjectCount(projects.length);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [heroImages.length]);
  // Featured projects are now fetched from backend

  const testimonials = [
    {
      name: "Bhavanishraj",
      role: "President 2024-25",
      quote: "Rotaract strengthened my ability to handle pressure, communicate confidently through public speaking, lead with responsibility and manage teams effectively. These experiences significantly enhanced my confidence, resilience and leadership presence.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Rethinaath",
      role: "Vice President 2024-25",
      quote: "Rotaract club of REC is the biggest milestone in my life. I got to work with the people I love spending time with. The works I did, made me set the path for my future, opening new windows. One of  the best 2yrs of my lifetime.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      name: "Kiruthika",
      role: "Secretary 2024-25",
      quote: "Rotaract enriched me with family-like friendships, a strong network, and personal growth from introvert to ambivert. It strengthened my confidence, communication, leadership, teamwork, and skills in documentation, crisis handling, and event management, shaping me into a more confident individual.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          {heroImages.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="Hero Background"
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover filter brightness-110 contrast-105 saturate-110 transition-opacity duration-1000 ${i === heroIndex ? 'opacity-100' : 'opacity-0'
                }`}
            />
          ))}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          {/* Slider dots */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-2 z-10">
            {heroImages.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setHeroIndex(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${i === heroIndex ? 'bg-white shadow-md w-6' : 'bg-white/50 hover:bg-white/80'
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 container-custom flex items-center justify-between w-full">
          {/* Left Side - Text Content */}
          <motion.div
            className="text-white max-w-2xl flex-1 text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-sans text-left leading-tight md:leading-[1.25]">
              Driven by Passion<br />
              Defined by Impact
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-left">
              The Rotaract Club of Rajalakshmi Engineering College is where passion meets purpose. Discover how we're making a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/impact" className="btn-primary">
                Explore Our Projects
              </Link>
              <Link to="/team" className="btn-secondary">
                Meet the Team
              </Link>
            </div>
          </motion.div>

          {/* Right Side - RACREC Logo */}
          <motion.div
            className="hidden lg:flex items-center justify-end pr-20 flex-1"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="text-right">
              <div className="w-56 h-56 md:w-64 md:h-64 flex items-center justify-center mb-4">
                <img src="/club_logo_1_1.png" alt="RACREC logo" className="max-w-full max-h-full object-contain drop-shadow-2xl" />
              </div>
              {/* <h2 className="text-3xl font-bold text-white">RACREC</h2>
              <p className="text-primary text-lg mt-2 font-semibold">Rotaract Club</p> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Numbers Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              What Sets Us Apart
            </h2>
            <p className="text-gray-600 text-lg">
              Together, We Make a Difference
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: FiUsers, number: 50, label: "Active members", color: "text-primary" },
              { icon: FiAward, number: projectCount, label: "Projects Completed", color: "text-secondary" },
              { icon: FiHeart, number: 5000, label: "Lives Impacted", color: "text-primary" },
              { icon: FiGlobe, number: 4, label: "Avenues", color: "text-secondary" }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`text-4xl mb-4 ${item.color}`}>
                  <item.icon className="mx-auto" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-text-dark mb-2">
                  <AnimatedCounter end={item.number} />
                </div>
                <p className="text-gray-600 font-medium">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              Our Flagship Projects
            </h2>
            <p className="text-gray-600 text-lg">
              Discover the impactful projects we've been working on
            </p>
          </motion.div>

          {/* Signature Projects Gallery */}
          <div className="mt-16 h-[500px]">
            <CircularGallery
              items={FLAGSHIP_PROJECTS}
              bend={3}
              textColor="#000000"
              borderRadius={0.05}
            />
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link to="/impact" className="btn-primary">
              View All Projects
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-dark mb-4">
              From Our Members
            </h2>
            <p className="text-gray-600 text-lg">
              Experiences that define who we are
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4">
                  <h3 className="font-semibold text-text-dark">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};