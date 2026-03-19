// templates/Modern.jsx
// Modern two-column resume with blue sidebar

import React from 'react';

export default function Modern({ data }) {
  const { personal, experience, education, projects, certifications, skills } = data;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '220px 1fr',
      fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
      color: '#1e293b',
      background: '#ffffff',
      minHeight: '1100px',
      maxWidth: '820px',
      margin: '0 auto',
      fontSize: '12.5px',
    }}>
      {/* Sidebar */}
      <div style={{ background: '#1e3a5f', color: '#e2ecf9', padding: '36px 20px', minHeight: '100%' }}>
        {/* Avatar placeholder */}
        <div style={{
          width: '80px', height: '80px', borderRadius: '50%',
          background: 'rgba(59,130,246,0.3)',
          border: '3px solid rgba(59,130,246,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px', fontWeight: '700', color: '#93c5fd',
          margin: '0 auto 16px',
        }}>
          {(personal.name || 'A')[0].toUpperCase()}
        </div>

        <h1 style={{ fontSize: '17px', fontWeight: '700', textAlign: 'center', color: '#fff', marginBottom: '4px' }}>
          {personal.name || 'Your Name'}
        </h1>
        <p style={{ textAlign: 'center', color: '#93c5fd', fontSize: '11px', marginBottom: '20px' }}>
          {personal.jobTitle || 'Professional Title'}
        </p>

        <SideSection title="Contact">
          {personal.email && <SideItem icon="✉" text={personal.email} />}
          {personal.phone && <SideItem icon="📱" text={personal.phone} />}
          {personal.location && <SideItem icon="📍" text={personal.location} />}
          {personal.linkedin && <SideItem icon="🔗" text={personal.linkedin} />}
        </SideSection>

        {skills?.length > 0 && (
          <SideSection title="Skills">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
              {skills.map((s, i) => (
                <span key={i} style={{
                  background: 'rgba(59,130,246,0.2)',
                  border: '1px solid rgba(59,130,246,0.4)',
                  color: '#93c5fd',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '11px',
                }}>{s}</span>
              ))}
            </div>
          </SideSection>
        )}

        {certifications?.length > 0 && certifications[0].name && (
          <SideSection title="Certifications">
            {certifications.map((c, i) => (
              <div key={i} style={{ marginBottom: '6px' }}>
                <div style={{ color: '#e2ecf9', fontSize: '11px', fontWeight: '600' }}>{c.name}</div>
                {c.issuer && <div style={{ color: '#93c5fd', fontSize: '10px' }}>{c.issuer}</div>}
                {c.date && <div style={{ color: '#6b8fb5', fontSize: '10px' }}>{c.date}</div>}
              </div>
            ))}
          </SideSection>
        )}
      </div>

      {/* Main content */}
      <div style={{ padding: '36px 32px' }}>
        {/* Summary */}
        {personal.summary && (
          <MainSection title="About Me" color="#1e3a5f">
            <p style={{ color: '#475569', lineHeight: '1.7' }}>{personal.summary}</p>
          </MainSection>
        )}

        {/* Experience */}
        {experience?.length > 0 && experience[0].company && (
          <MainSection title="Experience" color="#1e3a5f">
            {experience.map((exp, i) => (
              <div key={i} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                  <strong style={{ color: '#1e293b', fontSize: '13px' }}>{exp.role}</strong>
                  <span style={{ background: '#dbeafe', color: '#1d4ed8', padding: '1px 8px', borderRadius: '4px', fontSize: '10px' }}>{exp.duration}</span>
                </div>
                <div style={{ color: '#3b82f6', fontWeight: '600', fontSize: '11px', marginBottom: '6px' }}>{exp.company}</div>
                <div style={{ color: '#4b5563', whiteSpace: 'pre-line', fontSize: '12px' }}>{exp.bullets || exp.description}</div>
              </div>
            ))}
          </MainSection>
        )}

        {/* Education */}
        {education?.length > 0 && education[0].institution && (
          <MainSection title="Education" color="#1e3a5f">
            {education.map((edu, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <strong style={{ color: '#1e293b' }}>{edu.degree}</strong>
                  <div style={{ color: '#64748b', fontSize: '11px' }}>{edu.institution}</div>
                  {edu.gpa && <div style={{ color: '#64748b', fontSize: '11px' }}>GPA: {edu.gpa}</div>}
                </div>
                <span style={{ color: '#3b82f6', fontSize: '11px', whiteSpace: 'nowrap' }}>{edu.year}</span>
              </div>
            ))}
          </MainSection>
        )}

        {/* Projects */}
        {projects?.length > 0 && projects[0].title && (
          <MainSection title="Projects" color="#1e3a5f">
            {projects.map((p, i) => (
              <div key={i} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <strong style={{ color: '#1e293b' }}>{p.title}</strong>
                  {p.techStack && <span style={{ color: '#3b82f6', fontSize: '10px' }}>{p.techStack}</span>}
                </div>
                <p style={{ color: '#4b5563', fontSize: '11px', marginTop: '3px' }}>{p.description}</p>
                {p.link && <a href={p.link} style={{ color: '#3b82f6', fontSize: '10px' }}>{p.link}</a>}
              </div>
            ))}
          </MainSection>
        )}
      </div>
    </div>
  );
}

function SideSection({ title, children }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div style={{
        fontSize: '9px', fontWeight: '700', textTransform: 'uppercase',
        letterSpacing: '2px', color: '#3b82f6', marginBottom: '8px',
        borderBottom: '1px solid rgba(59,130,246,0.3)', paddingBottom: '4px',
      }}>{title}</div>
      {children}
    </div>
  );
}

function SideItem({ icon, text }) {
  return (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '5px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '10px' }}>{icon}</span>
      <span style={{ fontSize: '10px', color: '#b8d0ec', wordBreak: 'break-all' }}>{text}</span>
    </div>
  );
}

function MainSection({ title, children, color }) {
  return (
    <div style={{ marginBottom: '22px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
        <div style={{ width: '4px', height: '18px', background: color, borderRadius: '2px' }} />
        <h2 style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', color }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}
