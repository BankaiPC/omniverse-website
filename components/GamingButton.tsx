'use client';

import { motion, useAnimation } from 'framer-motion';
import { ReactNode, useEffect, useRef } from 'react';

interface GamingButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: ReactNode;
}

export default function GamingButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  icon
}: GamingButtonProps) {
  const controls = useAnimation();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const baseClasses = "relative font-semibold transition-all duration-300 overflow-hidden group perspective-1000 space-gate";
  
  const variantClasses = {
    primary: "text-white hover:from-orange-300 hover:via-orange-400 hover:to-yellow-400",
    secondary: "text-white hover:from-gray-500 hover:via-gray-600 hover:to-gray-700",
    accent: "text-white hover:from-cyan-300 hover:via-cyan-400 hover:to-blue-400"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  const glowColors = {
    primary: "shadow-orange-500/30 hover:shadow-orange-500/60",
    secondary: "shadow-gray-500/30 hover:shadow-gray-500/60",
    accent: "shadow-cyan-500/30 hover:shadow-cyan-500/60"
  };

  // Advanced 3D Mouse Tracking with Physics
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Advanced 3D rotation with perspective
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    const rotateZ = (x - centerX) / 20;
    
    // Dynamic lighting based on mouse position
    const lightIntensity = Math.max(0.1, 1 - Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) / (rect.width / 2));
    
    controls.start({
      rotateX: rotateX,
      rotateY: rotateY,
      rotateZ: rotateZ,
      scale: 1.02 + lightIntensity * 0.03,
      transition: { 
        duration: 0.15,
        ease: "easeOut"
      }
    });
  };

  const handleMouseLeave = () => {
    controls.start({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      transition: { 
        duration: 0.4,
        ease: "easeOut"
      }
    });
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${glowColors[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ 
        scale: 0.98,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        transition: { duration: 0.1 }
      }}
      initial={{ opacity: 0, y: 30, rotateX: -20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: "easeOut",
        delay: 0.1
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      {/* Space Station Gate Brackets */}
      <div className="gate-bracket top-left" />
      <div className="gate-bracket top-right" />
      <div className="gate-bracket bottom-left" />
      <div className="gate-bracket bottom-right" />
      
      {/* Gate Scan Line */}
      <div className="gate-scan" />
      
      {/* Gate Energy Field */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: variant === 'primary' 
            ? 'radial-gradient(circle at center, rgba(255, 165, 0, 0.3) 0%, transparent 70%)'
            : variant === 'secondary'
            ? 'radial-gradient(circle at center, rgba(100, 100, 100, 0.3) 0%, transparent 70%)'
            : 'radial-gradient(circle at center, rgba(0, 255, 255, 0.3) 0%, transparent 70%)',
          clipPath: 'polygon(0% 20%, 10% 0%, 90% 0%, 100% 20%, 100% 80%, 90% 100%, 10% 100%, 0% 80%)'
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Animated background effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 rounded-inherit"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transform: 'translateZ(1px)' }}
      />
      
      {/* Scan line effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 rounded-inherit"
        initial={{ x: '-100%' }}
        whileHover={{ x: '100%' }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
        style={{ transform: 'translateZ(1px)' }}
      />
      
      {/* Gate Status Indicators */}
      <motion.div
        className="absolute top-2 left-2 w-2 h-2 bg-green-500 rounded-full"
        style={{
          boxShadow: '0 0 4px rgba(34, 197, 94, 0.6)',
          animation: 'pulse 3s infinite'
        }}
        whileHover={{
          scale: 1.2,
          boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)',
          transition: { duration: 0.3 }
        }}
      />
      <motion.div
        className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"
        style={{
          boxShadow: '0 0 4px rgba(59, 130, 246, 0.6)',
          animation: 'pulse 3s infinite 0.5s'
        }}
        whileHover={{
          scale: 1.2,
          boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)',
          transition: { duration: 0.3 }
        }}
      />
      
      {/* Advanced 3D Content Layer */}
      <motion.div 
        className="relative flex items-center justify-center gap-3 z-10"
        style={{ transform: 'translateZ(6px)' }}
      >
        {icon && (
          <motion.div
            className="flex items-center"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(100, 150, 255, 0.4))',
              transform: 'translateZ(2px)'
            }}
          >
            {icon}
          </motion.div>
        )}
        <motion.span 
          className="relative font-quantum tracking-wider"
          style={{
            textShadow: '0 0 10px rgba(150, 150, 200, 0.6), 0 0 20px rgba(150, 150, 200, 0.3)',
            color: '#ffffff',
            transform: 'translateZ(3px)',
            fontWeight: '600'
          }}
        >
          {children}
        </motion.span>
      </motion.div>
      
      {/* Advanced 3D Gate Opening Sequence */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(45deg, transparent 0%, rgba(100, 150, 255, 0.08) 50%, transparent 100%)',
          clipPath: 'polygon(0% 15%, 8% 0%, 92% 0%, 100% 15%, 100% 85%, 92% 100%, 8% 100%, 0% 85%)',
          transform: 'translateZ(2px)'
        }}
        initial={{ scale: 0.7, opacity: 0, rotateX: -10 }}
        whileHover={{ 
          scale: 1.02,
          opacity: 1,
          rotateX: 0,
          transition: { 
            duration: 0.5, 
            ease: "easeOut"
          }
        }}
      />

      {/* Holographic Energy Field */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(100, 150, 255, 0.12) 0%, transparent 60%)',
          clipPath: 'polygon(0% 15%, 8% 0%, 92% 0%, 100% 15%, 100% 85%, 92% 100%, 8% 100%, 0% 85%)',
          transform: 'translateZ(1px)'
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        whileHover={{ 
          scale: 1.08,
          opacity: 1,
          transition: { 
            duration: 0.4, 
            ease: "easeOut"
          }
        }}
      />

      {/* Advanced Scan Lines with 3D Depth */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(120, 180, 255, 0.15) 50%, transparent 100%)',
          clipPath: 'polygon(0% 15%, 8% 0%, 92% 0%, 100% 15%, 100% 85%, 92% 100%, 8% 100%, 0% 85%)',
          transform: 'translateZ(3px)',
          filter: 'blur(0.5px)'
        }}
        initial={{ x: '-120%', opacity: 0 }}
        whileHover={{ 
          x: '120%',
          opacity: 1,
          transition: { 
            duration: 1.2, 
            ease: "easeOut"
          }
        }}
      />

      {/* 3D Depth Lines */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(135deg, transparent 0%, rgba(80, 120, 200, 0.06) 50%, transparent 100%)',
          clipPath: 'polygon(0% 15%, 8% 0%, 92% 0%, 100% 15%, 100% 85%, 92% 100%, 8% 100%, 0% 85%)',
          transform: 'translateZ(4px)'
        }}
        initial={{ scale: 0.9, opacity: 0 }}
        whileHover={{ 
          scale: 1.1,
          opacity: 1,
          transition: { 
            duration: 0.6, 
            ease: "easeOut"
          }
        }}
      />
    </motion.button>
  );
}
