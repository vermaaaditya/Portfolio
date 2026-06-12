import { useMemo, useState } from 'react';

const tracks = [
  {
    id: 0,
    title: 'Let It Happen',
    artist: 'Tame Impala',
    disc: 'TI',
    discBg: '#c9b96a',
    discFg: '#0a0a0a',
    spotifyId: '2X485T9Z5Ly0xyaghN73ed',
    cover: '/assets/let it happen.webp',
  },
  {
    id: 1,
    title: 'Chicago',
    artist: 'Michael Jackson',
    disc: 'MJ',
    discBg: '#1a1a2e',
    discFg: '#7ec8e3',
    spotifyId: '6pknqMFPAqKXBWBRvQpyLQ',
    cover: '/assets/chicago.webp',
  },
  {
    id: 2,
    title: 'Kangna',
    artist: 'Jazzy B',
    disc: 'JB',
    discBg: '#2e1a1a',
    discFg: '#e37e7e',
    spotifyId: '3NMp3HKMHgMwMiHBqPeXP8',
    cover: '/assets/Kangna.webp',
  },
  {
    id: 3,
    title: "God's Plan",
    artist: 'Drake',
    disc: 'DR',
    discBg: '#1a2e1a',
    discFg: '#7ee37e',
    spotifyId: '6DCZcSspjsKoFjzjrWbOan',
    cover: '/assets/gods plan.webp',
  },
  {
    id: 4,
    title: 'Coming Soon',
    artist: '— TBD —',
    disc: '?',
    discBg: '#2a1a2e',
    discFg: '#c87ee3',
    spotifyId: null,
    cover: null,
  },
];

