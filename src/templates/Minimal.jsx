// templates/Minimal.jsx
// Ultra-clean minimal resume — lots of whitespace, simple typography

import React from 'react';

export default function Minimal({ data }) {
  const { personal, experience, education, projects, certifications, skills } = data;

  return (
    <div style={{
      fontFamily: '"DM Sans", "Helvetica Neue", Arial, sans-serif',
      color: '#111',
      background: '#ffffff',
      padding: '52px 60px',
      minHeight: '1100px',
      maxWidth: '820px',
      margin: '0 auto',
      fontSize: '13px',
      lineHeight: '1.7',
    }}>
      {/* Name + title */}
      <div style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '300', letterSpacing: '-0.5px', color: '#0a0a0a', margin: '0 0 4px' }}>
          {personal.name || 'Your Name'}
        </h1>
        <p style={{ fontSize: '14px', color: '#3b82f6', fontWeight: '500', margin: '0 0 12px' }}>
          {personal.jobTitle || 'Professional Title'}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '12px', color: '#555' }}>
          {personal.email && <span>{personal.email}</span>}
          {personal.phone && <span>{personal.phone}</span>}
          {personal.location && <span>{personal.location}</span>}
          {personal.linkedin && <span>{personal.linkedin}</span>}
        </div>
      </div>

      {personal.summary && (
        <MinSection>
          <p style={{ color: '#333', maxWidth: '560px', fontWeight: '300', fontSize: '14px' }}>{personal.summary}</p>
        </MinSection>
      )}

      {experience?.length > 0 && experience[0].company && (
        <MinSection title="Experience">
          {experience.map((exp, i) => (
            <div key={i} style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', color: '#0a0a0a' }}>{exp.role}</span>
                <span style={{ color: '#999', fontSize: '12px' }}>{exp.duration}</span>
              </div>
              <div style={{ color: '#3b82f6', fontSize: '12px', marginBottom: '8px' }}>{exp.company}</div>
              <div style={{ color: '#444', whiteSpace: 'pre-line', fontWeight: '300' }}>{exp.bullets || exp.description}</div>
            </div>
          ))}
        </MinSection>
      )}

      {education?.length > 0 && education[0].institution && (
        <MinSection title="Education">
          {education.map((edu, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <span style={{ fontWeight: '600', color: '#0a0a0a' }}>{edu.degree}</span>
                <span style={{ color: '#555', marginLeft: '8px', fontSize: '12px' }}>{edu.institution}</span>
                {edu.gpa && <span style={{ color: '#999', marginLeft: '8px', fontSize: '11px' }}>GPA {edu.gpa}</span>}
              </div>
              <span style={{ color: '#999', fontSize: '12px' }}>{edu.year}</span>
            </div>
          ))}
        </MinSection>
      )}

      {skills?.length > 0 && (
        <MinSection title="Skills">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {skills.map((s, i) => (
              <span key={i} style={{
                padding: '3px 12px',
                borderRadius: '2px',
                background: '#f1f5f9',
                color: '#334155',
                fontSize: '12px',
                fontWeight: '400',
              }}>{s}</span>
            ))}
          </div>
        </MinSection>
      )}

      {projects?.length > 0 && projects[0].title && (
        <MinSection title="Projects">
          {projects.map((p, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <span style={{ fontWeight: '600', color: '#0a0a0a' }}>{p.title}</span>
              {p.techStack && <span style={{ color: '#3b82f6', fontSize: '11px', marginLeft: '8px' }}>{p.techStack}</span>}
              <p style={{ color: '#444', fontWeight: '300', marginTop: '2px' }}>{p.description}</p>
              {p.link && <a href={p.link} style={{ color: '#3b82f6', fontSize: '11px' }}>{p.link}</a>}
            </div>
          ))}
        </MinSection>
      )}

      {certifications?.length > 0 && certifications[0].name && (
        <MinSection title="Certifications">
          {certifications.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ color: '#333' }}>{c.name}{c.issuer ? `, ${c.issuer}` : ''}</span>
              <span style={{ color: '#999', fontSize: '11px' }}>{c.date}</span>
            </div>
          ))}
        </MinSection>
      )}
    </div>
  );
}

function MinSection({ title, children }) {
  return (
    <div style={{ marginBottom: '28px' }}>
      {title && (
        <div style={{
          fontSize: '10px', fontWeight: '700', textTransform: 'uppercase',
          letterSpacing: '2px', color: '#999', marginBottom: '12px',
        }}>{title}</div>
      )}
      {children}
    </div>
  );
}
