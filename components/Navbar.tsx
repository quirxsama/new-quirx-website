"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const [activeItem, setActiveItem] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setActiveItem(hash);
      } else {
        setActiveItem('home');
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    // İlk yükleme için
    handleHashChange();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleItemClick = (id: string) => {
    setActiveItem(id);
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { id: "home", label: t("nav.home"), href: "#home" },
    { id: "about", label: t("nav.about"), href: "#about" },
    { id: "projects", label: t("nav.projects"), href: "#projects" },
    { id: "skills", label: t("nav.skills"), href: "#skills" },
    { id: "contact", label: t("nav.contact"), href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-slate-900/90 backdrop-blur-lg shadow-md" : "bg-transparent"
    }`}>
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#home" 
             onClick={() => handleItemClick('home')} 
             className="text-lg md:text-xl lg:text-2xl font-bold text-white hover:text-blue-400 transition-colors"
          >
            QuirxKaan
            <span className="text-blue-500">.</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleItemClick(item.id)}
                className={`text-sm lg:text-base transition-colors ${
                  activeItem === item.id
                    ? "text-blue-400 font-medium"
                    : "text-gray-300 hover:text-blue-400"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-blue-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-slate-900/95 backdrop-blur-lg border-b border-slate-800"
        >
          <div className="container-custom py-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleItemClick(item.id)}
                  className={`text-base py-2 transition-colors ${
                    activeItem === item.id
                      ? "text-blue-400 font-medium"
                      : "text-gray-300 hover:text-blue-400"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;