
import { useState, useCallback } from 'react';

const MODEL = 'gemini-2.5-flash-lite';
const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models';

async function callGemini(apiKey, prompt) {
  const url = `${API_BASE}/${MODEL}:generateContent?key=${apiKey}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const msg = err?.error?.message || `API error ${response.status}`;
    throw new Error(msg);
  }

  const data = await response.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
}

export function useGemini(apiKey) {
  const [loading, setLoading] = useState({});
  const [errors, setErrors] = useState({});

  const setTaskState = (task, isLoading, error = null) => {
    setLoading(prev => ({ ...prev, [task]: isLoading }));
    setErrors(prev => ({ ...prev, [task]: error }));
  };

  const generateSummary = useCallback(async ({ name, jobTitle, yearsExp, strengths }) => {
    if (!apiKey) return null;
    setTaskState('summary', true);
    try {
      const prompt = `You are an expert resume writer. Write a compelling, ATS-optimized professional summary for a resume.

Candidate details:
- Name: ${name}
- Job Title: ${jobTitle}
- Years of Experience: ${yearsExp}
- Key Strengths: ${strengths}

Instructions:
- Write exactly 3-4 sentences
- Start with a strong opening (do NOT start with "I")
- Include the job title naturally
- Highlight key strengths and value proposition
- Use active, powerful language
- Make it human, not robotic
- Do NOT use phrases like "results-driven" or "passionate" — be specific and fresh
- Return ONLY the summary text, no labels or extra formatting`;

      const result = await callGemini(apiKey, prompt);
      setTaskState('summary', false);
      return result.trim();
    } catch (e) {
      setTaskState('summary', false, e.message);
      return null;
    }
  }, [apiKey]);

  // ── 2. Work Experience Bullet Point Enhancer ───────────────────────────
  const enhanceExperience = useCallback(async ({ company, role, duration, description }) => {
    if (!apiKey) return null;
    setTaskState('experience', true);
    try {
      const prompt = `You are a professional resume writer. Transform the following raw work experience into polished, ATS-friendly bullet points.

Company: ${company}
Role: ${role}
Duration: ${duration}
Raw description: ${description}

Instructions:
- Write 4-5 bullet points
- Start each with a strong action verb (e.g., Led, Built, Optimized, Reduced, Launched)
- Include quantifiable achievements where possible (use estimates if specific numbers aren't given)
- Focus on impact and outcomes, not just tasks
- Keep each bullet to 1-2 lines
- Return ONLY the bullet points, each on a new line starting with "•"
- No labels, no intro text`;

      const result = await callGemini(apiKey, prompt);
      setTaskState('experience', false);
      return result.trim();
    } catch (e) {
      setTaskState('experience', false, e.message);
      return null;
    }
  }, [apiKey]);

  // ── 3. Skills Suggester ────────────────────────────────────────────────
  const suggestSkills = useCallback(async ({ jobTitle, field }) => {
    if (!apiKey) return null;
    setTaskState('skills', true);
    try {
      const prompt = `You are a career expert. Suggest relevant skills for a ${jobTitle}${field ? ` in the ${field} field` : ''}.

Return a JSON object with this exact structure (no markdown, no code blocks, raw JSON only):
{
  "technical": ["skill1", "skill2", "skill3", "skill4", "skill5", "skill6"],
  "tools": ["tool1", "tool2", "tool3", "tool4"],
  "soft": ["skill1", "skill2", "skill3", "skill4"]
}

Rules:
- Technical: hard skills specific to the role (6 skills)
- Tools: software/platforms/frameworks (4 items)
- Soft: interpersonal & professional skills (4 skills)
- Be specific and relevant, not generic
- Return ONLY raw JSON, nothing else`;

      const result = await callGemini(apiKey, prompt);
      const cleaned = result.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      setTaskState('skills', false);
      return parsed;
    } catch (e) {
      setTaskState('skills', false, e.message);
      return null;
    }
  }, [apiKey]);

  // ── 4. Cover Letter Generator ──────────────────────────────────────────
  const generateCoverLetter = useCallback(async ({ applicantName, jobTitle, company, hiringManager, reason, experience }) => {
    if (!apiKey) return null;
    setTaskState('coverLetter', true);
    try {
      const managerLine = hiringManager ? `Hiring Manager: ${hiringManager}` : 'Hiring Manager: not specified (use "Dear Hiring Manager")';
      const prompt = `You are an expert career coach. Write a compelling, personalized cover letter.

Details:
- Applicant Name: ${applicantName}
- Applying for: ${jobTitle} at ${company}
- ${managerLine}
- Why they want this job: ${reason}
- Relevant experience summary: ${experience || 'Not specified'}

Instructions:
- Write a professional cover letter with 4 paragraphs:
  1. Opening: Hook + role they're applying for
  2. Why them: Key achievements and relevant skills
  3. Why this company: Genuine interest and cultural fit
  4. Closing: Strong CTA and sign-off
- Address it properly based on hiring manager name
- End with "Sincerely,\\n${applicantName}"
- Keep it under 350 words
- Warm, confident, and authentic tone — NOT stiff or generic
- Return ONLY the letter text, no labels`;

      const result = await callGemini(apiKey, prompt);
      setTaskState('coverLetter', false);
      return result.trim();
    } catch (e) {
      setTaskState('coverLetter', false, e.message);
      return null;
    }
  }, [apiKey]);

  return {
    generateSummary,
    enhanceExperience,
    suggestSkills,
    generateCoverLetter,
    loading,
    errors,
  };
}
