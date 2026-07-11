export interface SkillGroup {
  category: string;
  icon: 'layers' | 'database' | 'cloud';
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: 'layers',
    skills: [
      'React.js',
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML & CSS',
      'Redux',
      'Material UI',
      'Tailwind CSS',
    ],
  },
  {
    category: 'Backend & Data',
    icon: 'database',
    skills: [
      'Java',
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT',
      'MongoDB',
      'SQL',
      'Spring Boot',
    ],
  },
  {
    category: 'Tools & Practices',
    icon: 'cloud',
    skills: [
      'Git & GitHub',
      'GitLab',
      'Linux',
      'Postman',
      'Jira',
      'Agile / Scrum',
      'Problem Solving',
    ],
  },
];
