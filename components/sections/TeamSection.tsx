'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TeamSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

// Posiciones/colores/tiempos fijos — sin Math.random() en render
// (mismatch de hidratación servidor/cliente).
const TEAM_PARTICLES = [
  { left: '6%', top: '12%', color: '#6366f1', delay: 0.2, duration: 2.4 },
  { left: '18%', top: '64%', color: '#8b5cf6', delay: 1.8, duration: 3.1 },
  { left: '30%', top: '28%', color: '#a855f7', delay: 0.6, duration: 2.7 },
  { left: '42%', top: '80%', color: '#3b82f6', delay: 2.6, duration: 3.6 },
  { left: '54%', top: '10%', color: '#1d4ed8', delay: 1.1, duration: 2.2 },
  { left: '66%', top: '50%', color: '#6366f1', delay: 3.2, duration: 3.3 },
  { left: '78%', top: '22%', color: '#8b5cf6', delay: 0.4, duration: 2.9 },
  { left: '90%', top: '70%', color: '#a855f7', delay: 2.0, duration: 3.5 },
  { left: '10%', top: '88%', color: '#3b82f6', delay: 1.5, duration: 2.6 },
  { left: '24%', top: '40%', color: '#1d4ed8', delay: 3.6, duration: 3.0 },
  { left: '36%', top: '56%', color: '#6366f1', delay: 0.8, duration: 2.5 },
  { left: '48%', top: '34%', color: '#8b5cf6', delay: 2.4, duration: 3.4 },
  { left: '60%', top: '76%', color: '#a855f7', delay: 1.3, duration: 2.8 },
  { left: '72%', top: '14%', color: '#3b82f6', delay: 3.0, duration: 3.2 },
  { left: '84%', top: '46%', color: '#1d4ed8', delay: 0.5, duration: 2.3 },
  { left: '94%', top: '84%', color: '#6366f1', delay: 1.9, duration: 3.7 },
];

