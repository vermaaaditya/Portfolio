import { useMemo, useState } from 'react';

const tracks = [
  { id: 0, title: 'Let It Happen', artist: 'Tame Impala', disc: 'TI', discBg: '#c9b96a', discFg: '#0a0a0a', spotifyId: '2X485T9Z5Ly0xyaghN73ed' },
  { id: 1, title: 'Chicago', artist: 'Michael Jackson', disc: 'MJ', discBg: '#1a1a2e', discFg: '#7ec8e3', spotifyId: '6pknqMFPAqKXBWBRvQpyLQ' },
  { id: 2, title: 'Kangna', artist: 'Jazzy B', disc: 'JB', discBg: '#2e1a1a', discFg: '#e37e7e', spotifyId: '3NMp3HKMHgMwMiHBqPeXP8' },
  { id: 3, title: "God's Plan", artist: 'Drake', disc: 'DR', discBg: '#1a2e1a', discFg: '#7ee37e', spotifyId: '6DCZcSspjsKoFjzjrWbOan' },
  { id: 4, title: 'Coming Soon', artist: '— TBD —', disc: '?', discBg: '#2a1a2e', discFg: '#c87ee3', spotifyId: null },
];

export default function VinylPlayer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const spotifySrc = useMemo(() => {
    if (!isPlaying || !activeTrack?.spotifyId) return '';
    return `https://open.spotify.com/embed/track/${activeTrack.spotifyId}?utm_source=generator`;
  }, [activeTrack, isPlaying]);

  const stopAndReset = () => {
    setIsPlaying(false);
    setActiveTrack(null);
    setIsDrawerOpen(false);
    setIsDragOver(false);
  };

  const handleTurntableClick = () => {
    if (isPlaying) {
      stopAndReset();
      return;
    }
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
    setIsPlaying(true);
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

      <div className="absolute inset-0 z-40 pointer-events-none font-['Space_Mono',monospace]">
        <div
          className="absolute top-0"
          style={{
            right: 'calc(100% + 16px)',
            width: '115px',
            height: '220px',
            background: '#0f0f0f',
            border: '1.5px solid #333',
            transform: isDrawerOpen ? 'translateX(0)' : 'translateX(20px)',
            opacity: isDrawerOpen ? 1 : 0,
            pointerEvents: isDrawerOpen ? 'all' : 'none',
            transition: 'transform 200ms ease, opacity 200ms ease',
          }}
        >
          <div
            className="px-2.5 pt-2 pb-1"
            style={{
              color: '#444',
              fontSize: '8px',
              letterSpacing: '0.15em',
              fontWeight: 700,
            }}
          >
            // CRATE
          </div>

          <div className="px-2 pb-2 flex flex-col gap-1 overflow-y-auto h-[calc(100%-20px)]">
            {tracks.map((track) => (
              <div
                key={track.id}
                draggable={true}
                onDragStart={(event) => handleDragStart(event, track.id)}
                onDragEnd={handleDragEnd}
                className="vinyl-record-item flex items-center gap-2 px-1.5 py-1 cursor-grab active:cursor-grabbing transition-all duration-150"
                style={{
                  width: '100%',
                  border: '1.5px solid #2a2a2a',
                  background: '#111',
                }}
              >
                <div
                  className="shrink-0 flex items-center justify-center text-[8px] font-bold"
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    background: track.discBg,
                    color: track.discFg,
                  }}
                >
                  {track.disc}
                </div>

                <div className="min-w-0">
                  <div className="text-[8px] font-bold text-[#ddd] truncate leading-tight">{track.title}</div>
                  <div className="text-[7px] text-[#555] truncate leading-tight">{track.artist}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

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
              className="absolute left-1/2 top-1/2 flex items-center justify-center text-[6px] font-bold"
              style={{
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                transform: 'translate(-50%, -50%)',
                background: isPlaying && activeTrack ? activeTrack.discBg : '#111',
                color: isPlaying && activeTrack ? activeTrack.discFg : '#c9b96a',
                border: '1px solid #2a2a2a',
              }}
            >
              {isPlaying && activeTrack ? activeTrack.disc : 'AV'}
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
              onClick={handleTurntableClick}
              onDragOver={(event) => {
                event.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleTurntableClick();
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

        <iframe
          title="Spotify Vinyl Player"
          src={spotifySrc}
          style={{
            width: 0,
            height: 0,
            border: 0,
            opacity: 0,
            position: 'absolute',
            pointerEvents: 'none',
          }}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      <style>{`
        .dragging {
          opacity: 0.35;
        }

        .vinyl-record-item:hover {
          border-color: #c9b96a !important;
          transform: translateX(3px);
        }
      `}</style>
    </>
  );
}