export default function VinylPlayer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const spotifySrc = useMemo(() => {
    if (!isPlaying || !activeTrack?.spotifyId) return '';
    return `https://open.spotify.com/embed/track/${activeTrack.spotifyId}?utm_source=oembed`;
  }, [activeTrack, isPlaying]);

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  const handleDragStart = (event, trackId) => {
    event.dataTransfer.setData('text/plain', String(trackId));
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.classList.add('dragging');
  };

  const handleDragEnd = (event) => {
    event.currentTarget.classList.remove('dragging');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const trackId = Number(event.dataTransfer.getData('text/plain'));
    const pickedTrack = tracks.find((track) => track.id === trackId);

    setIsDragOver(false);

    if (!pickedTrack) return;

    setActiveTrack(pickedTrack);
    setIsPlaying(Boolean(pickedTrack.spotifyId));
    setIsDrawerOpen(false);
  };

  return (
    <>
      <style>{`
        @keyframes vinylSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      {isDrawerOpen && (
        <div
          role="button"
          tabIndex={0}
          aria-label="Close record drawer overlay"
          onClick={() => setIsDrawerOpen(false)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setIsDrawerOpen(false);
            }
          }}
          className="fixed inset-0"
          style={{ background: 'rgba(0, 0, 0, 0.6)', zIndex: 98 }}
        />
      )}

      <button
        type="button"
        aria-label="Toggle record drawer"
        onClick={toggleDrawer}
        className="fixed left-0 top-1/2 flex items-center justify-center"
        style={{
          width: '28px',
          height: '120px',
          transform: 'translateY(-50%)',
          background: '#111',
          borderTop: '1.5px solid #c9b96a',
          borderRight: '1.5px solid #c9b96a',
          borderBottom: '1.5px solid #c9b96a',
          borderLeft: 'none',
          borderRadius: '0 4px 4px 0',
          zIndex: 100,
        }}
      >
        <span
          style={{
            color: '#c9b96a',
            fontSize: '9px',
            letterSpacing: '0.15em',
            fontFamily: "'Space Mono', monospace",
            transform: 'rotate(90deg)',
            whiteSpace: 'nowrap',
          }}
        >
          // CRATE
        </span>
      </button>

      <div
        className="fixed top-0 left-0 flex h-screen"
        style={{
          width: '40vw',
          height: '100vh',
          background: '#0d0d0d',
          borderRight: '2px solid #c9b96a',
          transform: isDrawerOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          zIndex: 99,
        }}
      >
        <div className="flex h-full w-full flex-col font-['Space_Mono',monospace]">
          <div className="px-8 pt-8 pb-4">
            <div
              style={{
                color: '#444',
                fontSize: '10px',
                letterSpacing: '0.2em',
              }}
            >
              // RECORD CRATE
            </div>
            <div className="mt-2 min-h-[16px] text-[12px] text-[#c9b96a]">{isPlaying && activeTrack ? activeTrack.title : ''}</div>
          </div>

          <div className="terminal-scrollbar flex-1 overflow-y-auto">
            {tracks.map((track) => (
              <div
                key={track.id}
                draggable={true}
                onDragStart={(event) => handleDragStart(event, track.id)}
                onDragEnd={handleDragEnd}
                className="vinyl-record-item flex w-full cursor-grab items-center px-6 py-4 active:cursor-grabbing"
                style={{
                  borderBottom: '1px solid #1a1a1a',
                }}
              >
                {track.cover ? (
                  <img
                    src={track.cover}
                    alt={`${track.title} cover`}
                    className="h-12 w-12 shrink-0 object-cover"
                    style={{ border: '1.5px solid #2a2a2a' }}
                  />
                ) : (
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center text-[12px] font-bold"
                    style={{
                      background: track.discBg,
                      color: track.discFg,
                      border: '1.5px solid #2a2a2a',
                    }}
                  >
                    {track.disc}
                  </div>
                )}

                <div className="ml-4 min-w-0 flex-1">
                  <div className="truncate text-[13px] font-bold leading-tight text-[#ddd]">{track.title}</div>
                  <div className="truncate text-[11px] leading-tight text-[#666]">{track.artist}</div>
                </div>

                <div className="ml-2 text-[18px] text-[#333]">⠿</div>
              </div>
            ))}
          </div>

          <div className="px-8 py-6">
            <div
              style={{
                color: '#333',
                fontSize: '10px',
                letterSpacing: '0.12em',
              }}
            >
              drag a record onto the turntable
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-40 pointer-events-none font-['Space_Mono',monospace]">
        <div className="absolute -bottom-[14px] -right-[14px] pointer-events-auto">
          <div
            id="path-about"
            className="relative"
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              border: '2px solid #c9b96a',
              background: '#111',
            }}
          >
            <div
              className="absolute inset-[5px]"
              style={{
                borderRadius: '50%',
                animation: isPlaying ? 'vinylSpin 1.8s linear infinite' : 'none',
              }}
            >
              <svg viewBox="0 0 44 44" className="w-full h-full" aria-hidden="true">
                <circle cx="22" cy="22" r="21" fill="#0a0a0a" />
                <circle cx="22" cy="22" r="17" fill="none" stroke="#121212" strokeWidth="1.2" />
                <circle cx="22" cy="22" r="13" fill="none" stroke="#191919" strokeWidth="1.2" />
                <circle cx="22" cy="22" r="9" fill="none" stroke="#202020" strokeWidth="1.2" />
              </svg>
            </div>

            <div
              className="absolute left-1/2 top-1/2 flex items-center justify-center overflow-hidden"
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#111',
                border: '1px solid #2a2a2a',
              }}
            >
              {activeTrack?.cover ? (
                <img
                  src={activeTrack.cover}
                  alt={`${activeTrack.title} cover art`}
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    opacity: activeTrack?.cover ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              ) : (
                <span className="text-[6px] font-bold text-[#c9b96a]">AV</span>
              )}
            </div>

            <div
              className="absolute"
              style={{
                right: '-2px',
                top: '-8px',
                width: '2px',
                height: '30px',
                background: '#c9b96a',
                transformOrigin: 'top center',
                transform: `rotate(${isPlaying ? 26 : 16}deg)`,
                transition: 'transform 220ms ease',
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '4px solid transparent',
                  borderRight: '4px solid transparent',
                  borderTop: '6px solid #c9b96a',
                  position: 'absolute',
                  left: '-3px',
                  bottom: '-6px',
                }}
              />
            </div>

            <div
              role="button"
              tabIndex={0}
              aria-label="Vinyl turntable"
              onClick={toggleDrawer}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  toggleDrawer();
                }
              }}
              className="absolute inset-0 z-10"
              style={{
                borderRadius: '50%',
                background: isDragOver ? 'rgba(201, 185, 106, 0.1)' : 'transparent',
              }}
            />
          </div>
        </div>

        {spotifySrc && (
          <iframe
            title="Spotify Vinyl Player"
            src={spotifySrc}
            style={{
              width: 1,
              height: 1,
              border: 0,
              opacity: 0,
              position: 'fixed',
              left: 0,
              bottom: 0,
              pointerEvents: 'none',
            }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        )}
      </div>

      <style>{`
        .dragging {
          opacity: 0.35;
        }

        .vinyl-record-item:hover {
          background: #161616;
          border-left: 3px solid #c9b96a;
        }
      `}</style>
    </>
  );
}
