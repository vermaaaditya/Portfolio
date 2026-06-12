import React, { useMemo, useState, useEffect, useRef } from 'react';
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

  const [popupMessage, setPopupMessage] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

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
        {/* The Platter */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '82px',
            height: '82px',
            borderRadius: '50%',
            background: `radial-gradient(circle,
              #0a0a0a 0%, #0a0a0a 12%,
              #1e1e1e 12%, #1e1e1e 16%,
              #141414 16%, #141414 22%,
              #1e1e1e 22%, #1e1e1e 26%,
              #141414 26%, #141414 32%,
              #1e1e1e 32%, #1e1e1e 36%,
              #141414 36%, #141414 42%,
              #1e1e1e 42%, #1e1e1e 46%,
              #0a0a0a 46%, #0a0a0a 100%
            )`,
            border: '1px solid #333',
            transform: 'translate(-50%, -50%)',
            animation: isPlaying ? 'spin 2s linear infinite' : 'none'
          }}
        >
          {/* Platter Center Label */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: '#111',
              border: '1px solid #2a2a2a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              transition: 'opacity 0.3s'
            }}
          >
            {isPlaying && activeTrack?.cover ? (
              <img
                src={activeTrack.cover}
                alt="cover"
                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <span style={{ color: '#c9b96a', fontSize: '8px', fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>AV</span>
            )}
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={(e) => { e.stopPropagation(); }}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '82px',
            height: '82px',
            borderRadius: '50%',
            zIndex: 25,
            background: isDragOver ? 'rgba(255, 255, 255, 0.1)' : 'transparent'
          }}
        />

        {/* The Tonearm */}
        <div style={{ position: 'absolute', top: '8px', right: '10px', width: '12px', height: '12px', background: '#555', border: '1px solid #888', borderRadius: '50%', zIndex: 26 }} />
        <div
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '3px',
            height: '52px',
            background: '#999',
            borderRadius: '2px',
            transformOrigin: 'top center',
            transform: isPlaying ? 'rotate(-10deg)' : 'rotate(-25deg)',
            transition: 'transform 0.6s ease',
            zIndex: 26
          }}
        >
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '8px',
              height: '8px',
              background: '#c9b96a',
              borderRadius: '50%'
            }}
          />
        </div>

        {/* Eject Button */}
        {isPlaying && (
          <button
            onClick={(e) => { e.stopPropagation(); stopTrack(); }}
            style={{
              position: 'absolute',
              bottom: '6px',
              right: '6px',
              width: '22px',
              height: '22px',
              background: '#111',
              border: '1px solid #2a2a2a',
              color: '#666',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 30,
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#c9b96a'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#666'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 20l16 0" />
              <path d="M12 14l0 -10" />
              <path d="M12 14l4 -4" />
              <path d="M12 14l-4 -4" />
            </svg>
          </button>
        )}
      </div>

      {/* The Handle / Tab */}
      <div
        onClick={toggleDrawer}
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '160px',
          height: '28px',
          background: '#111',
          border: '1.5px solid #c9b96a',
          borderBottom: 'none',
          borderRadius: '4px 4px 0 0',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: '#c9b96a',
          fontSize: '9px',
          letterSpacing: '0.15em',
          fontFamily: "'Space Mono', monospace"
        }}
      >
        // CRATE
      </div>

      {/* The Drawer Panel */}
      {mounted && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            width: '100vw', 
            height: '220px',
            background: '#0d0d0d',
            borderTop: '2px solid #c9b96a',
            borderRight: '2px solid #c9b96a',
            zIndex: 99,
            transform: isDrawerOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            padding: '1rem 2rem',
            gap: '2.5rem',
            fontFamily: "'Space Mono', monospace",
            boxSizing: 'border-box'
          }}
        >
          {/* Left Section */}
          <div style={{ flexShrink: 0 }}>
            <div style={{ color: '#444', fontSize: '10px', letterSpacing: '0.2em', marginBottom: '0.5rem' }}>
              // RECORD CRATE
            </div>
            {isPlaying && activeTrack ? (
              <div style={{ color: '#c9b96a', fontSize: '11px', fontWeight: 700 }}>
                {activeTrack.title} — {activeTrack.artist}
              </div>
            ) : (
              <div style={{ color: '#333', fontSize: '11px', fontWeight: 700 }}>
                — IDLE —
              </div>
            )}
          </div>

          {/* Center Section */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'row', gap: '2rem', overflowX: 'auto', padding: '0.5rem 0' }}>
            {tracks.map(track => (
              <div key={track.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, track.id)}
                  onDragEnd={handleDragEnd}
                  className="vinyl-draggable"
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: `radial-gradient(circle,
                      transparent 0%, transparent 16%,
                      #1a1a1a 16%, #1a1a1a 20%,
                      ${track.discBg} 20%, ${track.discBg} 30%,
                      #1a1a1a 30%, #1a1a1a 34%,
                      #0d0d0d 34%, #0d0d0d 38%,
                      #1a1a1a 38%, #1a1a1a 42%,
                      #0d0d0d 42%, #0d0d0d 46%,
                      #1a1a1a 46%, #1a1a1a 50%,
                      #0d0d0d 50%, #0d0d0d 100%
                    )`,
                    border: '1px solid #333',
                    cursor: 'grab',
                    position: 'relative'
                  }}
                  data-id={track.id}
                >
                  {track.cover ? (
                    <img
                      src={track.cover}
                      alt={track.title}
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: track.discFg,
                        fontSize: '14px',
                        fontWeight: 'bold'
                      }}
                    >
                      ?
                    </div>
                  )}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#999',
                    textAlign: 'center',
                    marginTop: '0.5rem',
                    maxWidth: '120px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}
                >
                  {track.title}
                </div>
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div style={{ flexShrink: 0, color: '#333', fontSize: '9px', letterSpacing: '0.12em' }}>
            drag onto turntable to play
          </div>
        </div>,
        document.body
      )}

      {/* Audio Element */}
      {isPlaying && activeTrack?.audioSrc && (
        <audio
          autoPlay
          src={activeTrack.audioSrc}
          onEnded={stopTrack}
          style={{ display: 'none' }}
        />
      )}
    </>
  );
}
