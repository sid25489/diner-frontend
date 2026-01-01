"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';

interface CoffeeBean {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

interface SteamParticle {
  id: number;
  x: number;
  delay: number;
}

export default function CoffeeEffects() {
  const [isClient, setIsClient] = useState(false);
  const [coffeeBeans, setCoffeeBeans] = useState<CoffeeBean[]>([]);
  const [steamParticles, setSteamParticles] = useState<SteamParticle[]>([]);

  useEffect(() => {
    // This code will only run on the client side
    setIsClient(true);
    
    // Generate random values only on client side
    setCoffeeBeans(Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 2,
    })));
    
    setSteamParticles(Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 50 + (i - 3) * 15,
      delay: i * 0.3,
    })));
  }, []);

  // Don't render anything on the server
  if (!isClient) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating Coffee Beans */}
      {coffeeBeans.map((bean) => (
        <motion.div
          key={bean.id}
          className="absolute text-2xl opacity-20"
          style={{
            left: `${bean.x}%`,
            top: `${bean.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(bean.id) * 20, 0],
            rotate: [0, 360],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: bean.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: bean.delay,
          }}
        >
          🫘
        </motion.div>
      ))}

      {/* Coffee Steam Effect */}
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
        {steamParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-16 bg-diner-coffee/20 rounded-full blur-sm"
            style={{
              left: `${particle.x}%`,
            }}
            animate={{
              y: [0, -80],
              x: [0, (particle.id - 3) * 10],
              opacity: [0.3, 0],
              scale: [1, 1.5],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Coffee Cup Animation */}
      <motion.div
        className="absolute bottom-10 right-10 text-6xl opacity-10"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ☕
      </motion.div>

      {/* Coffee Aroma Particles */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`aroma-${i}`}
          className="absolute w-1 h-1 bg-diner-coffee/30 rounded-full"
          style={{
            left: `${20 + (i % 4) * 20}%`,
            top: `${30 + Math.floor(i / 4) * 20}%`,
          }}
          animate={{
            y: [0, -100],
            x: [0, (i % 2 === 0 ? 1 : -1) * 30],
            opacity: [0.3, 0],
            scale: [1, 2],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 0.4,
          }}
        />
      ))}

      {/* Coffee Ring Ripples */}
      {Array.from({ length: 3 }, (_, i) => (
        <motion.div
          key={`ripple-${i}`}
          className="absolute border-2 border-diner-coffee/10 rounded-full"
          style={{
            width: 100 + i * 50,
            height: 100 + i * 50,
            left: "50%",
            top: "40%",
            marginLeft: -(50 + i * 25),
            marginTop: -(50 + i * 25),
          }}
          animate={{
            scale: [1, 1.5, 2],
            opacity: [0.3, 0.1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeOut",
            delay: i * 1,
          }}
        />
      ))}
    </div>
  );
}


