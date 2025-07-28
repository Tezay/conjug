import { useState, useEffect, useRef } from 'react';

const SettingsModal = ({ availableTimes, currentSettings, onConfirm, onCancel, isStarted }) => {
  const [settings, setSettings] = useState(currentSettings);
  const modalRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings]);

  useEffect(() => {
    modalRef.current?.showModal();
  }, []);

  const handleTimeChange = (e) => {
    const { name, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      checked_times: { ...prev.checked_times, [name]: checked }
    }));
  };

  const handleVerbTypeChange = (e) => {
    setSettings(prev => ({ ...prev, verb_type: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const activeTimes = Object.values(settings.checked_times).some(v => v);
    if (!activeTimes) {
      alert("Veuillez sélectionner au moins un temps.");
      return;
    }
    onConfirm(settings);
    modalRef.current?.close();
  };

  const handleCancel = () => {
    onCancel();
    modalRef.current?.close();
  }

  return (
    <dialog ref={modalRef} id="settings_modal" className="modal">
      <div className="modal-box">
        <h2 className="text-2xl font-bold mb-8 text-base-content text-center">Paramètres de l'exercice</h2>
        <form onSubmit={handleSubmit} method="dialog">
          <div className="mb-6 text-left">
            <h4 className="text-lg font-semibold mb-3 pb-2 border-b border-base-300 text-base-content">
              Type de verbes
            </h4>
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="verb_type" 
                  value="tous" 
                  checked={settings.verb_type === 'tous'} 
                  onChange={handleVerbTypeChange}
                  className="radio radio-primary"
                /> 
                <span className="capitalize">Tous</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="verb_type" 
                  value="regulier" 
                  checked={settings.verb_type === 'regulier'} 
                  onChange={handleVerbTypeChange}
                  className="radio radio-primary"
                /> 
                <span className="capitalize">Réguliers</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name="verb_type" 
                  value="irregulier" 
                  checked={settings.verb_type === 'irregulier'} 
                  onChange={handleVerbTypeChange}
                  className="radio radio-primary"
                /> 
                <span className="capitalize">Irréguliers</span>
              </label>
            </div>
          </div>
          
          <div className="mb-6 text-left">
            <h4 className="text-lg font-semibold mb-3 pb-2 border-b border-base-300 text-base-content">
              Temps à réviser
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {availableTimes.map(time => (
                <label key={time} className="flex items-center gap-2 cursor-pointer capitalize">
                  <input 
                    type="checkbox" 
                    name={time} 
                    checked={!!settings.checked_times[time]} 
                    onChange={handleTimeChange}
                    className="checkbox checkbox-primary"
                  />
                  <span>{time.replace(/_/g, ' ')}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="modal-action flex justify-end gap-4 mt-8">
            {isStarted && (
              <button 
                type="button" 
                onClick={handleCancel} 
                className="btn btn-secondary"
              >
                Annuler
              </button>
            )}
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              Confirmer
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default SettingsModal;
