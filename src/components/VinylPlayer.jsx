import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import coverLetItHappen from '../assets/covers/let it happen.webp';
import coverChicago     from '../assets/covers/chicago.webp';
import coverKangna      from '../assets/covers/Kangna.webp';
import coverGodsplan    from '../assets/covers/gods plan.webp';

import audioLetItHappen from '../assets/music/Let It Happen.mp3';
import audioChicago     from '../assets/music/Chicago.mp3';
import audioKangna      from '../assets/music/Kangna.mp3';
import audioGodsplan    from "../assets/music/God's Plan.mp3";

const tracks = [
  { id:0, title:'Let It Happen', artist:'Tame Impala',
    disc:'TI', discBg:'#c9b96a', discFg:'#0a0a0a',
    audioSrc: audioLetItHappen, cover: coverLetItHappen },

  { id:1, title:'Chicago', artist:'Michael Jackson',
    disc:'MJ', discBg:'#1a1a2e', discFg:'#7ec8e3',
    audioSrc: audioChicago, cover: coverChicago },

  { id:2, title:'Kangna', artist:'Jazzy B',
    disc:'JB', discBg:'#2e1a1a', discFg:'#e37e7e',
    audioSrc: audioKangna, cover: coverKangna },

  { id:3, title:"God's Plan", artist:'Drake',
    disc:'DR', discBg:'#1a2e1a', discFg:'#7ee37e',
    audioSrc: audioGodsplan, cover: coverGodsplan },

  { id:4, title:'Coming Soon', artist:'— TBD —',
    disc:'?',  discBg:'#2a1a2e', discFg:'#c87ee3',
    audioSrc: null, cover: null },
];

export default function VinylPlayer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = () => setIsDrawerOpen(p => !p);

  const stopTrack = () => {
    setIsPlaying(false);
    setActiveTrack(null);
  };

  const handleHousingClick = () => {
    if (isPlaying) {
      stopTrack();
    } else {
      toggleDrawer();
    }
  };

  const handleDragStart = (e, trackId) => {
    e.dataTransfer.setData('text/plain', String(trackId));
    e.currentTarget.style.opacity = '0.4';
    e.currentTarget.style.cursor = 'grabbing';
  };

  const handleDragEnd = (e) => {
    e.currentTarget.style.opacity = '1';
    e.currentTarget.style.cursor = 'grab';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const trackId = Number(e.dataTransfer.getData('text/plain'));
    const pickedTrack = tracks.find(t => t.id === trackId);
    
    setIsDragOver(false);
    if (!pickedTrack) return;
    
    setActiveTrack(pickedTrack);
    setIsPlaying(Boolean(pickedTrack.audioSrc));
    setIsDrawerOpen(false);
  };

  const handleTap = (track) => {
    if (!track.audioSrc) return;
    setActiveTrack(track);
    setIsPlaying(true);
    setIsDrawerOpen(false); 
  };

  return (
    <>
      <style>{`
        @keyframes spin {
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .vinyl-draggable {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .vinyl-draggable:hover {
          transform: scale(1.06);
          box-shadow: 0 0 0 2px #c9b96a;
        }
        /* Custom Scrollbar for the Drawer to make it obvious on mobile */
        .crate-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .crate-scroll::-webkit-scrollbar-track {
          background: #111;
          border-radius: 4px;
        }
        .crate-scroll::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .crate-scroll::-webkit-scrollbar-thumb:hover {
          background: #d4c97a;
        }
      `}</style>

      {/* The Turntable Widget */}
      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          right: '-20px',
          zIndex: 20,
          width: '110px',
          height: '110px',
          background: '#0d0d0d',
          border: '2px solid #2a2a2a',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={handleHousingClick}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '82px',
            height: '82
