import { CareerRecommendation, CareerRoadmap, UserAnswers } from '@/types/career';

export const getRecommendations = (answers: UserAnswers): CareerRecommendation[] => {
  const recommendations: CareerRecommendation[] = [];
  
  // AI/ML Engineer path
  if (answers.interests.includes('Coding') || answers.interests.includes('Data')) {
    recommendations.push({
      id: 'ml-engineer',
      title: 'Machine Learning Engineer',
      matchScore: 95,
      salaryRange: '$120,000 - $180,000',
      description: 'Build intelligent systems that learn from data and make predictions',
      icon: 'Brain',
      color: 'primary'
    });
  }

  // Product Manager path
  if (answers.interests.includes('Management') || answers.interests.includes('Design')) {
    recommendations.push({
      id: 'product-manager',
      title: 'Product Manager',
      matchScore: 92,
      salaryRange: '$110,000 - $160,000',
      description: 'Lead product strategy and work with cross-functional teams',
      icon: 'Target',
      color: 'secondary'
    });
  }

  // UX Designer path
  if (answers.interests.includes('Design') || answers.interests.includes('Research')) {
    recommendations.push({
      id: 'ux-designer',
      title: 'UX Designer',
      matchScore: 88,
      salaryRange: '$85,000 - $140,000',
      description: 'Create intuitive and delightful user experiences',
      icon: 'Palette',
      color: 'primary'
    });
  }

  // Software Engineer path
  if (answers.interests.includes('Coding')) {
    recommendations.push({
      id: 'software-engineer',
      title: 'Full-Stack Developer',
      matchScore: 90,
      salaryRange: '$100,000 - $170,000',
      description: 'Build complete web applications from frontend to backend',
      icon: 'Code',
      color: 'secondary'
    });
  }

  // Data Scientist path
  if (answers.interests.includes('Data') || answers.interests.includes('Research')) {
    recommendations.push({
      id: 'data-scientist',
      title: 'Data Scientist',
      matchScore: 87,
      salaryRange: '$95,000 - $155,000',
      description: 'Extract insights from complex datasets to drive business decisions',
      icon: 'BarChart3',
      color: 'primary'
    });
  }

  // Content Strategist path
  if (answers.interests.includes('Writing') || answers.interests.includes('Marketing')) {
    recommendations.push({
      id: 'content-strategist',
      title: 'Content Strategist',
      matchScore: 85,
      salaryRange: '$70,000 - $120,000',
      description: 'Develop content strategies that engage and convert audiences',
      icon: 'PenTool',
      color: 'secondary'
    });
  }

  // Default recommendations if none match
  if (recommendations.length === 0) {
    recommendations.push(
      {
        id: 'business-analyst',
        title: 'Business Analyst',
        matchScore: 82,
        salaryRange: '$75,000 - $110,000',
        description: 'Bridge the gap between business needs and technical solutions',
        icon: 'Briefcase',
        color: 'primary'
      },
      {
        id: 'project-manager',
        title: 'Project Manager',
        matchScore: 80,
        salaryRange: '$80,000 - $130,000',
        description: 'Lead teams to deliver projects on time and within budget',
        icon: 'FolderKanban',
        color: 'secondary'
      }
    );
  }

  return recommendations.slice(0, 5).sort((a, b) => b.matchScore - a.matchScore);
};

