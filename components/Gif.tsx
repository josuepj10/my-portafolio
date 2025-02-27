"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

export const Gif = () => {
  // Valores de movimiento
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Suaviza el movimiento del GIF basado en la posición del mouse
  const translateX = useTransform(x, [-100, 100], [-10, 10]);
  const translateY = useTransform(y, [-100, 100], [-10, 10]);

  // Maneja el movimiento del mouse
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const newX = (e.clientX / innerWidth) * 200 - 100;
      const newY = (e.clientY / innerHeight) * 200 - 100;

      x.set(newX);
      y.set(newY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
        }}
        style={{ x: translateX, y: translateY }}
        transition={{ type: "spring", stiffness: 80, damping: 10 }}
      >
        {/* Gif con movimiento */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
          }}
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten absolute"
        >
          <Image
            src="/dark_matter.gif"
            priority
            quality={100}
            fill
            alt="Animated Universe"
            className="object-contain"
          />
        </motion.div>

        {/* Overlay animado */}
        <motion.svg
          className="w-[300px] xl:w-[506px] h-[300px] xl:h-[506px]"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#fff"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>
      </motion.div>
    </div>
  );
};
