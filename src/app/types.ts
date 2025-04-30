export type ParticipantData = {
  name: string;
  seniority: string;
  yearsOfExperience: number;
  knowledgeInAI: string;
  areasOfInterest: string[];
  problemSolvingApproach: string;
  aiImageSelection: string;
};

export type TeamAssignment = {
  team: number;
  reasoning: string;
};

export type ApiResponse = {
  success: boolean;
  data?: TeamAssignment;
  error?: string;
}; 