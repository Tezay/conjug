import { useState } from "react";
import ActionBar from "./ActionBar";
import LlamaIllustration from "../../components/common/LlamaIllustration";

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
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  return (
    <div className="flex w-full h-full relative">
      {/* Overlay pour mobile quand le panneau est ouvert */}
      {isSidePanelOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10 lg:hidden"
          onClick={() => setIsSidePanelOpen(false)}
        />
      )}

      {/* Side Panel */}
      <div className={`
        w-80 flex-shrink-0 bg-base-200 flex flex-col border-r border-base-300 transition-transform duration-300 z-20
        lg:relative lg:translate-x-0
        fixed h-full
        ${isSidePanelOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 flex flex-col h-full">
          {/* Header avec bouton fermer sur mobile */}
          <div className="flex items-center justify-between mb-4 lg:block">
            <h3 className="text-lg font-semibold mt-0 border-b border-base-300 pb-2 flex-1">
              Paramètres Actuels
            </h3>
            <button 
              className="btn btn-square btn-ghost btn-sm lg:hidden ml-2"
              onClick={() => setIsSidePanelOpen(false)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-grow overflow-auto lg:pb-8">
            <div className="mb-4">
              <p className="font-bold text-base-content/70 mb-1">
                <strong>Type :</strong>
              </p>
              <span className="capitalize font-normal">{exerciseData.verb_type}</span>
            </div>
            <div className="mb-4">
              <p className="font-bold text-base-content/70 mb-2">
                <strong>Temps :</strong>
              </p>
              <ul className="list-none pl-0 font-normal space-y-2">
                {Object.entries(exerciseData.checked_times)
                  .filter(([, checked]) => checked)
                  .map(([time]) => (
                    <li 
                      key={time} 
                      className="bg-base-300 py-1 px-3 rounded capitalize text-base-content"
                    >
                      {time.replace(/_/g, " ")}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          
          <div className="mt-auto pt-4">
            <button 
              onClick={() => setIsSettingsOpen(true)} 
              className="btn btn-secondary w-full"
            >
              Modifier
            </button>
          </div>
        </div>
      </div>

      {/* Bouton flèche pour ouvrir le panneau sur mobile */}
      <button
        className={`
          fixed left-2 top-20 z-30 btn btn-primary btn-sm lg:hidden transition-all duration-300 flex items-center gap-2
          ${isSidePanelOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}
        `}
        onClick={() => setIsSidePanelOpen(true)}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-xs">Paramètres</span>
      </button>

      {/* Main Exercise Area */}
      <main className="flex-1 flex flex-col justify-center items-center p-4 md:p-8 relative lg:ml-0">
        <div className="w-full h-full flex flex-col justify-center items-center pb-24">
          
          {/* Section Question avec Lama et Bulle de dialogue */}
          <div className="mb-8 w-full flex justify-center">
            <LlamaIllustration 
              size="lg"
              className="transition-all duration-300"
              exerciseData={exerciseData}
            />
          </div>

          {/* Zone de réponse */}
          <div className="w-full max-w-lg h-15 flex justify-center items-center px-4">
            <input
              type="text"
              className="input input-bordered w-full text-xl text-center h-15 rounded-3xl focus:border-primary transition-colors shadow-lg border-2 border-gray-200"
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
            <div className={`alert mt-4 w-full max-w-lg text-center rounded-3xl shadow-lg ${
              exerciseData.is_correct ? 'alert-success' : 'alert-error'
            }`}>
              {exerciseData.is_correct
                ? "Bonne réponse !"
                : `Faux. La bonne réponse était : ${exerciseData.correct_answer}`}
            </div>
          )}

          {exerciseData.message && !isResultView && (
            <p className="absolute bottom-24 text-info text-lg">
              {exerciseData.message}
            </p>
          )}
        </div>
        
        <ActionBar
          onSkip={handleSkip}
          onConfirm={handleConfirm}
          onShowLesson={handleShowLesson}
          isResult={isResultView}
          isSubmitting={isSubmitting}
        />
      </main>
    </div>
  );
};

export default ExerciseView;
