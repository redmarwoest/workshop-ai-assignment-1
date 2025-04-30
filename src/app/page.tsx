'use client';

import { useState } from 'react';
import { RegistrationForm } from './components/RegistrationForm';
import { LoadingScreen } from './components/LoadingScreen';
import { TeamAssignmentScreen } from './components/TeamAssignmentScreen';
import type { ParticipantData, TeamAssignment } from './types';
import { assignTeam } from './utils/api';

type Screen = 'form' | 'loading' | 'team-assignment';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('form');
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<ParticipantData | null>(null);
  const [teamAssignment, setTeamAssignment] = useState<TeamAssignment | null>(null);

  const handleSubmit = async (data: ParticipantData) => {
    setFormData(data);
    setError(null);
    setCurrentScreen('loading');

    try {
      const response = await assignTeam(data);
      if (response.success && response.data) {
        setTeamAssignment(response.data);
        setCurrentScreen('team-assignment');
      } else {
        throw new Error(response.error || 'Failed to assign team');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCurrentScreen('form');
    }
  };

  if (currentScreen === 'loading' && formData) {
    return <LoadingScreen name={formData.name} />;
  }

  if (currentScreen === 'team-assignment' && formData && teamAssignment) {
    return <TeamAssignmentScreen name={formData.name} teamAssignment={teamAssignment} />;
  }

  return <RegistrationForm onSubmit={handleSubmit} error={error} />;
}