export const getRoadmap = (careerId: string): CareerRoadmap => {
  const roadmaps: Record<string, CareerRoadmap> = {
    'ml-engineer': {
      careerId: 'ml-engineer',
      careerTitle: 'Machine Learning Engineer',
      nodes: [
        {
          id: 'foundation',
          title: 'Foundation',
          subtitle: 'Build your knowledge base',
          duration: '1-2 years',
          items: [
            "Bachelor's in Computer Science, Mathematics, or related field",
            "Master's degree (recommended) in ML/AI or Data Science",
            'Strong foundation in linear algebra, calculus, and statistics'
          ]
        },
        {
          id: 'skills',
          title: 'Key Skills',
          subtitle: 'Technical & soft skills to master',
          duration: 'Ongoing',
          items: [
            'Python, TensorFlow, PyTorch, Scikit-learn',
            'Deep Learning, NLP, Computer Vision',
            'Data preprocessing and feature engineering',
            'Communication and problem-solving'
          ]
        },
        {
          id: 'entry',
          title: 'Entry Level',
          subtitle: 'Your first roles in the field',
          duration: '1-3 years',
          items: [
            'Junior ML Engineer',
            'Data Scientist (ML focus)',
            'ML Research Assistant',
            'AI Software Developer'
          ]
        },
        {
          id: 'senior',
          title: 'Career Progression',
          subtitle: 'Advanced roles & leadership',
          duration: '5+ years',
          items: [
            'Senior ML Engineer',
            'ML Architect',
            'Principal Data Scientist',
            'Director of AI/ML'
          ]
        }
      ],
      courses: [
        { title: 'Machine Learning Specialization', provider: 'Coursera (Stanford)', duration: '3 months', url: '#' },
        { title: 'Deep Learning Specialization', provider: 'deeplearning.ai', duration: '4 months', url: '#' },
        { title: 'Fast.ai Practical Deep Learning', provider: 'Fast.ai', duration: '2 months', url: '#' }
      ],
      certifications: [
        { name: 'AWS Machine Learning Specialty', issuer: 'Amazon Web Services', importance: 'Recommended' },
        { name: 'TensorFlow Developer Certificate', issuer: 'Google', importance: 'Recommended' },
        { name: 'Azure AI Engineer Associate', issuer: 'Microsoft', importance: 'Optional' }
      ]
    },
    'product-manager': {
      careerId: 'product-manager',
      careerTitle: 'Product Manager',
      nodes: [
        {
          id: 'foundation',
          title: 'Foundation',
          subtitle: 'Build your knowledge base',
          duration: '2-4 years',
          items: [
            "Bachelor's in Business, Engineering, or related field",
            'MBA (helpful but not required)',
            'Understanding of technology and business fundamentals'
          ]
        },
        {
          id: 'skills',
          title: 'Key Skills',
          subtitle: 'Technical & soft skills to master',
          duration: 'Ongoing',
          items: [
            'Product strategy and roadmapping',
            'User research and data analysis',
            'Agile/Scrum methodologies',
            'Stakeholder management and communication'
          ]
        },
        {
          id: 'entry',
          title: 'Entry Level',
          subtitle: 'Your first roles in the field',
          duration: '2-3 years',
          items: [
            'Associate Product Manager',
            'Product Analyst',
            'Junior PM',
            'Product Marketing Coordinator'
          ]
        },
        {
          id: 'senior',
          title: 'Career Progression',
          subtitle: 'Advanced roles & leadership',
          duration: '5+ years',
          items: [
            'Senior Product Manager',
            'Director of Product',
            'VP of Product',
            'Chief Product Officer'
          ]
        }
      ],
      courses: [
        { title: 'Product Management Certificate', provider: 'Product School', duration: '2 months', url: '#' },
        { title: 'Digital Product Management', provider: 'Coursera (UVA)', duration: '4 months', url: '#' },
        { title: 'Become a Product Manager', provider: 'Udemy', duration: '1.5 months', url: '#' }
      ],
      certifications: [
        { name: 'Certified Scrum Product Owner', issuer: 'Scrum Alliance', importance: 'Essential' },
        { name: 'Product-Led Growth Certificate', issuer: 'Pendo', importance: 'Recommended' },
        { name: 'PMP Certification', issuer: 'PMI', importance: 'Optional' }
      ]
    }
  };

  // Default roadmap template
  const defaultRoadmap: CareerRoadmap = {
    careerId,
    careerTitle: 'Career Path',
    nodes: [
      {
        id: 'foundation',
        title: 'Foundation',
        subtitle: 'Build your knowledge base',
        duration: '2-4 years',
        items: [
          'Relevant bachelor\'s degree',
          'Industry certifications',
          'Foundational skills development'
        ]
      },
      {
        id: 'skills',
        title: 'Key Skills',
        subtitle: 'Technical & soft skills',
        duration: 'Ongoing',
        items: [
          'Technical expertise',
          'Communication skills',
          'Problem-solving abilities',
          'Industry tools proficiency'
        ]
      },
      {
        id: 'entry',
        title: 'Entry Level',
        subtitle: 'First roles in the field',
        duration: '1-3 years',
        items: [
          'Junior/Associate positions',
          'Internships',
          'Entry-level specialist roles'
        ]
      },
      {
        id: 'senior',
        title: 'Career Progression',
        subtitle: 'Advanced roles',
        duration: '5+ years',
        items: [
          'Senior specialist',
          'Team lead',
          'Director/Manager',
          'Executive roles'
        ]
      }
    ],
    courses: [
      { title: 'Industry Fundamentals', provider: 'Coursera', duration: '2 months', url: '#' },
      { title: 'Advanced Skills', provider: 'LinkedIn Learning', duration: '3 months', url: '#' }
    ],
    certifications: [
      { name: 'Industry Certification', issuer: 'Professional Body', importance: 'Recommended' }
    ]
  };

  return roadmaps[careerId] || defaultRoadmap;
};

export const interests = [
  'Coding',
  'Design',
  'Management',
  'Writing',
  'Data',
  'Research',
  'Marketing',
  'Sales',
  'Finance',
  'Healthcare'
];

export const qualifications = [
  'High School',
  "Bachelor's Degree",
  "Master's Degree",
  'PhD',
  'Professional Certification'
];

export const futurePlans = [
  { value: 'startup', label: 'Start my own business' },
  { value: 'remote', label: 'Work remotely with flexibility' },
  { value: 'research', label: 'Pursue research & innovation' },
  { value: 'leadership', label: 'Lead and manage teams' },
  { value: 'freelance', label: 'Freelance & consult' },
  { value: 'corporate', label: 'Climb the corporate ladder' }
];
