import styles from '../page.module.css';

interface LoadingScreenProps {
  name: string;
}

export function LoadingScreen({ name }: LoadingScreenProps) {
  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <div className={styles.icon}>🔧</div>
          <h1>Hey AI, fix my city</h1>
        </div>
        <div className={styles.loadingContent}>
          <h2>Hi, {name}</h2>
          <p>Thank you for participating in this workshop. Give us some time to calculate all scores to put you in the right team.</p>
          <div className={styles.spinner}></div>
        </div>
      </div>
    </main>
  );
} 