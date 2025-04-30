import { ParticipantData, ApiResponse } from '../types';

export async function assignTeam(data: ParticipantData): Promise<ApiResponse> {
  try {
    const response = await fetch('/api/assign-team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to assign team');
    }

    return await response.json();
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
} 