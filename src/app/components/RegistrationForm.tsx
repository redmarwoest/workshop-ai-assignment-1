import { useState } from 'react';
import styles from '../page.module.css';
import { ParticipantData } from '../types';

interface RegistrationFormProps {
  onSubmit: (data: ParticipantData) => Promise<void>;
  error: string | null;
}

export function RegistrationForm({ onSubmit, error }: RegistrationFormProps) {
  const [formData, setFormData] = useState<ParticipantData>({
    name: '',
    seniority: '',
    yearsOfExperience: 0,
    knowledgeInAI: 'none',
    areasOfInterest: [],
    problemSolvingApproach: '',
    aiImageSelection: ''
  });

  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof ParticipantData, string>>>({});

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ParticipantData, string>> = {};

    // Name validation
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters long';
    }

    // Seniority validation
    if (!formData.seniority) {
      errors.seniority = 'Please select your seniority level';
    }

    // Years of experience validation
    if (formData.yearsOfExperience < 0) {
      errors.yearsOfExperience = 'Years of experience cannot be negative';
    } else if (formData.yearsOfExperience > 50) {
      errors.yearsOfExperience = 'Please enter a valid years of experience';
    }

    // Areas of interest validation
    if (formData.areasOfInterest.length === 0) {
      errors.areasOfInterest = 'Please select at least one area of interest';
    }

    // Problem solving approach validation
    if (!formData.problemSolvingApproach) {
      errors.problemSolvingApproach = 'Please select your problem-solving approach';
    }

    // AI image selection validation
    if (!formData.aiImageSelection) {
      errors.aiImageSelection = 'Please select one of the images';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      await onSubmit(formData);
    }
  };

  const areasOfInterestOptions = [
    'Frontend Development',
    'Backend Development',
    'UI/UX Design',
    'Machine Learning',
    'DevOps',
    'Cloud Computing',
    'Mobile Development',
    'Data Science'
  ];

  return (
    <main className={styles.main}>
      <div className={styles.formContainer}>
        <div className={styles.header}>
          <div className={styles.icon}>🔧</div>
          <h1>Hey AI, fix my city</h1>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (validationErrors.name) {
                  setValidationErrors({ ...validationErrors, name: '' });
                }
              }}
              className={validationErrors.name ? styles.errorInput : ''}
            />
            {validationErrors.name && <div className={styles.fieldError}>{validationErrors.name}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="seniority">Seniority</label>
            <select
              id="seniority"
              value={formData.seniority}
              onChange={(e) => {
                setFormData({ ...formData, seniority: e.target.value });
                if (validationErrors.seniority) {
                  setValidationErrors({ ...validationErrors, seniority: '' });
                }
              }}
              className={validationErrors.seniority ? styles.errorInput : ''}
            >
              <option value="">Select your seniority level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-level</option>
              <option value="senior">Senior</option>
            </select>
            {validationErrors.seniority && <div className={styles.fieldError}>{validationErrors.seniority}</div>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="yearsOfExperience">Years of Experience</label>
            <input
              type="number"
              id="yearsOfExperience"
              min="0"
              max="50"
              value={formData.yearsOfExperience}
              onChange={(e) => {
                setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 });
                if (validationErrors.yearsOfExperience) {
                  setValidationErrors({ ...validationErrors, yearsOfExperience: '' });
                }
              }}
              className={validationErrors.yearsOfExperience ? styles.errorInput : ''}
            />
            {validationErrors.yearsOfExperience && (
              <div className={styles.fieldError}>{validationErrors.yearsOfExperience}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Knowledge in AI</label>
            <div className={styles.radioGroup}>
              {['None', 'Basic', 'Average', 'Intermediate', 'Expert'].map((level) => (
                <label key={level} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="knowledgeInAI"
                    value={level.toLowerCase()}
                    checked={formData.knowledgeInAI === level.toLowerCase()}
                    onChange={(e) => setFormData({ ...formData, knowledgeInAI: e.target.value })}
                  />
                  <span>{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Areas of Interest</label>
            <div className={styles.checkboxGroup}>
              {areasOfInterestOptions.map((area) => (
                <label key={area} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value={area}
                    checked={formData.areasOfInterest.includes(area)}
                    onChange={(e) => {
                      const newAreas = e.target.checked
                        ? [...formData.areasOfInterest, area]
                        : formData.areasOfInterest.filter(a => a !== area);
                      setFormData({ ...formData, areasOfInterest: newAreas });
                      if (validationErrors.areasOfInterest) {
                        setValidationErrors({ ...validationErrors, areasOfInterest: '' });
                      }
                    }}
                  />
                  <span>{area}</span>
                </label>
              ))}
            </div>
            {validationErrors.areasOfInterest && (
              <div className={styles.fieldError}>{validationErrors.areasOfInterest}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>Which of these images is AI generated?</label>
            <div className={styles.imageComparison}>
              <label className={styles.imageBox}>
                <input
                  type="radio"
                  name="aiImageSelection"
                  value="image1"
                  onChange={(e) => {
                    setFormData({ ...formData, aiImageSelection: e.target.value });
                    if (validationErrors.aiImageSelection) {
                      setValidationErrors({ ...validationErrors, aiImageSelection: '' });
                    }
                  }}
                  checked={formData.aiImageSelection === 'image1'}
                />
                <div className={styles.placeholderImage}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={styles.anonymous}>Image 1</span>
                </div>
              </label>
              <label className={styles.imageBox}>
                <input
                  type="radio"
                  name="aiImageSelection"
                  value="image2"
                  onChange={(e) => {
                    setFormData({ ...formData, aiImageSelection: e.target.value });
                    if (validationErrors.aiImageSelection) {
                      setValidationErrors({ ...validationErrors, aiImageSelection: '' });
                    }
                  }}
                  checked={formData.aiImageSelection === 'image2'}
                />
                <div className={styles.placeholderImage}>
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={styles.anonymous}>Image 2</span>
                </div>
              </label>
            </div>
            {validationErrors.aiImageSelection && (
              <div className={styles.fieldError}>{validationErrors.aiImageSelection}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label>How do you usually approach challenges or unfamiliar situations?</label>
            <div className={styles.radioGroup}>
              {[
                'I take charge and figure things out as I go.',
                'I research thoroughly before making a move.',
                'I ask others for input and collaborate on solutions.',
                'I wait and observe before acting.'
              ].map((approach) => (
                <label key={approach} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="problemSolvingApproach"
                    value={approach.toLowerCase().replace(/\s+/g, '_')}
                    checked={formData.problemSolvingApproach === approach.toLowerCase().replace(/\s+/g, '_')}
                    onChange={(e) => {
                      setFormData({ ...formData, problemSolvingApproach: e.target.value });
                      if (validationErrors.problemSolvingApproach) {
                        setValidationErrors({ ...validationErrors, problemSolvingApproach: '' });
                      }
                    }}
                  />
                  <span>{approach}</span>
                </label>
              ))}
            </div>
            {validationErrors.problemSolvingApproach && (
              <div className={styles.fieldError}>{validationErrors.problemSolvingApproach}</div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" required />
              <span>I am not a Robot</span>
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Send Information
          </button>
        </form>
      </div>
    </main>
  );
} 