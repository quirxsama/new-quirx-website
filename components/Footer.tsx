"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: t("footer.home"), href: "/" },
    { name: t("footer.about"), href: "/about" },
    { name: t("footer.projects"), href: "/projects" },
    { name: t("footer.skills"), href: "/#skills" },
    { name: t("footer.contact"), href: "/#contact" },
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="text-xl font-bold text-white hover:text-blue-400 transition-colors">
              QuirxKaan<span className="text-blue-500">.</span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm">
              {t("footer.description")}
            </p>
            <div className="mt-6 flex items-center space-x-4">
              <a 
                href="https://github.com/quirxsama" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/in/quirxkaan/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://x.com/quirxkaan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter className="w-5 h-5" />
              </a>
              <a 
                href="https://www.youtube.com/@QuirxKaan" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-red-500 transition-colors"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/quirx.kaan/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-base font-medium text-white mb-4">{t("footer.links")}</h3>
            <ul className="space-y-2">
              {footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-medium text-white mb-4">{t("footer.contact_info")}</h3>
            <address className="not-italic">
              <p className="text-sm text-gray-400 mb-2">İstanbul, Türkiye</p>
              <p className="text-sm text-gray-400 mb-2">
                <a href="mailto:info@quirxkaan.com" className="hover:text-blue-400 transition-colors">
                  info@quirxkaan.com
                </a>
              </p>
              <p className="text-sm text-gray-400">
                <a href="tel:+905001234567" className="hover:text-blue-400 transition-colors">
                  +90 (XXX) XXX-XXXX
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} QuirxKaan {t("footer.rights")}.
          </p>
          <div className="mt-4 md:mt-0 flex items-center text-sm text-gray-500">
            <span className="inline-flex items-center">
              {t("footer.made_with")} <FaHeart className="text-red-500 mx-1 w-3 h-3" /> {t("footer.by")} QuirxKaan
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;