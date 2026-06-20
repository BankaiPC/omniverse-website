'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import GamingButton from "@/components/GamingButton";

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  lang: 'en' | 'es';
  dict: any;
}

const IconPin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" style={{ color: '#71717A' }}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeLinejoin="round"/>
    <circle cx="12" cy="9" r="2.5"/>
  </svg>
);

const IconPhone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" style={{ color: '#71717A' }}>
    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.6 21 3 14.4 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" strokeLinejoin="round"/>
  </svg>
);

const IconMail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" style={{ color: '#71717A' }}>
    <rect x="2" y="4" width="20" height="16" rx="0"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const IconClock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" style={{ color: '#71717A' }}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v5l3 3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const IconDownload = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" style={{ color: '#6D28D9' }}>
    <path d="M12 3v12M8 11l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18h18" strokeLinecap="round"/>
  </svg>
);

const ContactSection: React.FC<ContactSectionProps> = ({ lang, dict }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    if (!sectionRef.current || !titleRef.current || !formRef.current || !infoRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(titleRef.current,
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
    )
    .fromTo(formRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
      "-=0.15"
    )
    .fromTo(infoRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" },
      "-=0.1"
    );

    return () => { tl.kill(); };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setSubmitMessage(dict?.contact?.form?.successMessage || 'Mensaje enviado. Nos ponemos en contacto pronto.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMessage(dict?.contact?.form?.errorMessage || 'Error al enviar. Por favor inténtalo de nuevo.');
      }
    } catch {
      setSubmitStatus('error');
      setSubmitMessage(dict?.contact?.form?.errorMessage || 'Error de conexión. Por favor inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: <IconPin />, title: dict?.contact?.info?.address?.title || "Dirección", content: dict?.contact?.info?.address?.content || "C/ Faisanes 25, Busot, Alicante, España" },
    { icon: <IconPhone />, title: dict?.contact?.info?.phone?.title || "Teléfono", content: dict?.contact?.info?.phone?.content || "+34 666 772 481" },
    { icon: <IconMail />, title: dict?.contact?.info?.email?.title || "Email", content: dict?.contact?.info?.email?.content || "bankaipc@gmail.com" },
    { icon: <IconClock />, title: dict?.contact?.info?.hours?.title || "Horario", content: dict?.contact?.info?.hours?.content || "Lun-Vie 9:00-18:00 CET" },
  ];

  const socialLinks = [
    {
      name: "Twitter / X",
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>,
      url: "#"
    },
    {
      name: "Discord",
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>,
      url: "#"
    },
    {
      name: "YouTube",
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
      url: "#"
    },
    {
      name: "LinkedIn",
      icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>,
      url: "#"
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full flex-shrink-0 overflow-hidden"
      style={{ background: '#0A0A0B' }}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #E5E5E5 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-12 sm:py-20">
        <h2
          ref={titleRef}
          className="text-3xl sm:text-5xl md:text-7xl font-quantum font-bold text-center mb-8 md:mb-16"
          style={{ color: '#E5E5E5' }}
        >
          {dict?.contact?.title || "Contacto"}
        </h2>

        <motion.p
          className="text-lg sm:text-xl text-center leading-relaxed mb-12 max-w-3xl mx-auto"
          style={{ color: '#A1A1AA' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {dict?.contact?.description || "¿Listo para unirte al futuro del gaming? Cuéntanos tu proyecto."}
        </motion.p>

        {/* Battlezone CTA banner */}
        <motion.div
          className="max-w-4xl mx-auto mb-12 overflow-hidden"
          style={{ background: '#111113', border: '1px solid #27272A' }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
            <img
              src="/Omniverse_logo.png"
              alt="Omniverse: The Primordial Battlezone"
              className="w-48 md:w-56 object-contain flex-shrink-0"
            />
            <div className="flex-1 text-center md:text-left">
              <span
                className="inline-block text-xs font-quantum px-3 py-1 mb-3 tracking-widest uppercase"
                style={{ color: '#A78BFA', border: '1px solid rgba(109,40,217,0.4)' }}
              >
                {lang === 'es' ? 'Primer Proyecto' : 'First Project'}
              </span>
              <h3 className="text-2xl md:text-3xl font-quantum mb-2" style={{ color: '#E5E5E5' }}>
                The Primordial Battlezone
              </h3>
              <p className="text-sm mb-4" style={{ color: '#A1A1AA' }}>
                {lang === 'es'
                  ? 'El primer universo de Omniverse Games. Combate, economía blockchain propia y comunidad global.'
                  : 'The first Omniverse Games universe. Combat, own blockchain economy and global community.'}
              </p>
              <Link href={`/${lang}/battlezone`}>
                <GamingButton>
                  {lang === 'es' ? 'Saber Más' : 'Learn More'}
                </GamingButton>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="p-6 md:p-8"
            style={{ background: '#111113', border: '1px solid #27272A' }}
          >
            <h3 className="text-xl sm:text-2xl font-quantum mb-6" style={{ color: '#E5E5E5' }}>
              {dict?.contact?.form?.title || "Envíanos un Mensaje"}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#71717A' }}>{dict?.contact?.form?.name || "Nombre"}</label>
                  <input
                    type="text" name="name" value={formData.name} onChange={handleInputChange} required
                    className="w-full px-4 py-3 text-sm transition-colors duration-200 focus:outline-none"
                    style={{ background: '#0A0A0B', border: '1px solid #27272A', color: '#E5E5E5' }}
                    placeholder={dict?.contact?.form?.namePlaceholder || "Tu nombre"}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2" style={{ color: '#71717A' }}>{dict?.contact?.form?.email || "Email"}</label>
                  <input
                    type="email" name="email" value={formData.email} onChange={handleInputChange} required
                    className="w-full px-4 py-3 text-sm transition-colors duration-200 focus:outline-none"
                    style={{ background: '#0A0A0B', border: '1px solid #27272A', color: '#E5E5E5' }}
                    placeholder={dict?.contact?.form?.emailPlaceholder || "tu@email.com"}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#71717A' }}>{dict?.contact?.form?.subject || "Asunto"}</label>
                <input
                  type="text" name="subject" value={formData.subject} onChange={handleInputChange} required
                  className="w-full px-4 py-3 text-sm transition-colors duration-200 focus:outline-none"
                  style={{ background: '#0A0A0B', border: '1px solid #27272A', color: '#E5E5E5' }}
                  placeholder={dict?.contact?.form?.subjectPlaceholder || "¿De qué se trata?"}
                />
              </div>

              <div>
                <label className="block text-sm mb-2" style={{ color: '#71717A' }}>{dict?.contact?.form?.message || "Mensaje"}</label>
                <textarea
                  name="message" value={formData.message} onChange={handleInputChange} rows={5} required
                  className="w-full px-4 py-3 text-sm transition-colors duration-200 focus:outline-none resize-none"
                  style={{ background: '#0A0A0B', border: '1px solid #27272A', color: '#E5E5E5' }}
                  placeholder={dict?.contact?.form?.messagePlaceholder || "Cuéntanos tu proyecto o idea..."}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 font-quantum font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: '#6D28D9', color: '#E5E5E5' }}
                whileHover={!isSubmitting ? { background: '#7C3AED' } : {}}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {isSubmitting
                  ? (dict?.contact?.form?.sending || 'Enviando...')
                  : (dict?.contact?.form?.submitButton || "Enviar Mensaje")}
              </motion.button>

              {submitStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="p-4 text-sm"
                  style={submitStatus === 'success'
                    ? { background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)', color: '#86EFAC' }
                    : { background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.3)', color: '#FCA5A5' }}
                >
                  {submitMessage}
                </motion.div>
              )}
            </div>
          </form>

          {/* Info column */}
          <div ref={infoRef} className="space-y-8">

            {/* Contact info */}
            <div>
              <h3 className="text-2xl font-quantum mb-6" style={{ color: '#E5E5E5' }}>
                {dict?.contact?.info?.title || "Información de Contacto"}
              </h3>
              <div className="space-y-5">
                {contactInfo.map((info, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="mt-0.5">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold mb-0.5" style={{ color: '#E5E5E5' }}>{info.title}</h4>
                      <p className="text-sm" style={{ color: '#A1A1AA' }}>{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-lg font-quantum mb-4" style={{ color: '#E5E5E5' }}>
                {dict?.contact?.social?.title || "Síguenos"}
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((s, i) => (
                  <motion.a
                    key={i}
                    href={s.url}
                    title={s.name}
                    className="w-10 h-10 flex items-center justify-center"
                    style={{ background: '#111113', border: '1px solid #27272A', color: '#71717A' }}
                    whileHover={{ borderColor: '#6D28D9', color: '#A78BFA' }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Launcher download */}
            <div
              className="p-6"
              style={{ background: '#111113', border: '1px solid #27272A' }}
            >
              <div className="flex items-center gap-3 mb-3">
                <IconDownload />
                <h4 className="text-lg font-quantum" style={{ color: '#E5E5E5' }}>
                  {dict?.contact?.newsletter?.title || "Descarga el Launcher"}
                </h4>
              </div>
              <p className="text-sm mb-4" style={{ color: '#A1A1AA' }}>
                {dict?.contact?.newsletter?.description || "Accede al launcher de Omniverse Games y sé el primero en jugar The Primordial Battlezone."}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={dict?.contact?.newsletter?.placeholder || "Tu email"}
                  className="flex-1 px-4 py-2 text-sm focus:outline-none"
                  style={{ background: '#0A0A0B', border: '1px solid #27272A', color: '#E5E5E5' }}
                />
                <GamingButton>
                  {dict?.contact?.newsletter?.button || "Descargar"}
                </GamingButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
