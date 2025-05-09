"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { 
  FaReact, FaNodeJs, FaJs, FaHtml5, FaCss3Alt, FaGitAlt, 
  FaDocker, FaDatabase, FaFigma 
} from "react-icons/fa";
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb, 
  SiPostgresql, SiRedux, SiFirebase, SiAdobephotoshop, SiAdobexd 
} from "react-icons/si";

const SkillsSection = () => {
  const { t } = useLanguage();

  const skillCategories = [
    {
      id: "frontend",
      title: t("skills.frontend"),
      skills: [
        { name: "React", icon: <FaReact className="w-8 h-8 text-blue-400" />, level: 90 },
        { name: "Next.js", icon: <SiNextdotjs className="w-7 h-7" />, level: 85 },
        { name: "TypeScript", icon: <SiTypescript className="w-7 h-7 text-blue-600" />, level: 80 },
        { name: "JavaScript", icon: <FaJs className="w-7 h-7 text-yellow-400" />, level: 95 },
        { name: "HTML5", icon: <FaHtml5 className="w-7 h-7 text-orange-500" />, level: 95 },
        { name: "CSS3", icon: <FaCss3Alt className="w-7 h-7 text-blue-500" />, level: 90 },
        { name: "Tailwind CSS", icon: <SiTailwindcss className="w-7 h-7 text-cyan-400" />, level: 90 },
        { name: "Redux", icon: <SiRedux className="w-7 h-7 text-blue-500" />, level: 85 },
      ],
    },
    {
      id: "backend",
      title: t("skills.backend"),
      skills: [
        { name: "Node.js", icon: <FaNodeJs className="w-7 h-7 text-green-500" />, level: 85 },
        { name: "MongoDB", icon: <SiMongodb className="w-7 h-7 text-green-400" />, level: 80 },
        { name: "PostgreSQL", icon: <SiPostgresql className="w-7 h-7 text-blue-400" />, level: 75 },
        { name: "Firebase", icon: <SiFirebase className="w-7 h-7 text-yellow-500" />, level: 85 },
        { name: "REST API", icon: <FaDatabase className="w-7 h-7 text-gray-400" />, level: 90 },
      ],
    },
    {
      id: "tools",
      title: t("skills.tools"),
      skills: [
        { name: "Git", icon: <FaGitAlt className="w-7 h-7 text-orange-600" />, level: 90 },
        { name: "Docker", icon: <FaDocker className="w-7 h-7 text-blue-500" />, level: 70 },
        { name: "Figma", icon: <FaFigma className="w-7 h-7 text-blue-400" />, level: 85 },
        { name: "Photoshop", icon: <SiAdobephotoshop className="w-7 h-7 text-blue-600" />, level: 80 },
        { name: "Adobe XD", icon: <SiAdobexd className="w-7 h-7 text-pink-600" />, level: 75 },
      ],
    },
  ];

  return (
    <section id="skills" className="section">
      <div className="container-custom">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            {t("skills.title")}
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
            {t("skills.description")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card"
            >
              <h3 className="text-xl font-semibold mb-6 text-center text-blue-400">
                {category.title}
              </h3>
              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {skill.icon}
                        <span className="ml-3 text-sm text-gray-300">{skill.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: 0.1 * index }}
                        className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 