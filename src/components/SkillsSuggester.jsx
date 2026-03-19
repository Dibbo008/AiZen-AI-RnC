// components/SkillsSuggester.jsx
// AI-powered skills suggestion component with category-based display

import React, { useState } from 'react';
import { Sparkles, X, Plus } from 'lucide-react';

export default function SkillsSuggester({ skills, onSkillsChange, suggestSkills, loading, error }) {
  const [jobTitle, setJobTitle] = useState('');
  const [suggested, setSuggested] = useState(null);
  const [newSkill, setNewSkill] = useState('');

  const handleSuggest = async () => {
    if (!jobTitle.trim()) return;
    const result = await suggestSkills({ jobTitle: jobTitle.trim() });
    if (result) setSuggested(result);
  };

  const addSkill = (skill) => {
    if (!skills.includes(skill)) {
      onSkillsChange([...skills, skill]);
    }
  };

  const removeSkill = (skill) => {
    onSkillsChange(skills.filter(s => s !== skill));
  };

  const addCustomSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onSkillsChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const categoryColors = {
    technical: { bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.3)', color: '#60a5fa' },
    tools:     { bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.3)', color: '#a78bfa' },
    soft:      { bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.3)',  color: '#4ade80' },
  };

  return (
    <div>
      {/* AI Suggester */}
      <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--accent-dim)', borderRadius: '12px', border: '1px solid var(--border)' }}>
        <div className="section-title" style={{ marginBottom: '12px' }}>
          <span className="dot" />
          AI Skill Suggester
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={jobTitle}
            onChange={e => setJobTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSuggest()}
            placeholder="e.g. Frontend Developer, Data Analyst..."
            style={{ flex: 1 }}
          />
          <button
            className="btn btn-primary"
            onClick={handleSuggest}
            disabled={loading || !jobTitle.trim()}
            style={{ flexShrink: 0 }}
          >
            {loading ? <span className="spinner" /> : <Sparkles size={14} />}
            {loading ? 'Thinking...' : 'Suggest'}
          </button>
        </div>

        {error && <div className="alert alert-error" style={{ marginTop: '10px' }}>{error}</div>}

        {/* Suggested skills by category */}
        {suggested && (
          <div style={{ marginTop: '16px' }}>
            {Object.entries(suggested).map(([category, skillList]) => (
              <div key={category} style={{ marginBottom: '10px' }}>
                <div style={{
                  fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
                  letterSpacing: '1.5px', color: 'var(--text-muted)', marginBottom: '6px'
                }}>{category}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {skillList.map((skill, i) => {
                    const isAdded = skills.includes(skill);
                    const colors = categoryColors[category] || categoryColors.technical;
                    return (
                      <button
                        key={i}
                        onClick={() => isAdded ? removeSkill(skill) : addSkill(skill)}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          padding: '4px 10px', borderRadius: '6px', fontSize: '12px',
                          fontWeight: '500', cursor: 'pointer', border: `1px solid ${colors.border}`,
                          background: isAdded ? colors.bg : 'transparent',
                          color: isAdded ? colors.color : 'var(--text-muted)',
                          transition: 'all 0.2s',
                          fontFamily: 'var(--font-body)',
                        }}
                      >
                        {isAdded ? <X size={10} /> : <Plus size={10} />}
                        {skill}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Current skills */}
      <div className="field">
        <label>Your Skills</label>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
          <input
            value={newSkill}
            onChange={e => setNewSkill(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustomSkill()}
            placeholder="Type a skill and press Enter or click Add"
          />
          <button className="btn btn-secondary" onClick={addCustomSkill} style={{ flexShrink: 0 }}>
            <Plus size={14} /> Add
          </button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
          {skills.map((skill, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '4px',
                padding: '4px 10px', borderRadius: '6px', fontSize: '12px',
                background: 'var(--accent-dim)', color: 'var(--accent)',
                border: '1px solid var(--border)', fontWeight: '500',
              }}
            >
              {skill}
              <button
                onClick={() => removeSkill(skill)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--accent)', padding: '0', display: 'flex' }}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          {skills.length === 0 && (
            <span style={{ color: 'var(--text-dim)', fontSize: '13px' }}>No skills added yet. Use the AI suggester above or add manually.</span>
          )}
        </div>
      </div>
    </div>
  );
}
