import { Participant, Team } from '../types/participant';

export class TeamAssignmentService {
  private static readonly TEAM_SIZE = 5;
  private static readonly TOTAL_TEAMS = 8;

  public static async assignTeams(participants: Participant[]): Promise<Team[]> {
    try {
      // First, validate the number of participants
      if (participants.length !== this.TEAM_SIZE * this.TOTAL_TEAMS) {
        throw new Error(`Expected ${this.TEAM_SIZE * this.TOTAL_TEAMS} participants, got ${participants.length}`);
      }

      // Mock AI team assignment
      return this.mockTeamAssignment(participants);
    } catch (error) {
      console.error('Error in team assignment:', error);
      // Fallback to a simple round-robin assignment if mock fails
      return this.fallbackTeamAssignment(participants);
    }
  }

  private static mockTeamAssignment(participants: Participant[]): Team[] {
    const teams: Team[] = [];
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < this.TOTAL_TEAMS; i++) {
      const start = i * this.TEAM_SIZE;
      const end = start + this.TEAM_SIZE;
      const teamMembers = shuffled.slice(start, end);
      
      // Generate mock reasoning based on team composition
      const reasoning = this.generateMockReasoning(teamMembers);
      
      teams.push({
        id: i + 1,
        members: teamMembers,
        reasoning
      });
    }
    
    return teams;
  }

  private static generateMockReasoning(members: Participant[]): string {
    const seniorityCounts = members.reduce((acc, member) => {
      acc[member.seniority] = (acc[member.seniority] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const aiKnowledgeLevels = members.map(m => m.aiKnowledge);
    const uniqueApproaches = new Set(members.map(m => m.problemSolvingApproach));

    return `This team was formed with a balanced mix of:
    - Seniority levels: ${Object.entries(seniorityCounts).map(([level, count]) => `${count} ${level}`).join(', ')}
    - AI knowledge levels: ${aiKnowledgeLevels.join(', ')}
    - Problem-solving approaches: ${Array.from(uniqueApproaches).join(', ')}
    The team composition ensures a good mix of experience and diverse perspectives.`;
  }

  private static fallbackTeamAssignment(participants: Participant[]): Team[] {
    const teams: Team[] = [];
    const shuffled = [...participants].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < this.TOTAL_TEAMS; i++) {
      const start = i * this.TEAM_SIZE;
      const end = start + this.TEAM_SIZE;
      teams.push({
        id: i + 1,
        members: shuffled.slice(start, end),
        reasoning: 'Fallback round-robin assignment'
      });
    }
    
    return teams;
  }
} 