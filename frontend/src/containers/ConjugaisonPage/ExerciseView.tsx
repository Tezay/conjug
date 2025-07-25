import ActionBar from "./ActionBar";

const ExerciseView = ({
  exerciseData,
  userResponse,
  setUserResponse,
  handleConfirm,
  handleSkip,
  handleShowLesson,
  isSubmitting,
  isResultView,
  setIsSettingsOpen,
}) => {
  return (
    <div className="exercise-layout">
      <div className="side-panel">
        <h3>Paramètres Actuels</h3>
        <div className="settings-info">
          <p>
            <strong>Type :</strong>{" "}
            <span className="setting-value">{exerciseData.verb_type}</span>
          </p>
          <p><strong>Temps :</strong></p>
          <ul>
            {Object.entries(exerciseData.checked_times)
              .filter(([, checked]) => checked)
              .map(([time]) => (
                <li key={time}>{time.replace(/_/g, " ")}</li>
              ))}
          </ul>
        </div>
        <button onClick={() => setIsSettingsOpen(true)} className="btn btn-secondary">
          Modifier
        </button>
      </div>

      <main className="main-exercise-area">
        <div className="question-box">
          <p className="verb-to-conjugate">{exerciseData.verb}</p>
          <p className="pronoun-and-time">
            {exerciseData.pronouns} ({exerciseData.time})
          </p>
        </div>

        <div className="answer-box">
          <input
            type="text"
            className="answer-input"
            value={isResultView ? (exerciseData.user_answer || "") : userResponse}
            onChange={(e) => setUserResponse(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && !isResultView && handleConfirm()}
            placeholder="Votre réponse..."
            autoFocus
            disabled={isResultView || isSubmitting}
            autoComplete="off"
          />
        </div>

        {isResultView && (
          <div className={`feedback ${exerciseData.is_correct ? "correct" : "incorrect"}`}>
            {exerciseData.is_correct
              ? "Bonne réponse !"
              : `Faux. La bonne réponse était : ${exerciseData.correct_answer}`}
          </div>
        )}

        {exerciseData.message && !isResultView && (
          <p className="info-message">{exerciseData.message}</p>
        )}
      </main>

      <ActionBar
        onSkip={handleSkip}
        onConfirm={handleConfirm}
        onShowLesson={handleShowLesson}
        isResult={isResultView}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ExerciseView;
