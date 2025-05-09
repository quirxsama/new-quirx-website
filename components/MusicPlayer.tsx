"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaPause, FaForward, FaBackward, FaVolumeUp, FaVolumeMute, FaRandom } from "react-icons/fa";

const songs = [
  {
    title: "Gül Pembe",
    artist: "Barış Manço",
    url: "/music/music1.mp3"
  },
  {
    title: "Tot Musica",
    artist: "Ado",
    url: "/music/music2.mp3"
  },
  {
    title: "Fireworks",
    artist: "Kenshi Yonezu",
    url: "/music/music3.mp3"
  }
];

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentSong, setCurrentSong] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const [volume, setVolume] = useState(1);
  const [showVolumeControl, setShowVolumeControl] = useState(false);
  const [playerExpanded, setPlayerExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
      audioRef.current.addEventListener('ended', handleSongEnd);
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(event.target as Node)) {
        setPlayerExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('ended', handleSongEnd);
      }
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSongEnd = () => {
    if (isRepeat) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (isShuffle) {
      const remainingSongs = songs.filter((_, index) => index !== currentSong);
      const randomIndex = Math.floor(Math.random() * remainingSongs.length);
      const nextSongIndex = songs.findIndex((song) => song === remainingSongs[randomIndex]);
      setCurrentSong(nextSongIndex);
      if (audioRef.current) {
        audioRef.current.load();
        if (isPlaying) {
          audioRef.current.play();
        }
      }
    } else {
      nextSong();
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number(e.target.value);
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const togglePlayerExpansion = () => {
    setPlayerExpanded(!playerExpanded);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center select-none" ref={playerRef}>
      <audio ref={audioRef} src={songs[currentSong].url} />
      {showPlaylist && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="absolute bottom-full right-0 mb-2 w-72 max-h-48 overflow-y-auto bg-black/80 backdrop-blur-lg border border-blue-500/20 rounded-lg shadow-md z-50"
        >
          <div className="p-2 space-y-1">
            {songs.map((song, index) => (
              <motion.div 
                key={index} 
                whileHover={{ scale: 1.02 }}
                className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-blue-900/20 ${currentSong === index ? 'bg-blue-900/30' : ''}`}
                onClick={() => {
                  setCurrentSong(index);
                  if (audioRef.current) {
                    audioRef.current.load();
                    if (isPlaying) {
                      audioRef.current.play();
                    }
                  }
                }}
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{song.title}</p>
                  <p className="text-xs text-blue-400">{song.artist}</p>
                </div>
                {currentSong === index && isPlaying && (
                  <div className="w-4 h-4 ml-2">
                    <motion.svg 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full text-blue-400"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" className="opacity-25" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </motion.svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
      
      <div 
        className={`relative z-0 h-16 -mb-2 transition-all duration-300 ${playerExpanded ? 'opacity-0 invisible h-0' : 'opacity-100 visible'}`}
        onClick={togglePlayerExpansion}
      >
        <svg width={128} height={128} viewBox="0 0 128 128" className="duration-500 border-4 rounded-full shadow-md border-blue-400 border-spacing-5 animate-[spin_3s_linear_infinite] transition-all cursor-pointer">
          <svg>
            <rect width={128} height={128} fill="black" />
            <circle cx={20} cy={20} r={2} fill="white" />
            <circle cx={40} cy={30} r={2} fill="white" />
            <circle cx={60} cy={10} r={2} fill="white" />
            <circle cx={80} cy={40} r={2} fill="white" />
            <circle cx={100} cy={20} r={2} fill="white" />
            <circle cx={120} cy={50} r={2} fill="white" />
            <circle cx={90} cy={30} r={10} fill="white" fillOpacity="0.5" />
            <circle cx={90} cy={30} r={8} fill="white" />
            <path d="M0 128 Q32 64 64 128 T128 128" fill="royalblue" stroke="black" strokeWidth={1} />
            <path d="M0 128 Q32 48 64 128 T128 128" fill="deepskyblue" stroke="black" strokeWidth={1} />
            <path d="M0 128 Q32 32 64 128 T128 128" fill="dodgerblue" stroke="black" strokeWidth={1} />
            <path d="M0 128 Q16 64 32 128 T64 128" fill="royalblue" stroke="black" strokeWidth={1} />
            <path d="M64 128 Q80 64 96 128 T128 128" fill="deepskyblue" stroke="black" strokeWidth={1} />
          </svg>
        </svg>
        <div className="absolute z-5 w-8 h-8 bg-blue-400 border-4 rounded-full shadow-sm border-blue-600 top-12 left-12" />
      </div>
      
      <div 
        className={`z-10 flex flex-col w-40 ${playerExpanded ? 'h-40 w-72' : 'h-20'} transition-all duration-300 bg-black/80 backdrop-blur-lg border border-blue-500/20 shadow-md rounded-2xl shadow-blue-400/20 cursor-pointer`}
        onClick={playerExpanded ? undefined : togglePlayerExpansion}
      >
        <div className={`flex flex-row w-full ${playerExpanded ? 'h-20' : 'h-0'} transition-all duration-300`}>
          <div className={`relative flex items-center justify-center w-24 h-24 ${playerExpanded ? '-top-6 -left-4 opacity-100 animate-[spin_3s_linear_infinite]' : 'opacity-0'} transition-all duration-300 z-20`}>
            <svg width={96} height={96} viewBox="0 0 128 128" className="duration-500 border-4 rounded-full shadow-md border-blue-400 border-spacing-5">
              <svg>
                <rect width={128} height={128} fill="black" />
                <circle cx={20} cy={20} r={2} fill="white" />
                <circle cx={40} cy={30} r={2} fill="white" />
                <circle cx={60} cy={10} r={2} fill="white" />
                <circle cx={80} cy={40} r={2} fill="white" />
                <circle cx={100} cy={20} r={2} fill="white" />
                <circle cx={120} cy={50} r={2} fill="white" />
                <circle cx={90} cy={30} r={10} fill="white" fillOpacity="0.5" />
                <circle cx={90} cy={30} r={8} fill="white" />
                <path d="M0 128 Q32 64 64 128 T128 128" fill="royalblue" stroke="black" strokeWidth={1} />
                <path d="M0 128 Q32 48 64 128 T128 128" fill="deepskyblue" stroke="black" strokeWidth={1} />
                <path d="M0 128 Q32 32 64 128 T128 128" fill="dodgerblue" stroke="black" strokeWidth={1} />
                <path d="M0 128 Q16 64 32 128 T64 128" fill="royalblue" stroke="black" strokeWidth={1} />
                <path d="M64 128 Q80 64 96 128 T128 128" fill="deepskyblue" stroke="black" strokeWidth={1} />
              </svg>
            </svg>
            <div className="absolute z-10 w-6 h-6 bg-blue-400 border-4 rounded-full shadow-sm border-blue-600 top-9 left-9" />
          </div>
          <div className={`flex flex-col justify-center w-full pl-3 overflow-hidden ${playerExpanded ? '-ml-3' : '-ml-24'} text-nowrap transition-all duration-300`}>
            <p className="text-xl font-bold text-white">{songs[currentSong].title}</p>
            <p className="text-blue-400">{songs[currentSong].artist}</p>
          </div>
        </div>
        <div className={`flex flex-row mx-3 mt-3 bg-blue-900/20 rounded-md min-h-4 ${playerExpanded ? 'mt-0' : ''}`}>
          <span className={`pl-3 text-sm text-blue-400 ${playerExpanded ? 'inline-block' : 'hidden'}`}>{formatTime(currentTime)}</span>
          <div className="relative flex-grow">
            <input 
              type="range" 
              min={0} 
              max={duration || 0} 
              value={currentTime}
              onChange={handleSeek}
              className={`${playerExpanded ? 'w-full' : 'w-24'} flex-grow h-1 mx-2 my-auto bg-blue-900/30 rounded-full appearance-none cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none 
                [&::-webkit-slider-thumb]:w-4 
                [&::-webkit-slider-thumb]:h-4 
                [&::-webkit-slider-thumb]:bg-gradient-to-r 
                [&::-webkit-slider-thumb]:from-blue-400 
                [&::-webkit-slider-thumb]:to-blue-600 
                [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:cursor-pointer 
                [&::-webkit-slider-thumb]:shadow-lg
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-blue-300
                [&::-webkit-slider-thumb]:transition-all
                [&::-webkit-slider-thumb]:duration-200
                [&::-webkit-slider-thumb]:hover:scale-110
                [&::-webkit-slider-thumb]:hover:shadow-blue-400/50`} 
              onClick={(e) => e.stopPropagation()}
            />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full pointer-events-none" 
              style={{ width: `${(currentTime / duration) * 100}%`, transform: 'translateY(-50%)' }}
            />
          </div>
          <span className={`pr-3 text-sm text-blue-400 ${playerExpanded ? 'inline-block' : 'hidden'}`}>{formatTime(duration)}</span>
        </div>
        <div className="flex flex-row items-center justify-center flex-grow mx-3 space-x-5" onClick={(e) => e.stopPropagation()}>
          <button 
            onClick={() => setShowPlaylist(!showPlaylist)} 
            className={`flex items-center justify-center ${playerExpanded ? 'w-12' : 'w-0'} h-full cursor-pointer transition-all duration-200 hover:text-blue-400`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <button
            onClick={() => {
              setIsShuffle(!isShuffle);
              setIsRepeat(false);
            }}
            className={`flex items-center justify-center ${playerExpanded ? 'w-12' : 'w-0'} h-full cursor-pointer transition-all duration-200 ${isShuffle ? 'text-blue-400' : 'hover:text-blue-400'}`}
          >
            <FaRandom size={18} />
          </button>
          <button onClick={prevSong} className="flex items-center justify-center w-12 h-full cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-skip-back">
              <polygon points="19 20 9 12 19 4 19 20" />
              <line x1={5} y1={19} x2={5} y2={5} />
            </svg>
          </button>
          <button onClick={togglePlay} className="flex items-center justify-center w-12 h-full cursor-pointer">
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-pause">
                <rect x={6} y={4} width={4} height={16} />
                <rect x={14} y={4} width={4} height={16} />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-play">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            )}
          </button>
          <button onClick={nextSong} className="flex items-center justify-center w-12 h-full cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-skip-forward">
              <polygon points="5 4 15 12 5 20 5 4" />
              <line x1={19} y1={5} x2={19} y2={19} />
            </svg>
          </button>
          <div className="relative">
            <button 
              onClick={() => setShowVolumeControl(!showVolumeControl)} 
              className={`flex items-center justify-center ${playerExpanded ? 'w-12' : 'w-0'} h-full cursor-pointer transition-all duration-200 hover:text-blue-400`}
            >
              {volume === 0 ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
            </button>
            {showVolumeControl && playerExpanded && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-24 h-6 bg-black/80 rounded-full mb-2 flex items-center justify-center px-2">
                <input 
                  type="range" 
                  min={0} 
                  max={1} 
                  step={0.01} 
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-full h-1 bg-blue-900/30 rounded-full appearance-none cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-3 
                    [&::-webkit-slider-thumb]:h-3 
                    [&::-webkit-slider-thumb]:bg-blue-500 
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:cursor-pointer"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer; 