export default function TeamSection({ lang, dict }: TeamSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !teamRef.current || !valuesRef.current) return;

    // Create timeline for entrance animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    // Title animation
    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0, scale: 0.8 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
    )
    // Team animation
    .fromTo(teamRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    // Values animation
    .fromTo(valuesRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: dict?.team?.members?.alex?.name || "Alex Chen",
      role: dict?.team?.members?.alex?.role || "CEO & Founder",
      bio: dict?.team?.members?.alex?.bio || "Visionary leader with 15+ years in gaming industry",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 2,
      name: dict?.team?.members?.sarah?.name || "Sarah Johnson",
      role: dict?.team?.members?.sarah?.role || "CTO",
      bio: dict?.team?.members?.sarah?.bio || "Tech innovator specializing in VR and AI",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 3,
      name: dict?.team?.members?.mike?.name || "Mike Rodriguez",
      role: dict?.team?.members?.mike?.role || "Lead Game Designer",
      bio: dict?.team?.members?.mike?.bio || "Creative director with award-winning game portfolio",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 4,
      name: dict?.team?.members?.emma?.name || "Emma Wilson",
      role: dict?.team?.members?.emma?.role || "Head of Art",
      bio: dict?.team?.members?.emma?.bio || "Visual artist creating stunning immersive experiences",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 5,
      name: dict?.team?.members?.david?.name || "David Kim",
      role: dict?.team?.members?.david?.role || "Lead Developer",
      bio: dict?.team?.members?.david?.bio || "Full-stack developer passionate about performance",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      id: 6,
      name: dict?.team?.members?.lisa?.name || "Lisa Thompson",
      role: dict?.team?.members?.lisa?.role || "Community Manager",
      bio: dict?.team?.members?.lisa?.bio || "Building and nurturing our global gaming community",
      image: "/api/placeholder/300/300",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    }
  ];

  const values = [
    {
      icon: "🚀",
      title: dict?.team?.values?.innovation?.title || "Innovation",
      description: dict?.team?.values?.innovation?.description || "We constantly push boundaries and explore new possibilities"
    },
    {
      icon: "🤝",
      title: dict?.team?.values?.collaboration?.title || "Collaboration",
      description: dict?.team?.values?.collaboration?.description || "Great things happen when we work together"
    },
    {
      icon: "🎯",
      title: dict?.team?.values?.excellence?.title || "Excellence",
      description: dict?.team?.values?.excellence?.description || "We strive for the highest quality in everything we do"
    },
    {
      icon: "🌍",
      title: dict?.team?.values?.impact?.title || "Impact",
      description: dict?.team?.values?.impact?.description || "Creating positive change in the gaming world"
    }
  ];

  return (
    <section 
      id="team"
      ref={sectionRef}
      className="relative min-h-screen w-full flex-shrink-0 bg-gradient-to-br from-indigo-900 via-black to-purple-900 overflow-hidden"
    >
      {/* Professional Team-Themed Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Team Icons */}
        <div className="absolute top-20 left-20 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '0s' }}>👥</div>
        <div className="absolute top-32 right-24 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>🤝</div>
        <div className="absolute bottom-32 left-24 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>💼</div>
        <div className="absolute bottom-20 right-20 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '3s' }}>🚀</div>
        <div className="absolute top-1/2 left-1/2 text-3xl opacity-10 animate-bounce" style={{ animationDelay: '1.5s' }}>⭐</div>
        
        {/* Animated Professional Network */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="network" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="3" fill="currentColor" />
                <path d="M15,0 L15,30 M0,15 L30,15" stroke="currentColor" strokeWidth="0.4" fill="none" />
                <path d="M0,0 L30,30 M30,0 L0,30" stroke="currentColor" strokeWidth="0.3" fill="none" />
                <circle cx="15" cy="15" r="1" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#network)" className="animate-pulse" />
          </svg>
        </div>
        
        {/* Floating Team Orbs */}
        <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-gradient-to-br from-indigo-500/25 to-purple-500/25 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-gradient-to-br from-purple-500/25 to-pink-500/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-gradient-to-br from-blue-500/25 to-indigo-500/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-gradient-to-br from-violet-500/25 to-purple-500/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2.5s' }} />
        
        {/* Animated Connection Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent animate-pulse" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        {/* Floating Team Particles */}
        <div className="absolute inset-0">
          {TEAM_PARTICLES.map((p, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: p.left,
                top: p.top,
                backgroundColor: p.color,
                opacity: 0.4,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`
              }}
            />
          ))}
        </div>
        
        {/* Animated Professional Elements */}
        <div className="absolute bottom-12 left-12 w-20 h-24 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-sm rotate-6 animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-16 right-16 w-18 h-22 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-sm -rotate-3 animate-bounce" style={{ animationDelay: '3.5s' }} />
        <div className="absolute top-20 left-1/2 w-16 h-20 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-sm rotate-3 animate-bounce" style={{ animationDelay: '1.2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Title */}
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-quantum font-bold text-center text-white mb-16"
          style={{
            textShadow: '0 0 20px rgba(99, 102, 241, 0.5)'
          }}
        >
          {dict?.team?.title || "Meet Our Team"}
        </motion.h2>

        {/* Description */}
        <motion.div
          className="text-center mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            {dict?.team?.description || "Our diverse team of passionate professionals is dedicated to creating extraordinary gaming experiences that inspire and entertain players worldwide."}
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          ref={teamRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-indigo-400/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Member Image Placeholder */}
              <div className="h-64 bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-50">👤</div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-quantum text-white group-hover:text-indigo-400 transition-colors mb-1">
                  {member.name}
                </h3>
                <p className="text-indigo-400 text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {member.bio}
                </p>
                
                {/* Social Links */}
                <div className="flex gap-3">
                  <a
                    href={member.social.linkedin}
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-gray-400 hover:text-indigo-400 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Values */}
        <motion.div
          ref={valuesRef}
          className="text-center"
        >
          <h3 className="text-3xl font-quantum text-white mb-12">
            {dict?.team?.values?.title || "Our Values"}
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="group text-center"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h4 className="text-lg font-quantum text-white mb-2">
                  {value.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
