'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GamingButton from "@/components/GamingButton";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface InvestorsSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

export default function InvestorsSection({ lang, dict }: InvestorsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const investorsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !investorsRef.current || !metricsRef.current) return;

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
    // Investors animation
    .fromTo(investorsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    // Metrics animation
    .fromTo(metricsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const investors = [
    {
      id: 1,
      name: dict?.investors?.ventureCapital?.name || "TechVentures Capital",
      type: dict?.investors?.ventureCapital?.type || "Series A Lead",
      amount: "$15M",
      description: dict?.investors?.ventureCapital?.description || "Leading venture capital firm focused on gaming and tech startups",
      logo: "/api/placeholder/200/100"
    },
    {
      id: 2,
      name: dict?.investors?.gamingFund?.name || "Gaming Innovation Fund",
      type: dict?.investors?.gamingFund?.type || "Strategic Investor",
      amount: "$8M",
      description: dict?.investors?.gamingFund?.description || "Specialized gaming industry investment fund",
      logo: "/api/placeholder/200/100"
    },
    {
      id: 3,
      name: dict?.investors?.corporate?.name || "Meta Gaming Corp",
      type: dict?.investors?.corporate?.type || "Corporate Partner",
      amount: "$12M",
      description: dict?.investors?.corporate?.description || "Strategic partnership with major gaming corporation",
      logo: "/api/placeholder/200/100"
    },
    {
      id: 4,
      name: dict?.investors?.angel?.name || "Angel Investors Group",
      type: dict?.investors?.angel?.type || "Angel Round",
      amount: "$5M",
      description: dict?.investors?.angel?.description || "Group of successful gaming industry entrepreneurs",
      logo: "/api/placeholder/200/100"
    }
  ];

  const metrics = [
    {
      number: "$40M",
      label: dict?.investors?.metrics?.totalFunding || "Total Funding Raised",
      description: dict?.investors?.metrics?.totalFundingDesc || "Across multiple funding rounds"
    },
    {
      number: "15+",
      label: dict?.investors?.metrics?.investors || "Investors",
      description: dict?.investors?.metrics?.investorsDesc || "Leading industry investors"
    },
    {
      number: "3x",
      label: dict?.investors?.metrics?.growth || "Revenue Growth",
      description: dict?.investors?.metrics?.growthDesc || "Year-over-year growth"
    },
    {
      number: "50+",
      label: dict?.investors?.metrics?.countries || "Countries",
      description: dict?.investors?.metrics?.countriesDesc || "Global market presence"
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: dict?.investors?.milestones?.seriesA?.title || "Series A Funding",
      description: dict?.investors?.milestones?.seriesA?.description || "Raised $15M to accelerate product development"
    },
    {
      year: "2023",
      title: dict?.investors?.milestones?.launch?.title || "Product Launch",
      description: dict?.investors?.milestones?.launch?.description || "Successfully launched first gaming platform"
    },
    {
      year: "2022",
      title: dict?.investors?.milestones?.seed?.title || "Seed Funding",
      description: dict?.investors?.milestones?.seed?.description || "Initial $5M seed round to build MVP"
    },
    {
      year: "2021",
      title: dict?.investors?.milestones?.founded?.title || "Company Founded",
      description: dict?.investors?.milestones?.founded?.description || "Started with vision to revolutionize gaming"
    }
  ];

  return (
    <section 
      id="investors"
      ref={sectionRef}
      className="relative min-h-screen w-full flex-shrink-0 bg-gradient-to-br from-yellow-900 via-black to-orange-900 overflow-hidden"
    >
      {/* Financial/Investment-Themed Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Financial Icons */}
        <div className="absolute top-20 left-20 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '0s' }}>💰</div>
        <div className="absolute top-32 right-24 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>📈</div>
        <div className="absolute bottom-32 left-24 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>💎</div>
        <div className="absolute bottom-20 right-20 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '3s' }}>🏆</div>
        <div className="absolute top-1/2 left-1/2 text-3xl opacity-10 animate-bounce" style={{ animationDelay: '1.5s' }}>⚡</div>
        
        {/* Animated Financial Network */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="financial" x="0" y="0" width="35" height="35" patternUnits="userSpaceOnUse">
                <circle cx="17.5" cy="17.5" r="4" fill="currentColor" />
                <path d="M17.5,0 L17.5,35 M0,17.5 L35,17.5" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <path d="M0,0 L35,35 M35,0 L0,35" stroke="currentColor" strokeWidth="0.4" fill="none" />
                <circle cx="17.5" cy="17.5" r="1.5" fill="currentColor" />
                <path d="M8.75,8.75 L26.25,26.25 M26.25,8.75 L8.75,26.25" stroke="currentColor" strokeWidth="0.3" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#financial)" className="animate-pulse" />
          </svg>
        </div>
        
        {/* Floating Investment Orbs */}
        <div className="absolute top-1/4 left-1/4 w-44 h-44 bg-gradient-to-br from-yellow-500/25 to-orange-500/25 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-orange-500/25 to-red-500/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-40 h-40 bg-gradient-to-br from-amber-500/25 to-yellow-500/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-gradient-to-br from-yellow-500/25 to-amber-500/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2.5s' }} />
        
        {/* Animated Growth Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent animate-pulse" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/40 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/40 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        {/* Floating Investment Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#f59e0b', '#f97316', '#ea580c', '#d97706', '#ca8a04'][Math.floor(Math.random() * 5)],
                opacity: 0.4,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Animated Financial Charts */}
        <div className="absolute bottom-12 left-12 w-24 h-16 bg-gradient-to-br from-yellow-600/20 to-orange-600/20 rounded-sm rotate-3 animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-16 right-16 w-20 h-14 bg-gradient-to-br from-orange-600/20 to-red-600/20 rounded-sm -rotate-2 animate-bounce" style={{ animationDelay: '3.5s' }} />
        <div className="absolute top-20 left-1/2 w-18 h-12 bg-gradient-to-br from-amber-600/20 to-yellow-600/20 rounded-sm rotate-2 animate-bounce" style={{ animationDelay: '1.2s' }} />
        
        {/* Floating Coins */}
        <div className="absolute top-1/3 left-1/6 w-8 h-8 bg-gradient-to-br from-yellow-400/30 to-orange-400/30 rounded-full animate-bounce" style={{ animationDelay: '2.8s' }} />
        <div className="absolute bottom-1/3 right-1/6 w-6 h-6 bg-gradient-to-br from-orange-400/30 to-red-400/30 rounded-full animate-bounce" style={{ animationDelay: '4.2s' }} />
        <div className="absolute top-2/3 left-2/3 w-7 h-7 bg-gradient-to-br from-amber-400/30 to-yellow-400/30 rounded-full animate-bounce" style={{ animationDelay: '1.8s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        {/* Title */}
        <motion.h2
          ref={titleRef}
          className="text-5xl md:text-7xl font-quantum font-bold text-center text-white mb-16"
          style={{
            textShadow: '0 0 20px rgba(251, 191, 36, 0.5)'
          }}
        >
          {dict?.investors?.title || "Our Investors"}
        </motion.h2>

        {/* Description */}
        <motion.div
          className="text-center mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-xl text-gray-300 leading-relaxed">
            {dict?.investors?.description || "We're backed by leading investors who share our vision of transforming the gaming industry through innovative technology and immersive experiences."}
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          ref={metricsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-quantum text-yellow-400 mb-2 group-hover:text-yellow-300 transition-colors">
                {metric.number}
              </div>
              <div className="text-white text-sm font-semibold mb-1">
                {metric.label}
              </div>
              <div className="text-gray-400 text-xs">
                {metric.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Investors Grid */}
        <motion.div
          ref={investorsRef}
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-20"
        >
          {investors.map((investor, index) => (
            <motion.div
              key={investor.id}
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-yellow-400/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="p-8">
                {/* Investor Logo Placeholder */}
                <div className="h-16 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg mb-6 flex items-center justify-center">
                  <div className="text-white font-bold text-lg">
                    {investor.name.split(' ').map((word: string) => word[0]).join('')}
                  </div>
                </div>

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-quantum text-white group-hover:text-yellow-400 transition-colors mb-1">
                      {investor.name}
                    </h3>
                    <p className="text-yellow-400 text-sm">
                      {investor.type}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-quantum text-yellow-400">
                      {investor.amount}
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {investor.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Company Timeline */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-quantum text-white text-center mb-12">
            {dict?.investors?.timeline?.title || "Our Journey"}
          </h3>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-400" />
              
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                      <div className="text-yellow-400 font-bold text-lg mb-2">
                        {milestone.year}
                      </div>
                      <h4 className="text-white font-quantum text-xl mb-2">
                        {milestone.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black" />
                  
                  <div className="w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl font-quantum text-white mb-6">
            {dict?.investors?.cta?.title || "Interested in Investing?"}
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            {dict?.investors?.cta?.description || "Join our mission to revolutionize gaming. Contact us to learn about investment opportunities."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GamingButton>
              {dict?.investors?.cta?.contactButton || "Contact Us"}
            </GamingButton>
            <GamingButton>
              {dict?.investors?.cta?.pitchButton || "View Pitch Deck"}
            </GamingButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
