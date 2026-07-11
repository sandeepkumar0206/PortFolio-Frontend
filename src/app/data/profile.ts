export interface Profile {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  focusAreas: string[];
  email: string;
  location: string;
  resumeUrl: string;
  socials: { label: string; url: string }[];
}

export const profile: Profile = {
  name: 'Sandeep Kumar',
  role: 'Software Engineer',
  tagline:
    'I build scalable web applications with React and Angular — from reusable UI components to REST APIs, payments, and production-ready features.',
  bio: `B.E. graduate from Chitkara University (CGPA 9.56) and Software Engineer at Magic EdTech. I work across the stack with React.js, Angular, TypeScript, and Node.js — integrating payments, auth, and clean component architecture. I enjoy solving hard problems (900+ LeetCode) and shipping features that hold up in production.`,
  focusAreas: [
    'React & Angular — components, state, and routing',
    'REST APIs, JWT auth, and database integration',
    'Stripe workflows, performance, and team collaboration',
  ],
  email: 'sandeepkumar073113@gmail.com',
  location: 'India',
  resumeUrl: '/resume.pdf',
  socials: [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/' },
    { label: 'Email', url: 'mailto:sandeepkumar073113@gmail.com' },
  ],
};

export const aboutStats = [
  { value: '900+', label: 'LeetCode Problems' },
  { value: '9.56', label: 'CGPA (Chitkara)' },
  { value: '5★', label: 'HackerRank' },
];

export const aboutQuote =
  'Strong problem-solving backed by practice — and code that stays maintainable in production.';
