import './ActionBar.css';

const ActionBar = ({ onSkip, onConfirm, onShowLesson, isResult, isSubmitting }) => {
  return (
    <div className="action-bar">
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
