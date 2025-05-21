"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaGithub, FaLinkedin, FaTwitter, FaYoutube, FaInstagram, FaBluesky } from "react-icons/fa6";
import Image from "next/image";

const Hero = () => {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.2,
        duration: shouldReduceMotion ? 0.3 : 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.5,
      },
    },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 md:pt-20 px-4 sm:px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5 mix-blend-multiply" />
        <div className="absolute h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-blue-600/5 blur-2xl -top-20 -left-20 md:-left-40" />
        <div className="absolute h-[300px] w-[300px] md:h-[500px] md:w-[500px] rounded-full bg-indigo-600/5 blur-2xl -bottom-20 -right-20 md:-right-40" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <motion.div variants={itemVariants} className="mb-3">
              <span className="inline-block px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm font-medium mb-2">
                {t("hero.greeting")}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight">
              {t("hero.name")} <span className="text-blue-500">QuirxKaan</span>
            </motion.h1>

            <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-medium mb-6 text-blue-400">
              {t("hero.title")}
            </motion.h2>

            <motion.p variants={itemVariants} className="text-lg text-gray-300 mb-8 max-w-lg">
              {t("hero.description")}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                {t("hero.contact")}
              </a>
              <a href="#projects" className="btn-outline">
                {t("hero.projects")}
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex items-center space-x-6">
              <a 
                href="https://github.com/quirxsama" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/quirxkaan/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://x.com/quirxkaan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a 
                href="https://www.youtube.com/@QuirxKaan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/quirx.kaan/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
               <a
                href="https://bsky.app/profile/quirxsama.bsky.social"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                 aria-label="Bluesky"
               >
               <FaBluesky className="w-6 h-6" />
              </a>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="hidden lg:block relative"
          >
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden border-2 border-slate-700/50 shadow-xl">
              <Image
                src="/images/hero-profile.jpg"
                alt="Cat"
                fill
                className="scale-105 blur-sm object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/90 via-slate-800/70 to-slate-800/40 z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="text-center p-6">
                  <span className="text-7xl font-bold text-blue-500">Kaan</span>
                  <p className="text-gray-300 mt-4">Full Stack Developer & UI/UX Designer</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;