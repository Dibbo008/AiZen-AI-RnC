// components/Hero.jsx — fully responsive landing page

import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap, FileText, Download, PenLine } from 'lucide-react';

export function AiZenLogo({ size = 40, animated = false }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={animated ? { animation: 'glowPulse 2.5s ease-in-out infinite' } : {}}>
      <polygon points="40,4 72,22 72,58 40,76 8,58 8,22"
        fill="rgba(59,130,246,0.06)" stroke="rgba(59,130,246,0.35)" strokeWidth="1"/>
      <polygon points="40,12 64,26 64,54 40,68 16,54 16,26"
        fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.2)" strokeWidth="0.5"/>
      <rect x="33" y="18" width="14" height="30" rx="3" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1.2"/>
      <polygon points="33,48 47,48 40,62" fill="#3b82f6"/>
      <polygon points="37,48 40,56 40,48" fill="rgba(255,255,255,0.3)"/>
      <rect x="44" y="20" width="3" height="22" rx="1.5" fill="rgba(59,130,246,0.6)"/>
      <circle cx="22" cy="26" r="2" fill="#3b82f6" opacity="0.8"/>
      <circle cx="58" cy="26" r="2" fill="#3b82f6" opacity="0.8"/>
      <circle cx="22" cy="54" r="1.5" fill="#3b82f6" opacity="0.5"/>
      <circle cx="58" cy="54" r="1.5" fill="#3b82f6" opacity="0.5"/>
      <line x1="18" y1="34" x2="28" y2="34" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <line x1="18" y1="38" x2="26" y2="38" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <line x1="52" y1="34" x2="62" y2="34" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
      <line x1="54" y1="38" x2="62" y2="38" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
      <circle cx="40" cy="63" r="1.5" fill="#60a5fa" opacity="0.9"/>
    </svg>
  );
}

const FEATURES = [
  { icon: <PenLine size={16} />, title: 'Neural Writing',    desc: 'AI rewrites raw experience into polished bullets' },
  { icon: <FileText size={16} />, title: '3 Live Templates', desc: 'Classic, Modern & Minimal with live preview' },
  { icon: <Zap size={16} />,      title: 'Skills Matrix',    desc: 'AI-categorized skill suggestions for any role' },
  { icon: <Download size={16} />, title: 'PDF Export',        desc: 'Print-ready documents in one click' },
];

export default function Hero({ onGetStarted }) {
  const [visible, setVisible] = useState(false);
  const [glitch, setGlitch]   = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 80);
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      /* vh-based padding keeps content centred on every screen height —
         iPad portrait (1024px tall) no longer pushes content down */
      paddingTop:    'clamp(16px, 4vh, 48px)',
      paddingBottom: 'clamp(16px, 4vh, 48px)',
      paddingLeft:   'clamp(16px, 4vw, 40px)',
      paddingRight:  'clamp(16px, 4vw, 40px)',
      position: 'relative', overflow: 'hidden',
    }}>

      {/* Grid bg */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `linear-gradient(rgba(59,130,246,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.05) 1px,transparent 1px)`,
        backgroundSize: '48px 48px',
      }}/>

      {/* Scan line */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.015) 2px,rgba(0,0,0,0.015) 4px)',
      }}/>

      {/* Glow blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: 'min(500px,80vw)', height: 'min(500px,80vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(59,130,246,0.1) 0%,transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }}/>
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: 'min(400px,70vw)', height: 'min(400px,70vw)', borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 65%)', filter: 'blur(60px)', pointerEvents: 'none' }}/>

      {/* Content */}
      <div style={{
        position: 'relative', textAlign: 'center',
        maxWidth: 'min(720px, 100%)',
        width: '100%',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.7s ease, transform 0.7s ease',
      }}>

        {/* Logo + wordmark */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
          {/* Fixed size — window.innerWidth calc breaks on orientation change */}
          <AiZenLogo size={96} animated />
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(44px, 10vw, 78px)',
            fontWeight: '900', letterSpacing: '0.08em',
            margin: '16px 0 0',
            background: 'linear-gradient(135deg,#e8f0ff 0%,#93c5fd 50%,#3b82f6 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            lineHeight: 1.0,
            filter: glitch ? 'hue-rotate(40deg) brightness(1.3)' : 'none',
            transition: 'filter 0.05s',
          }}>AiZen</h1>

          <p style={{
            fontFamily: 'var(--font-mono)', color: 'rgba(59,130,246,0.7)',
            fontSize: 'clamp(9px, 2vw, 11px)', letterSpacing: '0.25em',
            marginTop: '8px', textTransform: 'uppercase',
          }}>craft your career, effortlessly</p>
        </div>

        {/* Spacer — your original empty paragraph kept as-is */}
        <p style={{ marginBottom: '50px', fontWeight: '200', padding: '0 15px' }} />

        {/* CTA */}
        <button
          onClick={onGetStarted}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            padding: 'clamp(12px,3vw,14px) clamp(28px,6vw,40px)',
            borderRadius: '6px', border: 'none',
            background: 'var(--accent)', color: '#fff', cursor: 'pointer',
            fontFamily: 'var(--font-display)', fontWeight: '700',
            fontSize: 'clamp(12px,3vw,13px)', letterSpacing: '0.1em', textTransform: 'uppercase',
            animation: 'glowPulse 2.5s ease-in-out infinite',
            marginBottom: 'clamp(24px, 4vh, 44px)', transition: 'transform 0.2s',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform  = 'translateY(0) scale(1)'}
        >
          Initialize Aizen <ArrowRight size={16} />
        </button>

        {/* Feature grid — 2 cols on mobile, 4 on tablet/desktop */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '10px', width: '100%',
        }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="glass" style={{
              padding: '16px 14px', borderRadius: '10px', textAlign: 'left',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.5s ease ${0.12 + i * 0.08}s, transform 0.5s ease ${0.12 + i * 0.08}s`,
              borderColor: 'rgba(59,130,246,0.12)',
            }}>
              <div style={{ color: 'var(--accent)', marginBottom: '8px', opacity: 0.9 }}>{f.icon}</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '10px', letterSpacing: '0.06em', marginBottom: '5px', color: 'var(--text)' }}>{f.title}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '11px', lineHeight: '1.5', fontFamily: 'var(--font-body)', fontWeight: '300' }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', fontSize: '10px', marginTop: '28px', letterSpacing: '0.08em' }}>
          Prototype project of EO'159
        </p>
      </div>
    </div>
  );
}