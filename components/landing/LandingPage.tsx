'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RealTimeClock } from '@/components/ui/RealTimeClock';

const TelemetryFragment = ({ x, y, delay }: { x: number; y: number; delay: number }) => {
  const [mounted, setMounted] = useState(false);
  const fragments = ["SYS.ACTIVE", "FLOW: STABLE", "LAT: 12.971", "LON: 77.594", "PORT: OPEN", "STATUS: ONLINE"];
  const [text, setText] = useState("");

  useEffect(() => {
    setMounted(true);
    setText(fragments[Math.floor(Math.random() * fragments.length)]);
  }, []);

  if (!mounted) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: `${y}%`,
        fontFamily: "var(--font-mono, monospace)",
        fontSize: "7px",
        color: "rgba(0,210,190,0.3)",
        letterSpacing: "0.1em",
        whiteSpace: "nowrap",
        animation: `flicker 4s infinite ${delay}s`,
        pointerEvents: "none",
      }}
    >
      {text}
    </div>
  );
};

const BackgroundInteractions = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  if (!mounted) return null;

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 1 }}>
      <div style={{
        position: "absolute",
        bottom: "-10%",
        left: "-10%",
        right: "-10%",
        height: "60%",
        background: `linear-gradient(to top, rgba(0,210,190,0.05) 1px, transparent 1px), 
                     linear-gradient(to right, rgba(0,210,190,0.05) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
        transform: `perspective(800px) rotateX(60deg) translateY(${mouse.y * 0.5}px) translateX(${mouse.x * 0.5}px)`,
        maskImage: "linear-gradient(to top, black, transparent)",
        pointerEvents: "none",
        transition: "transform 0.1s ease-out"
      }} />

      <div style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(circle 400px at ${50 + mouse.x * 2}% ${50 + mouse.y * 2}%, rgba(0,210,190,0.08), transparent 80%)`,
        pointerEvents: "none",
        transition: "background 0.1s ease-out"
      }} />

      {[...Array(12)].map((_, i) => (
        <TelemetryFragment
          key={i}
          x={10 + (i * 15) % 80}
          y={20 + (i * 23) % 60}
          delay={i * 0.5}
        />
      ))}
    </div>
  );
};

const bracketStyle = (pos: { top?: string; bottom?: string; left?: string; right?: string }): React.CSSProperties => ({
  position: "absolute", ...pos, width: 40, height: 40, pointerEvents: "none",
  borderTop: pos.bottom ? "none" : "2px solid rgba(0,210,190,0.6)",
  borderBottom: pos.top ? "none" : "2px solid rgba(0,210,190,0.6)",
  borderLeft: pos.right ? "none" : "2px solid rgba(0,210,190,0.6)",
  borderRight: pos.left ? "none" : "2px solid rgba(0,210,190,0.6)",
  zIndex: 100,
});

