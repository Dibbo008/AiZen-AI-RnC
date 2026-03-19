// templates/Classic.jsx
// Classic professional resume template — clean, traditional layout

import React from 'react';

export default function Classic({ data }) {
  const { personal, experience, education, projects, certifications, skills } = data;

  return (
    <div style={{
      fontFamily: 'Georgia, "Times New Roman", serif',
      color: '#1a1a2e',
      background: '#ffffff',
      padding: '48px 52px',
      minHeight: '1100px',
      maxWidth: '820px',
      margin: '0 auto',
      fontSize: '13px',
      lineHeight: '1.6',
    }}>
      {/* Header */}
      <div style={{ textAlign: 'center', borderBottom: '2px solid #1a1a2e', paddingBottom: '16px', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 4px', letterSpacing: '1px', color: '#0f0f23' }}>
          {personal.name || 'Your Name'}
        </h1>
        <p style={{ fontSize: '14px', color: '#444', margin: '0 0 8px', fontStyle: 'italic' }}>
          {personal.jobTitle || 'Professional Title'}
        </p>
        <div style={{ fontSize: '12px', color: '#555', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '16px' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {/* Summary */}
      {personal.summary && (
        <Section title="Professional Summary">
          <p style={{ color: '#333', textAlign: 'justify' }}>{personal.summary}</p>
        </Section>
      )}

      {/* Experience */}
      {experience?.length > 0 && experience[0].company && (
        <Section title="Work Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <strong style={{ fontSize: '14px', color: '#0f0f23' }}>{exp.role}</strong>
                <span style={{ fontSize: '11px', color: '#666' }}>{exp.duration}</span>
              </div>
              <div style={{ color: '#2563eb', fontSize: '12px', marginBottom: '6px' }}>{exp.company}</div>
              <div style={{ color: '#444', whiteSpace: 'pre-line', fontSize: '12px' }}>{exp.bullets || exp.description}</div>
            </div>
          ))}
        </Section>
      )}

      {/* Education */}
      {education?.length > 0 && education[0].institution && (
        <Section title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div>
                <strong style={{ color: '#0f0f23' }}>{edu.degree}</strong>
                <div style={{ color: '#555', fontSize: '12px' }}>{edu.institution}{edu.gpa ? ` — GPA: ${edu.gpa}` : ''}</div>
              </div>
              <span style={{ fontSize: '11px', color: '#666' }}>{edu.year}</span>
            </div>
          ))}
        </Section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <Section title="Skills">
          <p style={{ color: '#333' }}>{skills.join(' • ')}</p>
        </Section>
      )}

      {/* Projects */}
      {projects?.length > 0 && projects[0].title && (
        <Section title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#0f0f23' }}>{p.title}</strong>
              {p.techStack && <span style={{ color: '#2563eb', fontSize: '11px', marginLeft: '8px' }}>[{p.techStack}]</span>}
              {p.link && <a href={p.link} style={{ color: '#2563eb', fontSize: '11px', marginLeft: '8px' }}>{p.link}</a>}
              <p style={{ color: '#444', fontSize: '12px', marginTop: '3px' }}>{p.description}</p>
            </div>
          ))}
        </Section>
      )}

      {/* Certifications */}
      {certifications?.length > 0 && certifications[0].name && (
        <Section title="Certifications">
          {certifications.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: '#333' }}>{c.name}{c.issuer ? ` — ${c.issuer}` : ''}</span>
              <span style={{ fontSize: '11px', color: '#666' }}>{c.date}</span>
            </div>
          ))}
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: '18px' }}>
      <h2 style={{
        fontSize: '13px',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1.5px',
        color: '#0f0f23',
        borderBottom: '1px solid #ccc',
        paddingBottom: '4px',
        marginBottom: '10px',
      }}>{title}</h2>
      {children}
    </div>
  );
}
