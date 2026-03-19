// components/ResumePreview.jsx — fixed scaling + works on all screen sizes

import React, { useRef, useState, useEffect } from 'react';
import { Download, Eye, Layers } from 'lucide-react';
import Classic from '../templates/Classic';
import Modern  from '../templates/Modern';
import Minimal from '../templates/Minimal';

const TEMPLATES = [
  { id: 'classic', label: 'Classic', component: Classic },
  { id: 'modern',  label: 'Modern',  component: Modern  },
  { id: 'minimal', label: 'Minimal', component: Minimal },
];

const RESUME_WIDTH = 820; // fixed A4 width in px

export default function ResumePreview({ data, template, onTemplateChange }) {
  const previewRef   = useRef(null);
  const containerRef = useRef(null);
  const [scale, setScale]           = useState(1);
  const [downloading, setDownloading] = useState(false);

  const TemplateComp = TEMPLATES.find(t => t.id === template)?.component || Classic;

  // ── Recalculate scale whenever container resizes ────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recalc = () => {
      const available = el.clientWidth - 32; // 16px padding each side
      const newScale  = available < RESUME_WIDTH ? available / RESUME_WIDTH : 1;
      setScale(parseFloat(newScale.toFixed(4)));
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // ── PDF download ────────────────────────────────────────────────────────
  const handleDownload = async () => {
    if (!previewRef.current || typeof window.html2pdf === 'undefined') {
      alert('PDF library not loaded yet. Please refresh and try again.');
      return;
    }
    setDownloading(true);
    const fileName = `${data.personal.name || 'resume'}_${template}.pdf`.replace(/\s+/g, '_');
    try {
      await window.html2pdf()
        .set({
          margin: 0,
          filename: fileName,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, logging: false },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        })
        .from(previewRef.current)
        .save();
    } catch (e) {
      console.error('PDF error:', e);
      alert('Failed to generate PDF. Please try again.');
    }
    setDownloading(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>

      {/* ── Toolbar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 14px', background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-subtle)',
        flexShrink: 0, flexWrap: 'wrap', gap: '8px',
      }}>
        {/* Template buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
          <Layers size={13} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          {TEMPLATES.map(t => (
            <button
              key={t.id}
              onClick={() => onTemplateChange(t.id)}
              style={{
                padding: '5px 12px', borderRadius: '6px',
                fontSize: '11px', fontWeight: '600',
                fontFamily: 'var(--font-body)', cursor: 'pointer', border: 'none',
                background: template === t.id ? 'var(--accent)' : 'var(--accent-dim)',
                color:      template === t.id ? '#fff'          : 'var(--accent)',
                transition: 'all 0.2s',
                WebkitTapHighlightColor: 'transparent',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Download PDF */}
        <button
          className="btn btn-primary"
          onClick={handleDownload}
          disabled={downloading}
          style={{ fontSize: '12px', padding: '7px 14px', flexShrink: 0 }}
        >
          {downloading ? <span className="spinner" /> : <Download size={13} />}
          {downloading ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      {/* ── Scrollable preview area ── */}
      <div
        ref={containerRef}
        style={{
          flex: 1, overflow: 'auto', background: '#888',
          padding: '16px', minHeight: 0,
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/*
          The outer div is RESUME_WIDTH wide so the transform-origin math works.
          We shrink the OUTER box height to match so there's no empty space below.
        */}
        <div style={{
          width: `${RESUME_WIDTH}px`,
          // Shrink the layout footprint so scroll area matches scaled height
          height: `${Math.round(RESUME_WIDTH * scale * 1.41)}px`, // ~A4 ratio
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          margin: '0 auto',
        }}>
          <div
            ref={previewRef}
            style={{
              width: `${RESUME_WIDTH}px`,
              background: '#fff',
              boxShadow: '0 4px 32px rgba(0,0,0,0.35)',
              borderRadius: '2px',
            }}
          >
            <TemplateComp data={data} />
          </div>
        </div>
      </div>

      {/* ── Tip bar ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '5px',
        padding: '6px 14px', color: 'var(--text-dim)', fontSize: '10px',
        flexShrink: 0, fontFamily: 'var(--font-mono)', letterSpacing: '0.05em',
      }}>
        <Eye size={10} /> LIVE PREVIEW INSTANTLY
      </div>
    </div>
  );
}
