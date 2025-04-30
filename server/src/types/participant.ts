export type SeniorityLevel = 'Junior' | 'Mid' | 'Senior' | 'Lead';
export type AIKnowledgeLevel = 'None' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type ProblemSolvingApproach = 'Analytical' | 'Creative' | 'Systematic' | 'Intuitive';

export interface Participant {
  name: string;
  seniority: SeniorityLevel;
  yearsOfExperience: number;
  aiKnowledge: AIKnowledgeLevel;
  areasOfInterest: string[];
  problemSolvingApproach: ProblemSolvingApproach;
  aiTestScore: number;
  isHuman: boolean;
}

export interface Team {
  id: number;
  members: Participant[];
  reasoning: string;
} 