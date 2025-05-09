"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";

const ContactSection = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Burada form verilerini gönderme işlemi yapılacak
      // Örnek: await fetch('/api/contact', {method: 'POST', body: JSON.stringify(formData)})
      
      // Simüle edilmiş işlem
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setError(t("contact.error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="section bg-slate-900/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t("contact.title")}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-1 bg-blue-500 mx-auto mb-6"
          />
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-400 max-w-2xl mx-auto"
          >
            {t("contact.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 card"
          >
            <h3 className="text-xl font-semibold mb-6 text-blue-400">{t("contact.info")}</h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <FaEnvelope className="text-blue-500 mt-1 w-5 h-5 flex-shrink-0" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">{t("contact.email")}</p>
                  <a href="mailto:info@quirxkaan.com" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    info@quirxkaan.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaMapMarkerAlt className="text-blue-500 mt-1 w-5 h-5 flex-shrink-0" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">{t("contact.location")}</p>
                  <p className="text-sm text-gray-400">İstanbul, Türkiye</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <FaPhone className="text-blue-500 mt-1 w-5 h-5 flex-shrink-0" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-300">{t("contact.phone")}</p>
                  <a href="tel:+905001234567" className="text-sm text-gray-400 hover:text-blue-400 transition-colors">
                    +90 (500) 123 45 67
                  </a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-700/50">
              <h4 className="text-sm font-medium text-gray-300 mb-4">{t("contact.social")}</h4>
              <div className="flex items-center space-x-4">
                <a 
                  href="https://linkedin.com/in/quirxkaan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full text-gray-400 hover:text-blue-400 hover:bg-slate-700 transition-colors"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="w-5 h-5" />
                </a>
                <a 
                  href="https://github.com/quirxkaan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-slate-700 transition-colors"
                  aria-label="GitHub"
                >
                  <FaGithub className="w-5 h-5" />
                </a>
                <a 
                  href="https://twitter.com/quirxkaan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-slate-800 p-3 rounded-full text-gray-400 hover:text-blue-400 hover:bg-slate-700 transition-colors"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3 card"
          >
            <h3 className="text-xl font-semibold mb-6 text-blue-400">{t("contact.form_title")}</h3>
            
            {isSent ? (
              <div className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4 text-center">
                <p className="text-blue-400 font-medium">{t("contact.success")}</p>
                <button
                  onClick={() => setIsSent(false)}
                  className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                >
                  {t("contact.send_another")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      {t("contact.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      {t("contact.email_label")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    {t("contact.subject")}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    {t("contact.message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white resize-none"
                  />
                </div>
                
                {error && (
                  <div className="text-red-400 text-sm">{error}</div>
                )}
                
                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-primary w-full flex justify-center items-center"
                  >
                    {isLoading ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      t("contact.send")
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 