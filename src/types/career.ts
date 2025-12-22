export interface UserAnswers {
  qualification: string;
  major: string;
  interests: string[];
  futurePlan: string;
}

export interface CareerRecommendation {
  id: string;
  title: string;
  matchScore: number;
  salaryRange: string;
  description: string;
  icon: string;
  color: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  subtitle: string;
  items: string[];
  duration?: string;
}

export interface CareerRoadmap {
  careerId: string;
  careerTitle: string;
  nodes: RoadmapNode[];
  courses: {
    title: string;
    provider: string;
    duration: string;
    url: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    importance: 'Essential' | 'Recommended' | 'Optional';
  }[];
}
