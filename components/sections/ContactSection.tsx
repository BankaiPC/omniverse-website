'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GamingButton from "@/components/GamingButton";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

export default function ContactSection({ lang, dict }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !formRef.current || !infoRef.current) return;

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
    // Form animation
    .fromTo(formRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    // Info animation
    .fromTo(infoRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: dict?.contact?.info?.address?.title || "Address",
      content: dict?.contact?.info?.address?.content || "123 Gaming Street, Tech City, TC 12345"
    },
    {
      icon: "📞",
      title: dict?.contact?.info?.phone?.title || "Phone",
      content: dict?.contact?.info?.phone?.content || "+1 (555) 123-4567"
    },
    {
      icon: "✉️",
      title: dict?.contact?.info?.email?.title || "Email",
      content: dict?.contact?.info?.email?.content || "hello@omniverse.com"
    },
    {
      icon: "🕒",
      title: dict?.contact?.info?.hours?.title || "Hours",
      content: dict?.contact?.info?.hours?.content || "Mon-Fri 9AM-6PM PST"
    }
  ];

  const socialLinks = [
    {
      name: "Twitter",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      url: "#"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: "#"
    },
    {
      name: "Discord",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      url: "#"
    },
    {
      name: "YouTube",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      url: "#"
    }
  ];

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full flex-shrink-0 bg-gradient-to-br from-red-900 via-black to-pink-900 overflow-hidden"
    >
      {/* Communication-Themed Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Communication Icons */}
        <div className="absolute top-20 left-20 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '0s' }}>📞</div>
        <div className="absolute top-32 right-24 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '1s' }}>💬</div>
        <div className="absolute bottom-32 left-24 text-5xl opacity-10 animate-bounce" style={{ animationDelay: '2s' }}>📧</div>
        <div className="absolute bottom-20 right-20 text-4xl opacity-10 animate-bounce" style={{ animationDelay: '3s' }}>🌐</div>
        <div className="absolute top-1/2 left-1/2 text-3xl opacity-10 animate-bounce" style={{ animationDelay: '1.5s' }}>📱</div>
        
        {/* Animated Communication Network */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <pattern id="communication" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="5" fill="currentColor" />
                <path d="M20,0 L20,40 M0,20 L40,20" stroke="currentColor" strokeWidth="0.6" fill="none" />
                <path d="M0,0 L40,40 M40,0 L0,40" stroke="currentColor" strokeWidth="0.5" fill="none" />
                <circle cx="20" cy="20" r="2" fill="currentColor" />
                <path d="M10,10 L30,30 M30,10 L10,30" stroke="currentColor" strokeWidth="0.4" fill="none" />
                <path d="M5,20 L35,20 M20,5 L20,35" stroke="currentColor" strokeWidth="0.3" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#communication)" className="animate-pulse" />
          </svg>
        </div>
        
        {/* Floating Communication Orbs */}
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-gradient-to-br from-red-500/25 to-pink-500/25 rounded-full blur-xl animate-pulse" />
        <div className="absolute top-1/4 left-1/4 w-36 h-36 bg-gradient-to-br from-pink-500/25 to-rose-500/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1.5s' }} />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-br from-rose-500/25 to-red-500/25 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-to-br from-red-500/25 to-pink-500/25 rounded-full blur-lg animate-bounce" style={{ animationDelay: '2.5s' }} />
        
        {/* Animated Connection Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent animate-pulse" />
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-500/40 to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-rose-500/40 to-transparent animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent animate-pulse" style={{ animationDelay: '3s' }} />
        </div>
        
        {/* Floating Communication Particles */}
        <div className="absolute inset-0">
          {[...Array(22)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                backgroundColor: ['#ef4444', '#ec4899', '#f43f5e', '#e11d48', '#be185d'][Math.floor(Math.random() * 5)],
                opacity: 0.4,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        {/* Animated Communication Devices */}
        <div className="absolute bottom-12 left-12 w-20 h-24 bg-gradient-to-br from-red-600/20 to-pink-600/20 rounded-lg rotate-3 animate-bounce" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-16 right-16 w-18 h-22 bg-gradient-to-br from-pink-600/20 to-rose-600/20 rounded-lg -rotate-2 animate-bounce" style={{ animationDelay: '3.5s' }} />
        <div className="absolute top-20 left-1/2 w-16 h-20 bg-gradient-to-br from-rose-600/20 to-red-600/20 rounded-lg rotate-2 animate-bounce" style={{ animationDelay: '1.2s' }} />
        
        {/* Floating Message Bubbles */}
        <div className="absolute top-1/4 left-1/6 w-12 h-8 bg-gradient-to-br from-red-400/30 to-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '2.8s' }} />
        <div className="absolute bottom-1/4 right-1/6 w-10 h-6 bg-gradient-to-br from-pink-400/30 to-rose-400/30 rounded-full animate-bounce" style={{ animationDelay: '4.2s' }} />
        <div className="absolute top-2/3 left-2/3 w-11 h-7 bg-gradient-to-br from-rose-400/30 to-red-400/30 rounded-full animate-bounce" style={{ animationDelay: '1.8s' }} />
        
        {/* Animated Signal Waves */}
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-red-500/20 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/2 right-1/4 w-12 h-12 border-2 border-pink-500/20 rounded-full animate-ping" style={{ animationDelay: '3.5s' }} />
        <div className="absolute top-1/3 right-1/3 w-14 h-14 border-2 border-rose-500/20 rounded-full animate-ping" style={{ animationDelay: '1.8s' }} />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        {/* Title */}
        <motion.h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-quantum font-bold text-center text-white mb-8 sm:mb-12 md:mb-16"
          style={{
            textShadow: '0 0 20px rgba(239, 68, 68, 0.5)'
          }}
        >
          {dict?.contact?.title || "Get In Touch"}
        </motion.h2>

        {/* Description */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
            {dict?.contact?.description || "Ready to join the future of gaming? We'd love to hear from you. Send us a message and let's create something amazing together."}
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-sm rounded-xl p-4 sm:p-6 md:p-8 border border-white/10"
          >
            <h3 className="text-xl sm:text-2xl font-quantum text-white mb-4 sm:mb-6">
              {dict?.contact?.form?.title || "Send us a Message"}
            </h3>
            
            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    {dict?.contact?.form?.name || "Name"}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/20 transition-all duration-300"
                    placeholder={dict?.contact?.form?.namePlaceholder || "Your name"}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    {dict?.contact?.form?.email || "Email"}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/20 transition-all duration-300"
                    placeholder={dict?.contact?.form?.emailPlaceholder || "your@email.com"}
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  {dict?.contact?.form?.subject || "Subject"}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/20 transition-all duration-300"
                  placeholder={dict?.contact?.form?.subjectPlaceholder || "What's this about?"}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-300 mb-2">
                  {dict?.contact?.form?.message || "Message"}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/20 transition-all duration-300 resize-none"
                  placeholder={dict?.contact?.form?.messagePlaceholder || "Tell us about your project or idea..."}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-quantum font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
              >
                {dict?.contact?.form?.submitButton || "Send Message"}
              </button>
            </div>
          </motion.form>

          {/* Contact Information */}
          <motion.div
            ref={infoRef}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-quantum text-white mb-6">
                {dict?.contact?.info?.title || "Contact Information"}
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-4 group"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-1">
                        {info.title}
                      </h4>
                      <p className="text-gray-300">
                        {info.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-quantum text-white mb-4">
                {dict?.contact?.social?.title || "Follow Us"}
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 bg-white/10 hover:bg-red-400/20 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="group-hover:scale-110 transition-transform duration-300">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <h4 className="text-lg font-quantum text-white mb-3">
                {dict?.contact?.newsletter?.title || "Stay Updated"}
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                {dict?.contact?.newsletter?.description || "Get the latest news and updates about our games and technology."}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={dict?.contact?.newsletter?.placeholder || "Enter your email"}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-red-400 focus:bg-white/20 transition-all duration-300"
                />
                <GamingButton>
                  {dict?.contact?.newsletter?.button || "Subscribe"}
                </GamingButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
