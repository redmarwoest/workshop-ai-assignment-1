import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { TeamAssignmentService } from './services/teamAssignment';
import { Participant } from './types/participant';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Team assignment endpoint
app.post('/api/assign-teams', async (req: Request, res: Response) => {
  try {
    const participants: Participant[] = req.body.participants;
    
    if (!participants || !Array.isArray(participants)) {
      return res.status(400).json({ error: 'Invalid participants data' });
    }

    console.log(`Received team assignment request for ${participants.length} participants`);
    const teams = await TeamAssignmentService.assignTeams(participants);
    console.log(`Successfully assigned ${teams.length} teams`);
    
    res.json({ teams });
  } catch (error) {
    console.error('Error in team assignment:', error);
    res.status(500).json({ 
      error: 'Failed to assign teams',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 