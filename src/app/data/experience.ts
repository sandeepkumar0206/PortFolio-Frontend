export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  highlights: string[];
}

export const experiences: Experience[] = [
  {
    company: 'Magic EdTech',
    role: 'Software Engineer',
    period: 'Sept 2025 — Present',
    summary: '',
    highlights: [
      'Developed and maintained scalable production applications using React.js and Angular.',
      'Integrated Stripe payment workflows and built clean, reusable UI components following best practices.',
      'Collaborated closely with designers and backend teams to deliver high-quality features and improve overall application stability.',
    ],
  },
  {
    company: 'Magic EdTech',
    role: 'Software Engineer Intern',
    period: 'Apr 2025 — Aug 2025',
    summary: '',
    highlights: [
      'Assisted in building and maintaining production-level applications using React.js and Angular.',
      'Worked with Angular modules and standalone components to implement UI features.',
      'Collaborated with senior developers to fix bugs, optimize code, and improve application performance.',
    ],
  },
  {
    company: 'BridgeLabz',
    role: 'Fellowship Trainee (React Developer)',
    period: 'Nov 2024 — Apr 2025',
    summary: '',
    highlights: [
      'Completed a 4-month intensive fellowship focused on hands-on React.js and JavaScript application development.',
      'Developed scalable, reusable frontend components using React functional components, hooks, modern ES6+ features, and REST API integration.',
      'Followed component-driven development and Git-based workflows while actively participating in Agile ceremonies, sprint planning, and peer code reviews.',
    ],
  },
];
