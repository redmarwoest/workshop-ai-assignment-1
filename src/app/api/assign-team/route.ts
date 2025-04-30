import { NextResponse } from 'next/server';
import type { ParticipantData, ApiResponse } from '../../types';

const COPILOT_API_URL = 'https://api.microsoft.com/v1/copilot/chat';

async function analyzeCopilotResponse(response: any): Promise<{ team: number; reasoning: string }> {
  // Extract team number and reasoning from the response
  const responseText = response.choices[0].message.content;
  
  // Parse the response to extract team number and reasoning
  const teamMatch = responseText.match(/Team (\d+)/i);
  const team = teamMatch ? parseInt(teamMatch[1]) : Math.floor(Math.random() * 8) + 1;
  
  // Extract reasoning (everything after "Reasoning:" or similar)
  const reasoningMatch = responseText.match(/Reasoning:?\s*(.*)/i);
  const reasoning = reasoningMatch 
    ? reasoningMatch[1]
    : "Based on the participant's experience and skills, they would contribute well to this team's diversity.";

  return { team, reasoning };
}

export async function POST(request: Request) {
  try {
    const data: ParticipantData = await request.json();

    // Prepare the prompt for the LLM
    const prompt = `
      Please analyze this participant's data and assign them to a team (1-8) for a workshop of 40 participants.
      Each team should have 5 members and be balanced in terms of expertise and experience.
      
      Participant data:
      - Name: ${data.name}
      - Seniority: ${data.seniority}
      - Years of Experience: ${data.yearsOfExperience}
      - Knowledge in AI: ${data.knowledgeInAI}
      - Areas of Interest: ${data.areasOfInterest.join(', ')}
      - Problem Solving Approach: ${data.problemSolvingApproach}
      
      Please provide your response in the following format:
      Team X
      Reasoning: [Brief explanation of why this team is a good fit]
    `;

    if (!process.env.COPILOT_API_KEY) {
      throw new Error('COPILOT_API_KEY is not configured');
    }

    try {
      const copilotResponse = await fetch(COPILOT_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.COPILOT_API_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'system',
              content: 'You are a team assignment expert who analyzes participant data and assigns them to balanced teams.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        }),
      });

      if (!copilotResponse.ok) {
        throw new Error('Failed to get response from CoPilot API');
      }

      const result = await copilotResponse.json();
      const { team, reasoning } = await analyzeCopilotResponse(result);

      const response: ApiResponse = {
        success: true,
        data: { team, reasoning }
      };

      return NextResponse.json(response);
    } catch (error) {
      // Fallback to OpenAI if CoPilot fails
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('Neither COPILOT_API_KEY nor OPENAI_API_KEY is configured');
      }

      const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a team assignment expert who analyzes participant data and assigns them to balanced teams.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 150
        }),
      });

      if (!openaiResponse.ok) {
        throw new Error('Failed to get response from OpenAI API');
      }

      const result = await openaiResponse.json();
      const { team, reasoning } = await analyzeCopilotResponse(result);

      const response: ApiResponse = {
        success: true,
        data: { team, reasoning }
      };

      return NextResponse.json(response);
    }
  } catch (error) {
    console.error('Error in team assignment:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
      },
      { status: 500 }
    );
  }
} 