import styles from '../page.module.css';
import { TeamAssignment } from '../types';

interface TeamAssignmentScreenProps {
  name: string;
  teamAssignment: TeamAssignment;
}

export function TeamAssignmentScreen({ name, teamAssignment }: TeamAssignmentScreenProps) {
  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <div className={styles.icon}>🔧</div>
          <h1>Hey AI, fix my city</h1>
        </div>
        <div className={styles.teamContent}>
          <h2>Hi, {name}</h2>
          <p>Congratulations on making the cut! Below you will find your team. Go to the designated table for this team and introduce yourself.</p>
          <div className={styles.teamAssignment}>
            <h3>TEAM {teamAssignment.team}</h3>
            <p className={styles.reasoning}>{teamAssignment.reasoning}</p>
          </div>
        </div>
      </div>
    </main>
  );
} 