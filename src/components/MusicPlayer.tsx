"use client";

import Logger from "@/lib/logger";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaMusic, FaPause, FaPlay, FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const PLAYLIST = [
  {
    title: "Chill Vibes",
    artist: "Chill",
    url: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3",
  },
  {
    title: "Creative Focus",
    artist: "Ambient",
    url: "/music.mp3",
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => Logger.info("Autoplay prevented:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
        if (audio.duration) {
            setProgress((audio.currentTime / audio.duration) * 100);
        }
    };

    const handleEnded = () => {
        handleNext();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("ended", handleEnded);
    };
  }, []);


  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + PLAYLIST.length) % PLAYLIST.length);
    setProgress(0);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end gap-2">
      <audio 
        ref={audioRef}
        src={currentTrack.url}
      />

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ width: 0, opacity: 0, x: -20 }}
            animate={{ width: "auto", opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -20 }}
            className="flex items-center gap-4 bg-[#0a0a0f]/90 backdrop-blur-xl border border-primary/20 p-4 rounded-2xl shadow-2xl shadow-primary/10 overflow-hidden min-w-[280px]"
          >
            {/* Album Art / Visualizer Placeholder */}
            <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center shrink-0 overflow-hidden">
                {isPlaying ? (
                    <div className="flex items-end gap-1 h-6">
                        <motion.div 
                            animate={{ height: ["20%", "80%", "40%"] }} 
                            transition={{ repeat: Infinity, duration: 0.5 }} 
                            className="w-1 bg-white" 
                        />
                        <motion.div 
                            animate={{ height: ["40%", "100%", "20%"] }} 
                            transition={{ repeat: Infinity, duration: 0.7 }} 
                            className="w-1 bg-white" 
                        />
                        <motion.div 
                            animate={{ height: ["30%", "60%", "30%"] }} 
                            transition={{ repeat: Infinity, duration: 0.6 }} 
                            className="w-1 bg-white" 
                        />
                    </div>
                ) : (
                    <FaMusic className="text-white text-xl" />
                )}
            </div>

            {/* Info & Controls */}
            <div className="flex flex-col flex-grow min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <div className="truncate pr-4">
                        <h4 className="text-sm font-bold text-white truncate">{currentTrack.title}</h4>
                        <p className="text-xs text-white/50 truncate">{currentTrack.artist}</p>
                    </div>
                    {/* Progress Bar (Visual only for now) */}
                    <div className="w-full absolute bottom-0 left-0 h-1 bg-white/10">
                        <motion.div 
                            className="h-full bg-primary"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
                
                <div className="flex items-center gap-3">
                    <button onClick={handlePrev} className="text-white/60 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
                    </button>
                    <button 
                        onClick={togglePlay}
                        className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/30"
                    >
                        {isPlaying ? <FaPause className="text-xs" /> : <FaPlay className="text-xs ml-0.5" />}
                    </button>
                    <button onClick={handleNext} className="text-white/60 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
                    </button>
                    
                    <div className="w-px h-4 bg-white/10 mx-1" />
                    
                    <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
                        {isMuted ? <FaVolumeMute className="text-xs" /> : <FaVolumeUp className="text-xs" />}
                    </button>
                </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg border border-white/10 transition-all duration-300 hover:scale-110 z-50 ${isExpanded ? 'bg-primary text-white' : 'bg-[#0a0a0f]/80 text-primary backdrop-blur-md'}`}
      >
        <FaMusic className={`text-xl ${isPlaying ? 'animate-pulse' : ''}`} />
      </button>
    </div>
  );
}
