const ActionBar = ({ onSkip, onConfirm, onShowLesson, isResult, isSubmitting }) => {
  return (
    <div className="absolute bottom-0 left-0 w-full bg-base-100 flex justify-between items-center px-8 py-4 shadow-lg z-10 border-t border-base-300">
      <button 
        onClick={onSkip} 
        className="btn btn-secondary" 
        disabled={isResult || isSubmitting}
      >
        Passer
      </button>
      
      <button onClick={onShowLesson} className="btn btn-info">
        Voir la leçon
      </button>
      
      <button 
        onClick={isResult ? onSkip : onConfirm} 
        className="btn btn-primary" 
        disabled={isSubmitting}
      >
        {isResult ? 'Suivant' : 'Confirmer'}
      </button>
    </div>
  );
};

export default ActionBar;
