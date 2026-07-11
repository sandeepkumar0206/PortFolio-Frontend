export interface Project {
  title: string;
  highlights: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  year?: string;
}

export const projects: Project[] = [
  {
    title: 'Movie Explorer Web Application',
    tags: ['React.js', 'TypeScript', 'Redux', 'Tailwind CSS', 'Stripe'],
    highlights: [
      'Developed a responsive movie discovery platform with Home, Login, Admin, Movie Details, and Wishlist pages using React Router.',
      'Implemented Redux for centralized state management to efficiently handle user data and movie listings.',
      'Integrated Stripe for subscription-based payments and Firebase for push notifications.',
    ],
  },
  {
    title: 'PG Finder System',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    highlights: [
      'Built a PG listing and booking platform with filters based on city, pricing, and available amenities.',
      'Developed REST APIs using Express.js and stored PG and user data in MongoDB.',
      'Implemented secure authentication using JWT and bcrypt for password encryption.',
    ],
  },
  {
    title: 'Online Book Store',
    tags: ['React.js', 'TypeScript', 'Redux'],
    highlights: [
      'Developed an online book shopping application featuring product browsing, cart management, and user authentication.',
      'Managed cart and user state using Redux and implemented navigation using React Router.',
      'Designed responsive and reusable UI components using TypeScript and custom CSS.',
    ],
  },
];
