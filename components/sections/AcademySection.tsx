'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GamingButton from "@/components/GamingButton";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface AcademySectionProps {
  lang: 'en' | 'es';
  dict: any;
}

export default function AcademySection({ lang, dict }: AcademySectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const coursesRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !coursesRef.current || !statsRef.current) return;

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
    // Courses animation
    .fromTo(coursesRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    // Stats animation
    .fromTo(statsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const courses = [
    {
      id: 1,
      title: dict?.academy?.courses?.gameDev?.title || "Game Development",
      description: dict?.academy?.courses?.gameDev?.description || "Learn to create immersive games from scratch",
      duration: "12 weeks",
      level: "Beginner",
      students: 1250,
      rating: 4.9,
      price: "$299"
    },
    {
      id: 2,
      title: dict?.academy?.courses?.vrDesign?.title || "VR Design",
      description: dict?.academy?.courses?.vrDesign?.description || "Master virtual reality design principles",
      duration: "8 weeks",
      level: "Intermediate",
      students: 890,
      rating: 4.8,
      price: "$199"
    },
    {
      id: 3,
      title: dict?.academy?.courses?.aiGaming?.title || "AI in Gaming",
      description: dict?.academy?.courses?.aiGaming?.description || "Integrate artificial intelligence in games",
      duration: "10 weeks",
      level: "Advanced",
      students: 650,
      rating: 4.9,
      price: "$399"
    },
    {
      id: 4,
      title: dict?.academy?.courses?.gameArt?.title || "Game Art & Animation",
      description: dict?.academy?.courses?.gameArt?.description || "Create stunning visuals and animations",
      duration: "14 weeks",
      level: "Beginner",
      students: 2100,
      rating: 4.7,
      price: "$249"
    }
  ];

  const stats = [
    {
      number: "10K+",
      label: dict?.academy?.stats?.students || "Students"
    },
    {
      number: "95%",
      label: dict?.academy?.stats?.success || "Success Rate"
    },
    {
      number: "24/7",
      label: dict?.academy?.stats?.support || "Support"
    }
  ];

  return (
    <section 
      id="academy"
      ref={sectionRef}
      className="relative min-h-screen w-full flex-shrink-0 bg-gradient-to-br from-green-900 via-black to-teal-900 overflow-hidden"
    >
      {/* Educational-Themed Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Learning Icons */}
        <div className="absolute top-24 left-16 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '0s' }}>📚</div>
        <div className="absolute top-32 right-24 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>🎓</div>
        <div className="absolute bottom-32 left-24 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>💡</div>
        <div className="absolute bottom-24 right-16 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '3s' }}>🔬</div>
        <div className="absolute top-1/2 left-1/2 text-3xl opacity-10 animate-bounce" style={{ animationDelay: '1.5s' }}>⚗️</div>
        
        {/* Animated Knowledge Network */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="knowledge" x="0" y="0" width="25" height="25" patternUnits="userSpaceOnUse">
                <circle cx="12.5" cy="12.5" r="2" fill="currentColor" />
                <path d="M12.5,0 L12.5,25 M0,12.5 L25,12.5" stroke="currentColor" strokeWidth="0.3" fill="none" />
                <path d="M0,0 L25,25 M25,0 L0,25" stroke="currentColor" strokeWidth="0.2" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#knowledge)" className="animate-pulse" />
          </svg>
        </div>
        
        {/* Floating Study Orbs */}
        <div className="absolute top-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-green-500/25 to-emerald-500/25 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-gradient-to-br from-teal-500/25 to-cyan-500/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-44 h-44 bg-gradient-to-br from-lime-500/25 to-green-500/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-emerald-500/25 to-teal-500/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2.5s' }} />
        
        {/* Animated Learning Paths */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-500/40 to-transparent animate-pulse" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime-500/40 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        {/* Floating Knowledge Particles */}
        <div className="absolute inset-0">
          {[...Array(18)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#10b981', '#14b8a6', '#34d399', '#6ee7b7', '#a7f3d0'][Math.floor(Math.random() * 5)],
                opacity: 0.4,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Animated Study Books */}
        <div className="absolute bottom-10 left-10 w-16 h-20 bg-gradient-to-br from-green-600/20 to-emerald-600/20 rounded-sm rotate-12 animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-16 right-12 w-14 h-18 bg-gradient-to-br from-teal-600/20 to-cyan-600/20 rounded-sm -rotate-6 animate-bounce" style={{ animationDelay: '3.5s' }} />
        <div className="absolute top-16 left-1/2 w-12 h-16 bg-gradient-to-br from-lime-600/20 to-green-600/20 rounded-sm rotate-6 animate-bounce" style={{ animationDelay: '1.2s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Title */}
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-quantum font-bold text-center text-white mb-16"
          style={{
            textShadow: '0 0 20px rgba(34, 197, 94, 0.5)'
          }}
        >
          {dict?.academy?.title || "Omniverse Academy"}
        </motion.h2>

        {/* Description */}
        <motion.div
          className="text-center mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            {dict?.academy?.description || "Master the art of game development and immersive technology with our comprehensive courses designed by industry experts."}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-quantum text-green-400 mb-2 group-hover:text-green-300 transition-colors">
                {stat.number}
              </div>
              <div className="text-gray-400 text-sm">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Courses Grid */}
        <motion.div
          ref={coursesRef}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-green-400/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-quantum text-white group-hover:text-green-400 transition-colors mb-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="bg-white/10 px-2 py-1 rounded">
                        {course.duration}
                      </span>
                      <span className="bg-white/10 px-2 py-1 rounded">
                        {course.level}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-quantum text-green-400">
                      {course.price}
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">
                      {course.rating} ({course.students} students)
                    </span>
                  </div>
                </div>

                <GamingButton>
                  {dict?.academy?.enrollButton || "Enroll Now"}
                </GamingButton>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-quantum text-white mb-6">
            {dict?.academy?.cta?.title || "Ready to Start Your Journey?"}
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {dict?.academy?.cta?.description || "Join thousands of students who have already transformed their careers with our comprehensive courses."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GamingButton>
              {dict?.academy?.cta?.browseButton || "Browse All Courses"}
            </GamingButton>
            <GamingButton>
              {dict?.academy?.cta?.freeTrialButton || "Start Free Trial"}
            </GamingButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
