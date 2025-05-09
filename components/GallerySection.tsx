"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaPlay, FaPause, FaTimes } from "react-icons/fa";

interface GalleryItem {
  type: "image" | "video";
  src: string;
  alt?: string;
  caption: string;
}

const galleryItems: GalleryItem[] = [
  { type: "image", src: "https://placehold.co/600x600/3498db/FFFFFF/png?text=Kedim+Pamuk", alt: "Kedim", caption: "Kedim Pamuk 🐱" },
  { type: "image", src: "https://placehold.co/600x600/e74c3c/FFFFFF/png?text=DBD+Birak", alt: "DBD Bırak", caption: "DBD Bırak!" },
  { type: "image", src: "https://placehold.co/600x600/f39c12/FFFFFF/png?text=Messi", alt: "Messi", caption: "Messi" },
  { type: "image", src: "https://placehold.co/600x600/27ae60/FFFFFF/png?text=Yaptiysa+Adamin+Dibidir", alt: "Yaptıysa adamın dibidir", caption: "Yaptıysa adamın dibidir." },
  { type: "image", src: "https://placehold.co/600x600/9b59b6/FFFFFF/png?text=Galeri+Resim+5", alt: "Galeri Resim 5", caption: "Galeri Resim 5" },
  { type: "image", src: "https://placehold.co/600x600/1abc9c/FFFFFF/png?text=Galeri+Resim+6", alt: "Galeri Resim 6", caption: "Galeri Resim 6" },
  { type: "image", src: "https://placehold.co/600x340/e67e22/FFFFFF/png?text=Video+1", caption: "Video 1" },
  { type: "image", src: "https://placehold.co/600x340/2c3e50/FFFFFF/png?text=Video+2", caption: "Video 2" },
  { type: "image", src: "https://placehold.co/600x340/2980b9/FFFFFF/png?text=Video+3", caption: "Video 3" },
  { type: "image", src: "https://placehold.co/600x340/c0392b/FFFFFF/png?text=Video+4", caption: "Video 4" },
  { type: "image", src: "https://placehold.co/600x340/16a085/FFFFFF/png?text=Video+5", caption: "Video 5" },
  { type: "image", src: "https://placehold.co/600x340/8e44ad/FFFFFF/png?text=Video+6", caption: "Video 6" }
];

const GallerySection = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoThumbnails, setVideoThumbnails] = useState<{ [key: string]: string }>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const thumbnailVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const generateThumbnail = async (videoSrc: string) => {
      const video = document.createElement('video');
      video.src = videoSrc;
      
      return new Promise<string>((resolve) => {
        video.addEventListener('loadeddata', () => {
          video.currentTime = 1;
        });
        
        video.addEventListener('seeked', () => {
          const canvas = document.createElement('canvas');
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL());
        });
      });
    };

    const loadThumbnails = async () => {
      const thumbnails: { [key: string]: string } = {};
      for (const item of galleryItems) {
        if (item.type === 'video') {
          thumbnails[item.src] = await generateThumbnail(item.src);
        }
      }
      setVideoThumbnails(thumbnails);
    };

    loadThumbnails();
  }, []);

  const handleItemClick = (index: number) => {
    setSelectedItem(index);
    setIsPlaying(false);
  };

  const handleClose = () => {
    setSelectedItem(null);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {galleryItems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleItemClick(index)}
            className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
          >
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
            <Image
              src={item.src}
              alt={item.alt || item.caption}
              fill
              className="object-cover transition-transform group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 left-4 text-white font-medium z-20"
            >
              {item.caption}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedItem !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white hover:text-blue-400 transition-colors"
            >
              <FaTimes size={24} />
            </button>

            <div className="relative max-w-6xl w-full max-h-[80vh] rounded-xl overflow-hidden">
              <Image
                src={galleryItems[selectedItem].src}
                alt={galleryItems[selectedItem].alt || galleryItems[selectedItem].caption}
                width={1200}
                height={800}
                className="object-contain w-full h-full"
              />
              <p className="text-white text-center mt-4">{galleryItems[selectedItem].caption}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GallerySection; 