import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import SettingsModal from './components/SettingsModal';
import ActionBar from './components/ActionBar';
import './ConjugaisonPage.css';

const ConjugaisonPage = () => {
  const location = useLocation();
  const lang = location.pathname.replace('/', '');

  const [isStarted, setIsStarted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [settings, setSettings] = useState({ verb_type: 'all', checked_times: {} });
  const [exerciseData, setExerciseData] = useState(null);
  const [userResponse, setUserResponse] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postRequest = useCallback(async (body) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`/${lang}`, {
        method: 'POST',
        body: new URLSearchParams(body),
      });
      const data = await response.json();
      setExerciseData(data);
      // Clear pas la réponse de l'utilisateur : besoin pour affichage résultat
      if (data.is_correct === null) {
        setUserResponse('');
      }
    } catch (error) {
      console.error("Erreur lors de la requête POST", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [lang]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/${lang}`);
        const data = await response.json();
        setAvailableTimes(data.time_keys || []);
        const initialCheckedTimes = {};
        if (data.time_keys && data.time_keys.length > 0) {
          initialCheckedTimes[data.time_keys[0]] = true;
        }
        setSettings(prev => ({ ...prev, checked_times: initialCheckedTimes }));
      } catch (error) {
        console.error("Failed to fetch initial data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [lang]);

  const handleSettingsConfirm = async (newSettings) => {
    setIsLoading(true);
    setIsSettingsOpen(false);
    setSettings(newSettings);

    const body = { temps: 'true', verb_type: newSettings.verb_type };
    for (const time in newSettings.checked_times) {
      if (newSettings.checked_times[time]) {
        body[time] = 'on';
      }
    }
    await postRequest(body);
    if (!isStarted) setIsStarted(true);
    setIsLoading(false);
  };

  const handleConfirm = () => {
    if (userResponse.trim()) {
      postRequest({ reponse: userResponse });
    }
  };

  const handleSkip = () => {
    postRequest({ continue: 'true' });
  };

  const handleShowLesson = () => {
    alert("Fonctionnalité 'Voir la leçon' à implémenter.");
  };

  if (isLoading && !isStarted) {
    return <div className="loading-container">Chargement des paramètres...</div>;
  }

  const isResultView = exerciseData && exerciseData.is_correct !== null;

  return (
    <div className="conjugaison-page-container">
      {isSettingsOpen && (
        <SettingsModal
          availableTimes={availableTimes}
          currentSettings={settings}
          onConfirm={handleSettingsConfirm}
          onCancel={() => { if (isStarted) setIsSettingsOpen(false); }}
          isStarted={isStarted}
        />
      )}

      {isStarted && exerciseData && (
        <div className="exercise-layout">
          <div className="side-panel">
            <h3>Paramètres Actuels</h3>
            <div className="settings-info">
              <p><strong>Type :</strong> <span className="setting-value">{exerciseData.verb_type}</span></p>
              <p><strong>Temps :</strong></p>
              <ul>
                {Object.entries(exerciseData.checked_times)
                  .filter(([, checked]) => checked)
                  .map(([time]) => <li key={time}>{time.replace(/_/g, ' ')}</li>)}
              </ul>
            </div>
            <button onClick={() => setIsSettingsOpen(true)} className="btn btn-secondary">
              Modifier
            </button>
          </div>

          <main className="main-exercise-area">
            <div className="question-box">
              <p className="verb-to-conjugate">{exerciseData.verb}</p>
              <p className="pronoun-and-time">{exerciseData.pronouns} ({exerciseData.time})</p>
            </div>

            <div className="answer-box">
              <input
                type="text"
                className="answer-input"
                value={isResultView ? (exerciseData.user_answer || '') : userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isResultView && handleConfirm()}
                placeholder="Votre réponse..."
                autoFocus
                disabled={isResultView || isSubmitting}
                autoComplete="off"
              />
            </div>

            {isResultView && (
              <div className={`feedback ${exerciseData.is_correct ? 'correct' : 'incorrect'}`}>
                {exerciseData.is_correct ? "Bonne réponse !" : `Faux. La bonne réponse était : ${exerciseData.correct_answer}`}
              </div>
            )}
            
            {exerciseData.message && !isResultView && <p className="info-message">{exerciseData.message}</p>}
          </main>

          <ActionBar
            onSkip={handleSkip}
            onConfirm={handleConfirm}
            onShowLesson={handleShowLesson}
            isResult={isResultView}
            isSubmitting={isSubmitting}
          />
        </div>
      )}
    </div>
  );
};

export default ConjugaisonPage;
