"use client";

import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import AboutSection from "@/components/AboutSection";

export default function About() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <AboutSection />
    </main>
  );
} 