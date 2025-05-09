"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Language = "tr" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    // Navbar
    "nav.home": "Ana Sayfa",
    "nav.about": "Hakkımda",
    "nav.projects": "Projeler",
    "nav.skills": "Yetenekler",
    "nav.contact": "İletişim",
    "nav.resume": "Özgeçmiş",
    
    // Hero
    "hero.greeting": "Merhaba, ben",
    "hero.name": "Merhaba, ben",
    "hero.title": "Full Stack Developer & UI/UX Designer",
    "hero.description": "Modern ve kullanıcı dostu web uygulamaları ile dijital çözümler sunuyorum. Kullanıcı deneyimini ön planda tutarak yenilikçi projeler geliştiriyorum.",
    "hero.contact": "İletişime Geç",
    "hero.projects": "Projelerimi Gör",
    
    // About
    "about.title": "Hakkımda",
    "about.subtitle": "Yeteneklerimi ve deneyimlerimi keşfedin",
    "about.hello": "Merhaba!",
    "about.description_1": "Full Stack Developer ve UI/UX Designer olarak 7+ yıllık tecrübeye sahibim. Kullanıcı odaklı ve modern teknolojilerle güçlendirilmiş projeler geliştirmekteyim.",
    "about.description_2": "Çalıştığım projelerde performans, erişilebilirlik ve kullanıcı deneyimi konularına özel önem veriyorum. Her projeyi bir sanat eseri olarak görüyor ve teknik mükemmeliyeti hedefliyorum.",
    "about.name_label": "İsim",
    "about.location_label": "Konum",
    "about.email_label": "E-posta",
    "about.specialization_label": "Uzmanlık",
    "about.hire_me": "Benimle Çalışın",
    "about.download_cv": "CV İndir",
    "about.years_experience": "Yıl Deneyim",
    "about.experience": "Deneyim",
    "about.education": "Eğitim",
    
    // Projects
    "projects.title": "Projelerim",
    "projects.description": "Öne çıkan projelerimden bazıları. Her proje kendine özgü zorluklar ve çözümler içerir.",
    "projects.view_more": "Daha Fazla Proje",
    
    // Skills
    "skills.title": "Yeteneklerim",
    "skills.description": "Teknik becerilerim ve uzmanlaştığım alanlar",
    "skills.frontend": "Frontend Geliştirme",
    "skills.backend": "Backend Geliştirme",
    "skills.tools": "Araçlar & Tasarım",
    
    // Contact
    "contact.title": "İletişim",
    "contact.description": "Projeleriniz için benimle iletişime geçebilirsiniz",
    "contact.info": "İletişim Bilgileri",
    "contact.email": "E-posta",
    "contact.location": "Konum",
    "contact.phone": "Telefon",
    "contact.social": "Sosyal Medya",
    "contact.form_title": "Mesaj Gönder",
    "contact.name": "Adınız",
    "contact.email_label": "E-posta Adresiniz",
    "contact.subject": "Konu",
    "contact.message": "Mesajınız",
    "contact.send": "Gönder",
    "contact.success": "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.",
    "contact.send_another": "Başka Mesaj Gönder",
    "contact.error": "Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.",
    
    // Footer
    "footer.description": "Full Stack Developer ve UI/UX Designer olarak modern web teknolojileri ile etkileyici dijital ürünler geliştiriyorum.",
    "footer.links": "Hızlı Linkler",
    "footer.contact_info": "İletişim",
    "footer.rights": "Tüm Hakları Saklıdır",
    "footer.made_with": "Sevgiyle",
    "footer.by": "tarafından",
    "footer.home": "Ana Sayfa",
    "footer.about": "Hakkımda",
    "footer.projects": "Projeler",
    "footer.skills": "Yetenekler",
    "footer.contact": "İletişim"
  },
  en: {
    // Navbar
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.skills": "Skills",
    "nav.contact": "Contact",
    "nav.resume": "Resume",
    
    // Hero
    "hero.greeting": "Hello, I'm",
    "hero.name": "Hello, I'm",
    "hero.title": "Full Stack Developer & UI/UX Designer",
    "hero.description": "I provide digital solutions with modern and user-friendly web applications. I develop innovative projects with a focus on user experience.",
    "hero.contact": "Contact Me",
    "hero.projects": "View Projects",
    
    // About
    "about.title": "About Me",
    "about.subtitle": "Discover my skills and experience",
    "about.hello": "Hello!",
    "about.description_1": "I have 7+ years of experience as a Full Stack Developer and UI/UX Designer. I develop user-focused projects powered by modern technologies.",
    "about.description_2": "In my projects, I place special emphasis on performance, accessibility, and user experience. I see each project as a work of art and aim for technical excellence.",
    "about.name_label": "Name",
    "about.location_label": "Location",
    "about.email_label": "Email",
    "about.specialization_label": "Specialization",
    "about.hire_me": "Hire Me",
    "about.download_cv": "Download CV",
    "about.years_experience": "Years Experience",
    "about.experience": "Experience",
    "about.education": "Education",
    
    // Projects
    "projects.title": "My Projects",
    "projects.description": "Some of my featured projects. Each project contains unique challenges and solutions.",
    "projects.view_more": "More Projects",
    
    // Skills
    "skills.title": "My Skills",
    "skills.description": "My technical skills and areas of expertise",
    "skills.frontend": "Frontend Development",
    "skills.backend": "Backend Development",
    "skills.tools": "Tools & Design",
    
    // Contact
    "contact.title": "Contact",
    "contact.description": "You can contact me for your projects",
    "contact.info": "Contact Information",
    "contact.email": "Email",
    "contact.location": "Location",
    "contact.phone": "Phone",
    "contact.social": "Social Media",
    "contact.form_title": "Send Message",
    "contact.name": "Your Name",
    "contact.email_label": "Your Email",
    "contact.subject": "Subject",
    "contact.message": "Your Message",
    "contact.send": "Send Message",
    "contact.success": "Your message has been sent successfully! I'll get back to you as soon as possible.",
    "contact.send_another": "Send Another Message",
    "contact.error": "An error occurred while sending the message. Please try again.",
    
    // Footer
    "footer.description": "As a Full Stack Developer and UI/UX Designer, I develop impressive digital products with modern web technologies.",
    "footer.links": "Quick Links",
    "footer.contact_info": "Contact",
    "footer.rights": "All Rights Reserved",
    "footer.made_with": "Made with",
    "footer.by": "by",
    "footer.home": "Home",
    "footer.about": "About",
    "footer.projects": "Projects",
    "footer.skills": "Skills",
    "footer.contact": "Contact"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  const [language, setLanguage] = useState<Language>("tr");

  useEffect(() => {
    setIsClient(true);
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang && (savedLang === "tr" || savedLang === "en")) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    if (isClient) {
      setLanguage(lang);
      localStorage.setItem("language", lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["tr"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}; 