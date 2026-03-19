// components/ResumeForm.jsx
// Complete resume form with all sections and AI enhancements

import React, { useState } from 'react';
import { Sparkles, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import SkillsSuggester from './SkillsSuggester';
import { useGemini } from '../hooks/useGemini';

function CollapsibleSection({ title, icon, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ marginBottom: '12px', border: '1px solid var(--border-subtle)', borderRadius: '14px', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', background: 'var(--bg-card)', border: 'none', cursor: 'pointer',
          color: 'var(--text)', fontFamily: 'var(--font-display)', fontWeight: '700', fontSize: '14px',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '16px' }}>{icon}</span> {title}
        </span>
        {open ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
      </button>
      {open && (
        <div style={{ padding: '18px', background: 'var(--bg-2)', borderTop: '1px solid var(--border-subtle)' }}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function ResumeForm({ data, onChange, apiKey }) {
  const { generateSummary, enhanceExperience, suggestSkills, loading, errors } = useGemini(apiKey);

  // ── Personal Info 
  const updatePersonal = (field, value) => {
    onChange({ ...data, personal: { ...data.personal, [field]: value } });
  };

  // ── Experience 
  const addExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { company: '', role: '', duration: '', description: '', bullets: '' }]
    });
  };
  const updateExperience = (i, field, value) => {
    const updated = [...data.experience];
    updated[i] = { ...updated[i], [field]: value };
    onChange({ ...data, experience: updated });
  };
  const removeExperience = (i) => {
    onChange({ ...data, experience: data.experience.filter((_, idx) => idx !== i) });
  };
  const handleEnhanceExperience = async (i) => {
    const exp = data.experience[i];
    const result = await enhanceExperience({
      company: exp.company, role: exp.role,
      duration: exp.duration, description: exp.description,
    });
    if (result) updateExperience(i, 'bullets', result);
  };

  // ── Education 
  const addEducation = () => {
    onChange({ ...data, education: [...data.education, { institution: '', degree: '', year: '', gpa: '' }] });
  };
  const updateEducation = (i, field, value) => {
    const updated = [...data.education];
    updated[i] = { ...updated[i], [field]: value };
    onChange({ ...data, education: updated });
  };
  const removeEducation = (i) => {
    onChange({ ...data, education: data.education.filter((_, idx) => idx !== i) });
  };

  // ── Projects 
  const addProject = () => {
    onChange({ ...data, projects: [...data.projects, { title: '', description: '', techStack: '', link: '' }] });
  };
  const updateProject = (i, field, value) => {
    const updated = [...data.projects];
    updated[i] = { ...updated[i], [field]: value };
    onChange({ ...data, projects: updated });
  };
  const removeProject = (i) => {
    onChange({ ...data, projects: data.projects.filter((_, idx) => idx !== i) });
  };

  // ── Certifications
  const addCert = () => {
    onChange({ ...data, certifications: [...data.certifications, { name: '', issuer: '', date: '' }] });
  };
  const updateCert = (i, field, value) => {
    const updated = [...data.certifications];
    updated[i] = { ...updated[i], [field]: value };
    onChange({ ...data, certifications: updated });
  };
  const removeCert = (i) => {
    onChange({ ...data, certifications: data.certifications.filter((_, idx) => idx !== i) });
  };

  // ── Summary generation 
  const handleGenSummary = async () => {
    if (!apiKey) return;
    const result = await generateSummary({
      name: data.personal.name,
      jobTitle: data.personal.jobTitle,
      yearsExp: data.personal.yearsExp || '3+',
      strengths: data.personal.strengths || data.skills.join(', '),
    });
    if (result) updatePersonal('summary', result);
  };

  const cardStyle = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-subtle)',
    borderRadius: '12px',
    padding: '16px',
    marginBottom: '12px',
    position: 'relative',
  };

  return (
    <div>
      {/* ─── Personal Info ─── */}
      <CollapsibleSection title="Personal Info" icon="👤">
        <div className="field-row">
          <div className="field">
            <label>Full Name</label>
            <input value={data.personal.name} onChange={e => updatePersonal('name', e.target.value)} placeholder="Dibbo Adhikary" />
          </div>
          <div className="field">
            <label>Job Title</label>
            <input value={data.personal.jobTitle} onChange={e => updatePersonal('jobTitle', e.target.value)} placeholder="AI Specialist" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Email</label>
            <input type="email" value={data.personal.email} onChange={e => updatePersonal('email', e.target.value)} placeholder="dibbo@email.com" />
          </div>
          <div className="field">
            <label>Phone</label>
            <input value={data.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} placeholder="+1 234 567 8900" />
          </div>
        </div>
        <div className="field-row">
          <div className="field">
            <label>Location</label>
            <input value={data.personal.location} onChange={e => updatePersonal('location', e.target.value)} placeholder="Dhaka, BD" />
          </div>
          <div className="field">
            <label>LinkedIn / Website</label>
            <input value={data.personal.linkedin} onChange={e => updatePersonal('linkedin', e.target.value)} placeholder="linkedin.com/in/dibbo" />
          </div>
        </div>

        <div className="divider" />

        {/* Summary with AI */}
        <div className="field">
          <label>Years of Experience (for AI)</label>
          <input value={data.personal.yearsExp} onChange={e => updatePersonal('yearsExp', e.target.value)} placeholder="5 Years" style={{ marginBottom: '8px' }} />
          <label>Key Strengths (for AI)</label>
          <input value={data.personal.strengths} onChange={e => updatePersonal('strengths', e.target.value)} placeholder="AI, React, problem-solving, team leadership" />
        </div>

        <button
          className="btn btn-primary"
          onClick={handleGenSummary}
          disabled={loading.summary || !apiKey || !data.personal.name}
          style={{ marginBottom: '12px', width: '100%' }}
        >
          {loading.summary ? <><span className="spinner" /> Generating...</> : <><Sparkles size={14} /> Generate Summary with AI</>}
        </button>

        {errors.summary && <div className="alert alert-error">{errors.summary}</div>}

        <div className="field">
          <label>Professional Summary</label>
          <textarea
            rows={5}
            value={data.personal.summary}
            onChange={e => updatePersonal('summary', e.target.value)}
            placeholder="Your professional summary will appear here after AI generation or write it manually..."
          />
        </div>
      </CollapsibleSection>

      {/* ─── Work Experience ─── */}
      <CollapsibleSection title="Work Experience" icon="💼">
        {data.experience.map((exp, i) => (
          <div key={i} style={cardStyle}>
            <button
              onClick={() => removeExperience(i)}
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <Trash2 size={14} />
            </button>
            <div className="field-row">
              <div className="field">
                <label>Company</label>
                <input value={exp.company} onChange={e => updateExperience(i, 'company', e.target.value)} placeholder="NVDIA" />
              </div>
              <div className="field">
                <label>Role / Title</label>
                <input value={exp.role} onChange={e => updateExperience(i, 'role', e.target.value)} placeholder="Software Engineer" />
              </div>
            </div>
            <div className="field">
              <label>Duration</label>
              <input value={exp.duration} onChange={e => updateExperience(i, 'duration', e.target.value)} placeholder="Jan 2022 – Present" />
            </div>
            <div className="field">
              <label>What you did (raw)</label>
              <textarea
                rows={3}
                value={exp.description}
                onChange={e => updateExperience(i, 'description', e.target.value)}
                placeholder="Briefly describe your responsibilities, projects and achievements..."
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => handleEnhanceExperience(i)}
              disabled={loading.experience || !apiKey || !exp.company}
              style={{ marginBottom: '10px', fontSize: '13px' }}
            >
              {loading.experience ? <><span className="spinner" /> Enhancing...</> : <><Sparkles size={13} /> Enhance with AI</>}
            </button>
            {errors.experience && <div className="alert alert-error">{errors.experience}</div>}
            {exp.bullets && (
              <div className="field">
                <label>AI-Enhanced Bullets (editable)</label>
                <textarea rows={5} value={exp.bullets} onChange={e => updateExperience(i, 'bullets', e.target.value)} />
              </div>
            )}
          </div>
        ))}
        <button className="btn btn-ghost" onClick={addExperience} style={{ width: '100%', justifyContent: 'center' }}>
          <Plus size={14} /> Add Experience
        </button>
      </CollapsibleSection>

      {/* ─── Education ─── */}
      <CollapsibleSection title="Education" icon="🎓">
        {data.education.map((edu, i) => (
          <div key={i} style={cardStyle}>
            <button
              onClick={() => removeEducation(i)}
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <Trash2 size={14} />
            </button>
            <div className="field-row">
              <div className="field">
                <label>Institution</label>
                <input value={edu.institution} onChange={e => updateEducation(i, 'institution', e.target.value)} placeholder="MIT" />
              </div>
              <div className="field">
                <label>Degree</label>
                <input value={edu.degree} onChange={e => updateEducation(i, 'degree', e.target.value)} placeholder="B.S. Computer Science" />
              </div>
            </div>
            <div className="field-row">
              <div className="field">
                <label>Year</label>
                <input value={edu.year} onChange={e => updateEducation(i, 'year', e.target.value)} placeholder="2020" />
              </div>
              <div className="field">
                <label>GPA (optional)</label>
                <input value={edu.gpa} onChange={e => updateEducation(i, 'gpa', e.target.value)} placeholder="3.8" />
              </div>
            </div>
          </div>
        ))}
        <button className="btn btn-ghost" onClick={addEducation} style={{ width: '100%', justifyContent: 'center' }}>
          <Plus size={14} /> Add Education
        </button>
      </CollapsibleSection>

      {/* ─── Skills ─── */}
      <CollapsibleSection title="Skills" icon="⚡">
        <SkillsSuggester
          skills={data.skills}
          onSkillsChange={(skills) => onChange({ ...data, skills })}
          suggestSkills={suggestSkills}
          loading={loading.skills}
          error={errors.skills}
        />
      </CollapsibleSection>

      {/* ─── Projects ─── */}
      <CollapsibleSection title="Projects" icon="🚀" defaultOpen={false}>
        {data.projects.map((p, i) => (
          <div key={i} style={cardStyle}>
            <button
              onClick={() => removeProject(i)}
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <Trash2 size={14} />
            </button>
            <div className="field-row">
              <div className="field">
                <label>Project Title</label>
                <input value={p.title} onChange={e => updateProject(i, 'title', e.target.value)} placeholder="AiZen Resume Builder" />
              </div>
              <div className="field">
                <label>Tech Stack</label>
                <input value={p.techStack} onChange={e => updateProject(i, 'techStack', e.target.value)} placeholder="React, Node.js, MongoDB" />
              </div>
            </div>
            <div className="field">
              <label>Description</label>
              <textarea rows={2} value={p.description} onChange={e => updateProject(i, 'description', e.target.value)} placeholder="What the project does and your role..." />
            </div>
            <div className="field">
              <label>Link (optional)</label>
              <input value={p.link} onChange={e => updateProject(i, 'link', e.target.value)} placeholder="https://github.com/..." />
            </div>
          </div>
        ))}
        <button className="btn btn-ghost" onClick={addProject} style={{ width: '100%', justifyContent: 'center' }}>
          <Plus size={14} /> Add Project
        </button>
      </CollapsibleSection>

      {/* ─── Certifications ─── */}
      <CollapsibleSection title="Certifications" icon="🏆" defaultOpen={false}>
        {data.certifications.map((c, i) => (
          <div key={i} style={cardStyle}>
            <button
              onClick={() => removeCert(i)}
              style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <Trash2 size={14} />
            </button>
            <div className="field-row">
              <div className="field">
                <label>Certification Name</label>
                <input value={c.name} onChange={e => updateCert(i, 'name', e.target.value)} placeholder="AWS Solutions Architect" />
              </div>
              <div className="field">
                <label>Issuer</label>
                <input value={c.issuer} onChange={e => updateCert(i, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
              </div>
            </div>
            <div className="field">
              <label>Date</label>
              <input value={c.date} onChange={e => updateCert(i, 'date', e.target.value)} placeholder="March 2024" />
            </div>
          </div>
        ))}
        <button className="btn btn-ghost" onClick={addCert} style={{ width: '100%', justifyContent: 'center' }}>
          <Plus size={14} /> Add Certification
        </button>
      </CollapsibleSection>
    </div>
  );
}
