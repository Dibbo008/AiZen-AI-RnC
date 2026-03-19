// components/CoverLetter.jsx — fully responsive

import React, { useState, useRef } from 'react';
import { Sparkles, Download, Copy, Check, FileText } from 'lucide-react';

export default function CoverLetter({ apiKey, generateCoverLetter, loading, error, applicantName }) {
  const [form, setForm] = useState({ jobTitle: '', company: '', hiringManager: '', reason: '', experience: '' });
  const [letter, setLetter] = useState('');
  const [copied, setCopied]   = useState(false);
  const [downloading, setDownloading] = useState(false);
  const letterRef = useRef(null);

  const update = (field, val) => setForm(prev => ({ ...prev, [field]: val }));

  const handleGenerate = async () => {
    const result = await generateCoverLetter({ applicantName: applicantName || 'Your Name', ...form });
    if (result) setLetter(result);
  };

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(letter); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
  };

  const handleDownloadPDF = async () => {
    if (!letterRef.current || typeof window.html2pdf === 'undefined') return;
    setDownloading(true);
    try {
      await window.html2pdf()
        .set({ margin: 0, filename: `cover_letter_${form.company || 'company'}.pdf`.replace(/\s+/g,'_'), image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } })
        .from(letterRef.current).save();
    } catch (e) { console.error(e); }
    setDownloading(false);
  };

  const canGenerate = apiKey && form.jobTitle && form.company;

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', width: '100%' }}>
      <div className="cover-grid">

        {/* Form card */}
        <div className="card fade-up">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
            <FileText size={17} color="var(--accent)" />
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: '700' }}>Cover Letter Generator</h2>
          </div>

          <div className="field">
            <label>Job Title *</label>
            <input value={form.jobTitle} onChange={e => update('jobTitle', e.target.value)} placeholder="AI Specialist" />
          </div>
          <div className="field">
            <label>Company Name *</label>
            <input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Google" />
          </div>
          <div className="field">
            <label>Hiring Manager (optional)</label>
            <input value={form.hiringManager} onChange={e => update('hiringManager', e.target.value)} placeholder="John Cena" />
          </div>
          <div className="field">
            <label>Why do you want this job?</label>
            <textarea rows={3} value={form.reason} onChange={e => update('reason', e.target.value)} placeholder="What excites you about this role and company?" />
          </div>
          <div className="field">
            <label>Relevant experience (brief)</label>
            <textarea rows={3} value={form.experience} onChange={e => update('experience', e.target.value)} placeholder="Your most relevant skills or past roles..." />
          </div>

          {error && <div className="alert alert-error">{error}</div>}

          <button className="btn btn-primary" onClick={handleGenerate} disabled={loading || !canGenerate}
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
            {loading ? <><span className="spinner" /> Writing...</> : <><Sparkles size={15} /> Generate Cover Letter with AI</>}
          </button>
        </div>

        {/* Result card */}
        {letter && (
          <div className="card fade-up" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: '700' }}>Your Cover Letter</h3>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button className="btn btn-ghost" onClick={handleCopy} style={{ fontSize: '12px', padding: '6px 12px' }}>
                  {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
                </button>
                <button className="btn btn-primary" onClick={handleDownloadPDF} disabled={downloading} style={{ fontSize: '12px', padding: '6px 12px' }}>
                  {downloading ? <span className="spinner" /> : <Download size={12} />} PDF
                </button>
              </div>
            </div>

            <textarea value={letter} onChange={e => setLetter(e.target.value)}
              style={{ flex: 1, minHeight: '380px', fontSize: '13px', lineHeight: '1.8', resize: 'vertical' }} />

            {/* Hidden print version for PDF */}
            <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
              <div ref={letterRef} style={{
                fontFamily: '"Georgia", serif', fontSize: '13px', lineHeight: '1.8',
                color: '#111', background: '#fff', padding: '60px',
                maxWidth: '820px', whiteSpace: 'pre-line',
              }}>
                {letter}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
