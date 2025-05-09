"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";
import Link from "next/link";

const AboutSection = () => {
  const { t } = useLanguage();

  const experienceData = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      company: "TechCorp",
      period: "2020 - Günümüz",
      description: "Modern web uygulamaları geliştirme, mikroservis mimarisi tasarımı, ekip liderliği.",
    },
    {
      id: 2,
      title: "UI/UX Designer & Frontend Developer",
      company: "DesignStudio",
      period: "2018 - 2020",
      description: "Kullanıcı arayüzü tasarımı, kullanıcı deneyimi iyileştirmeleri, frontend geliştirme.",
    },
    {
      id: 3,
      title: "Junior Web Developer",
      company: "WebAgency",
      period: "2016 - 2018",
      description: "Responsive web siteleri geliştirme, CMS entegrasyonu, SEO optimizasyonu.",
    },
  ];

  const educationData = [
    {
      id: 1,
      degree: "Bilgisayar Mühendisliği Yüksek Lisans",
      school: "İstanbul Teknik Üniversitesi",
      period: "2017 - 2019",
    },
    {
      id: 2,
      degree: "Bilgisayar Mühendisliği Lisans",
      school: "Boğaziçi Üniversitesi",
      period: "2013 - 2017",
    },
  ];

  return (
    <section id="about" className="section bg-slate-900/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t("about.title")}
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
            {t("about.subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 via-transparent to-transparent z-10"></div>
              <Image 
                src="https://placehold.co/600x600/383838/FFFFFF/png?text=QuirxKaan" 
                alt="QuirxKaan" 
                layout="fill"
                objectFit="cover"
                className="z-0"
              />
              <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-20 font-medium">
                7+ {t("about.years_experience")}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-white">{t("about.hello")}</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t("about.description_1")}
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {t("about.description_2")}
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h4 className="text-blue-400 font-medium mb-3">{t("about.name_label")}</h4>
                <p className="text-gray-300">QuirxKaan</p>
              </div>
              <div>
                <h4 className="text-blue-400 font-medium mb-3">{t("about.location_label")}</h4>
                <p className="text-gray-300">İstanbul, Türkiye</p>
              </div>
              <div>
                <h4 className="text-blue-400 font-medium mb-3">{t("about.email_label")}</h4>
                <p className="text-gray-300 truncate">info@quirxkaan.com</p>
              </div>
              <div>
                <h4 className="text-blue-400 font-medium mb-3">{t("about.specialization_label")}</h4>
                <p className="text-gray-300">Full Stack Developer</p>
              </div>
            </div>
            
            <div className="flex gap-4 mt-8">
              <Link href="/contact" className="btn-primary">
                {t("about.hire_me")}
              </Link>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-outline">
                {t("about.download_cv")}
              </a>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">{t("about.experience")}</h3>
            <div className="space-y-8">
              {experienceData.map((item) => (
                <div key={item.id} className="card relative border-l-4 border-blue-500 pl-6">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-6"></div>
                  <h4 className="text-lg font-medium text-white">{item.title}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-blue-400">{item.company}</p>
                    <span className="text-gray-500 text-sm">{item.period}</span>
                  </div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-white">{t("about.education")}</h3>
            <div className="space-y-8">
              {educationData.map((item) => (
                <div key={item.id} className="card relative border-l-4 border-blue-500 pl-6">
                  <div className="absolute w-3 h-3 bg-blue-500 rounded-full -left-[6.5px] top-6"></div>
                  <h4 className="text-lg font-medium text-white">{item.degree}</h4>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-blue-400">{item.school}</p>
                    <span className="text-gray-500 text-sm">{item.period}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;