export default function LandingPage() {
  const [hotLeft, setHotLeft] = useState(false);
  const [hotRight, setHotRight] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [glitchStyle, setGlitchStyle] = useState({ x: 0, skew: 0 });

  useEffect(() => {
    const fire = () => {
      setGlitchStyle({ x: Math.random() * 6 - 3, skew: Math.random() * 3 - 1.5 });
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200);

      setTimeout(() => {
        setGlitchStyle({ x: Math.random() * 6 - 3, skew: Math.random() * 3 - 1.5 });
        setGlitch(true);
        setTimeout(() => setGlitch(false), 130);
      }, 250);
    };
    const id = setInterval(fire, 3500);
    fire();
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, overflow: "hidden", background: "#020408" }}>
      <BackgroundInteractions />

      {/* Clock Telemetry */}
      <div className="absolute top-8 right-8 text-right hidden md:block z-50">
        <RealTimeClock className="text-sm font-bold tracking-widest text-[#00D2BE]" />
      </div>

      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10,
        backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px)"
      }} />

      {["15%", "30%", "50%", "70%", "85%"].map((l, i) => (
        <div key={i} style={{
          position: "absolute", top: 0, bottom: 0, left: l, width: "1px",
          background: `linear-gradient(to bottom, transparent, rgba(0,210,190,${0.03 + i * 0.01}), transparent)`,
          pointerEvents: "none", zIndex: 2
        }} />
      ))}

      {/* Top Header Label */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, display: "flex",
        justifyContent: "space-between", alignItems: "center",
        padding: "18px 28px", borderBottom: "1px solid rgba(0,210,190,0.1)",
        animation: "appear .9s ease-out .2s both", zIndex: 50
      }}>
        <span style={{
          fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.35em",
          textTransform: "uppercase", color: "rgba(0,210,190,.7)"
        }}>Nikhil Kumar Yadav • System Initialization</span>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <span style={{
            fontFamily: "var(--font-mono, monospace)", fontSize: 8, letterSpacing: "0.2em",
            color: "rgba(255,255,255,.25)",
            marginRight: "60px" // account for absolute clock pos
          }}>▶ ONLINE SECURE CONNECT</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center",
        justifyContent: "center", flexDirection: "column", padding: "0 24px", zIndex: 40
      }}>

        <p style={{
          fontFamily: "var(--font-mono, monospace)", fontSize: 10, letterSpacing: "0.7em",
          textTransform: "uppercase", color: "rgba(0,210,190,.6)",
          marginBottom: 26, animation: "appear .9s ease-out .3s both"
        }}>
          Software Engineer • Creative Developer
        </p>

        {/* Profile Image & Name Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 w-full max-w-5xl" style={{ animation: "appear .8s ease-out .4s both" }}>
          
          {/* Hexagon/Tech Framed Image */}
          <div className="relative group perspective-[1000px] w-48 h-48 md:w-56 md:h-56 shrink-0 z-20">
            <div className="absolute inset-0 rounded-full border border-[rgba(0,210,190,0.5)] shadow-[0_0_20px_rgba(0,210,190,0.3)] group-hover:shadow-[0_0_40px_rgba(0,210,190,0.6)] transition-all duration-500 overflow-hidden z-10 bg-black">
              {/* Fallback image handler, assumes user uploads public/profile.jpg. Otherwise shows blank frame beautifully */}
              <img 
                src="/profile.jpg" 
                alt="Nikhil Kumar Yadav" 
                className="w-full h-full object-cover opacity-85 group-hover:opacity-100 mix-blend-luminosity hover:mix-blend-normal transition-all duration-700" 
                onError={(e) => { 
                   // If image doesn't exist, we show a tech-placeholder
                   e.currentTarget.style.display = 'none'; 
                   e.currentTarget.parentElement!.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:rgba(0,210,190,0.4);font-family:monospace;font-size:10px;text-align:center;">USER<br/>IMAGE<br/>(profile.png)</div>'
                }}
              />
              <div className="absolute inset-0 bg-[rgba(0,210,190,0.1)] mix-blend-overlay pointer-events-none" />
            </div>
            {/* Spinning decorative orbit */}
            <div className="absolute -inset-4 rounded-full border border-dashed border-[rgba(0,210,190,0.3)] animate-[spin_10s_linear_infinite]" />
            <div className="absolute -inset-8 rounded-full border border-dotted border-[rgba(0,210,190,0.2)] animate-[spin_15s_linear_infinite_reverse]" />
          </div>

          <div style={{ position: "relative", lineHeight: 0.9 }}>
            <h1 style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(50px,11vw,140px)", fontWeight: 900, fontStyle: "italic",
              letterSpacing: "0.02em", margin: 0, userSelect: "none",
              position: "absolute", top: 0, left: 0,
              color: "transparent",
              textShadow: "0 0 80px rgba(0,210,190,0.35), 0 0 160px rgba(0,210,190,0.2)",
              filter: "blur(8px)",
              lineHeight: 0.9,
              whiteSpace: "nowrap"
            }}>NIKHIL<br/>YADAV</h1>
            <h1 style={{
              fontFamily: "var(--font-display, sans-serif)",
              fontSize: "clamp(50px,11vw,140px)", fontWeight: 900, fontStyle: "italic",
              letterSpacing: "0.02em", margin: 0, userSelect: "none",
              color: glitch ? "rgba(0,210,190,0.9)" : "rgba(255,255,255,0.04)",
              WebkitTextStroke: glitch ? "2px #00D2BE" : "2px rgba(255,255,255,0.85)",
              textShadow: glitch
                ? "4px 0 rgba(255,0,80,0.7), -4px 0 rgba(0,200,255,0.7), 0 0 60px rgba(0,210,190,0.6)"
                : "0 0 40px rgba(0,210,190,0.1)",
              transform: glitch ? `translate(${glitchStyle.x}px,0) skewX(${glitchStyle.skew}deg)` : "none",
              transition: glitch ? "none" : "all 0.15s ease",
              position: "relative",
              lineHeight: 0.9,
              whiteSpace: "nowrap"
            }}>NIKHIL<br/>YADAV</h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: "flex", gap: "clamp(20px,5vw,70px)", justifyContent: "center",
          marginTop: 60, animation: "appear .9s ease-out .9s both",
          padding: "16px 30px", border: "1px solid rgba(0,210,190,0.12)",
          background: "rgba(0,210,190,0.03)", backdropFilter: "blur(4px)"
        }}>
          {[
            { v: "15+", u: "Projects" }, 
            { v: "9.28", u: "CGPA" }, 
            { v: "200+", u: "LeetCode" }
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontFamily: "var(--font-display, sans-serif)", fontSize: "clamp(18px,3vw,30px)", fontWeight: 700, color: "#fff",
                letterSpacing: "0.05em", lineHeight: 1
              }}>{s.v}</div>
              <div style={{
                fontFamily: "var(--font-mono, monospace)", fontSize: 8, letterSpacing: "0.3em",
                textTransform: "uppercase", color: "rgba(0,210,190,.65)", marginTop: 6
              }}>{s.u}</div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div style={{ marginTop: 44, animation: "appear .9s ease-out 1.1s both", position: "relative", display: "flex", gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
          
          <div style={{ position: "relative" }}>
            {hotLeft && <div style={{
              position: "absolute", inset: -8, borderRadius: 2,
              background: "rgba(0,210,190,0.1)", filter: "blur(12px)", zIndex: 0
            }} />}
            <Link href="/immersive">
              <button
                onMouseEnter={() => setHotLeft(true)} onMouseLeave={() => setHotLeft(false)}
                style={{
                  position: "relative", zIndex: 1,
                  padding: "16px 32px",
                  background: hotLeft ? "rgba(0,210,190,0.12)" : "rgba(0,0,0,0.5)",
                  border: `1px solid ${hotLeft ? "#00D2BE" : "rgba(0,210,190,.4)"}`,
                  color: hotLeft ? "#fff" : "#00D2BE",
                  fontFamily: "var(--font-mono, monospace)", fontSize: 11, fontWeight: "bold",
                  letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer",
                  transition: "all .25s ease", backdropFilter: "blur(8px)",
                  boxShadow: hotLeft ? "0 0 40px rgba(0,210,190,.3), inset 0 0 20px rgba(0,210,190,0.05)" : "none",
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                Immersive 3D <span style={{ marginLeft: 6, opacity: 0.6, fontSize: "9px" }}>(Minecraft Style) →</span>
              </button>
            </Link>
          </div>

          <div style={{ position: "relative" }}>
            {hotRight && <div style={{
              position: "absolute", inset: -8, borderRadius: 2,
              background: "rgba(0,210,190,0.1)", filter: "blur(12px)", zIndex: 0
            }} />}
            <Link href="/normal">
              <button
                onMouseEnter={() => setHotRight(true)} onMouseLeave={() => setHotRight(false)}
                style={{
                  position: "relative", zIndex: 1,
                  padding: "16px 32px",
                  background: hotRight ? "rgba(0,210,190,0.12)" : "rgba(0,0,0,0.5)",
                  border: `1px solid ${hotRight ? "#00D2BE" : "rgba(0,210,190,.4)"}`,
                  color: hotRight ? "#fff" : "#00D2BE",
                  fontFamily: "var(--font-mono, monospace)", fontSize: 11, fontWeight: "bold",
                  letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer",
                  transition: "all .25s ease", backdropFilter: "blur(8px)",
                  boxShadow: hotRight ? "0 0 40px rgba(0,210,190,.3), inset 0 0 20px rgba(0,210,190,0.05)" : "none",
                  clipPath: "polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)",
                }}
              >
                Minimal Portfolio <span style={{ marginLeft: 6, opacity: 0.6, fontSize: "9px" }}>(Fast UI) →</span>
              </button>
            </Link>
          </div>
          
        </div>
      </div>

      {/* Decorative Corners */}
      <div style={bracketStyle({ top: "30px", left: "20px" })} />
      <div style={bracketStyle({ top: "30px", right: "20px" })} />
      <div style={bracketStyle({ bottom: "20px", left: "20px" })} />
      <div style={bracketStyle({ bottom: "20px", right: "20px" })} />

      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
        background: "linear-gradient(to right, transparent, #00D2BE, transparent)",
        animation: "horizon .9s ease-out .8s both", transformOrigin: "left", zIndex: 100
      }} />

      <style dangerouslySetInnerHTML={{__html: `
        :root {
          --font-display: 'Oswald', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }
        @keyframes flicker {
          0%, 100% { opacity: 0; transform: translateY(0); }
          5% { opacity: 1; }
          90% { opacity: 1; }
          95% { opacity: 0; transform: translateY(-20px); }
        }
        @keyframes appear {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes horizon {
          0% { transform: scaleX(0); opacity: 0; }
          100% { transform: scaleX(1); opacity: 1; }
        }
      `}} />
    </div>
  );
}
