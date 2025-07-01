import React from 'react';
import useConjugaisonLogic from "../../Hooks/useConjugaisonLogic"
import SettingsModal from './components/SettingsModal';
import ExerciseView from "./components/ExerciseView"
import './ConjugaisonPage.css';

const ConjugaisonPage = () => {
  const logic = useConjugaisonLogic();

  if (logic.isLoading && !logic.isStarted) {
    return <div className="loading-container">Chargement des paramètres...</div>;
  }

  const isResultView = logic.exerciseData && logic.exerciseData.is_correct !== null;

  return (
    <div className="conjugaison-page-container">
      {logic.isSettingsOpen && (
        <SettingsModal
          availableTimes={logic.availableTimes}
          currentSettings={logic.settings}
          onConfirm={logic.handleSettingsConfirm}
          onCancel={logic.handleSettingsCancel}
          isStarted={logic.isStarted}
        />
      )}

      {logic.isStarted && logic.exerciseData && (
        <ExerciseView
          exerciseData={logic.exerciseData}
          userResponse={logic.userResponse}
          setUserResponse={logic.setUserResponse}
          handleConfirm={logic.handleConfirm}
          handleSkip={logic.handleSkip}
          handleShowLesson={logic.handleShowLesson}
          isSubmitting={logic.isSubmitting}
          isResultView={isResultView}
          setIsSettingsOpen={logic.setIsSettingsOpen}
        />
      )}
    </div>
  );
};

export default ConjugaisonPage;
