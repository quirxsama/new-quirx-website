"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const LanguageSwitch = () => {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleLanguage = () => {
    setLanguage(language === "tr" ? "en" : "tr");
  };

  return (
    <AnimatePresence>
      <motion.button
        onClick={toggleLanguage}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-4 right-4 z-50 px-3 py-1 bg-blue-600/20 backdrop-blur-sm rounded-full text-white hover:bg-blue-600/30 transition-colors border border-blue-500/20"
      >
        {language === "tr" ? "🇹🇷" : "🇬🇧"}
      </motion.button>
    </AnimatePresence>
  );
};

export default LanguageSwitch; 