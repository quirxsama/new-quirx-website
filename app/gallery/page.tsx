"use client";

import { motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import GallerySection from "../../components/GallerySection";

export default function Gallery() {
  return (
    <main className="min-h-screen relative">
      <Navbar />
      <GallerySection />
    </main>
  );
} 