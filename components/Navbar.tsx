"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const pathname = usePathname();
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
        <div className="flex items-center justify-between h-20">
          <a href="#home" onClick={() => handleItemClick('home')} className="text-xl md:text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            QuirxKaan
            <span className="text-blue-500">.</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => handleItemClick(item.id)}
                className={`relative px-1 py-2 text-sm font-medium ${
                  activeItem === item.id ? "text-blue-400" : "text-gray-300 hover:text-white"
                }`}
              >
                {item.label}
                {activeItem === item.id && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                )}
              </a>
            ))}
            <a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-4 px-4 py-2 text-sm font-medium border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded transition-colors"
            >
              {t("nav.resume")}
            </a>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobil Menü */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-900 border-t border-slate-800"
        >
          <div className="container-custom py-4">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleItemClick(item.id)}
                  className={`px-3 py-2 text-base font-medium rounded ${
                    activeItem === item.id ? "text-blue-400 bg-slate-800" : "text-gray-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </a>
              ))}
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-3 py-2 text-base font-medium border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white rounded text-center"
              >
                {t("nav.resume")}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 