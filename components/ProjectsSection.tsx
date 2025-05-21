"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";

const ProjectsSection = () => {
  const { t } = useLanguage();

  const projectsData = [
    {
      id: 1,
      title: "E-Ticaret Platformu",
      description: "Modern arayüzlü, tam kapsamlı e-ticaret çözümü. Next.js, Tailwind CSS ve Stripe entegrasyonu.",
      image: "https://placehold.co/800x400/3498db/FFFFFF/png?text=E-Ticaret+Platformu",
      tags: ["Next.js", "React", "Tailwind CSS", "Stripe", "MongoDB"],
      githubUrl: "https://github.com/quirxsama/ecommerce-platform",
      liveUrl: "/#",
    },
    {
      id: 2,
      title: "Finans Yönetim Uygulaması",
      description: "Kişisel ve kurumsal finansal yönetim sağlayan web uygulaması. Bütçe takibi, yatırım analizi ve raporlama özellikleri.",
      image: "https://placehold.co/800x400/27ae60/FFFFFF/png?text=Finans+Yonetim+Uygulamasi",
      tags: ["React", "TypeScript", "Chart.js", "Firebase", "Redux"],
      githubUrl: "https://github.com/quirxsama/finance-tracker",
      liveUrl: "/#",
    },
    {
      id: 3,
      title: "AI Destekli İçerik Yönetimi",
      description: "Yapay zeka ile içerik oluşturma ve düzenleme platformu. OpenAI API entegrasyonu ile otomatik içerik üretimi.",
      image: "https://placehold.co/800x400/9b59b6/FFFFFF/png?text=AI+Destekli+Icerik+Yonetimi",
      tags: ["Vue.js", "Node.js", "OpenAI", "Express", "PostgreSQL"],
      githubUrl: "https://github.com/quirxsama/ai-content-platform",
      liveUrl: "/#",
    },
  ];

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section id="projects" className="section bg-slate-900/50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t("projects.title")}
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
            {t("projects.description")}
          </motion.p>
        </div>

        <motion.div 
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projectsData.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="card group hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-blue-900/10 transition-all z-10"></div>
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="transition-transform duration-500 group-hover:scale-110 object-cover"
                />
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
              <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs bg-blue-900/30 text-blue-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-between mt-auto pt-4 border-t border-slate-700/50">
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                  aria-label={`GitHub: ${project.title}`}
                >
                  <FaGithub className="mr-2" />
                  <span>Repo</span>
                </a>
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label={`Live Demo: ${project.title}`}
                >
                  <span>Demo</span>
                  <FaExternalLinkAlt className="ml-2 text-sm" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="text-center mt-12">
          <a
            href="https://github.com/quirxsama"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline inline-flex items-center"
          >
            <FaGithub className="mr-2" />
            {t("projects.view_more")}
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection; 