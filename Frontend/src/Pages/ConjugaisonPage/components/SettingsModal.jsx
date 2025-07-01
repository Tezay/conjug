import React, { useState, useEffect } from 'react';
import './SettingsModal.css';

const SettingsModal = ({ availableTimes, currentSettings, onConfirm, onCancel, isStarted }) => {
  const [settings, setSettings] = useState(currentSettings);

  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings]);

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
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Paramètres de l'exercice</h2>
        <form onSubmit={handleSubmit}>
          <div className="setting-group">
            <h4>Type de verbes</h4>
            <div className="radio-group">
              <label><input type="radio" name="verb_type" value="tous" checked={settings.verb_type === 'tous'} onChange={handleVerbTypeChange} /> Tous</label>
              <label><input type="radio" name="verb_type" value="regulier" checked={settings.verb_type === 'regulier'} onChange={handleVerbTypeChange} /> Réguliers</label>
              <label><input type="radio" name="verb_type" value="irregulier" checked={settings.verb_type === 'irregulier'} onChange={handleVerbTypeChange} /> Irréguliers</label>
            </div>
          </div>
          <div className="setting-group">
            <h4>Temps à réviser</h4>
            <div className="checkbox-group">
              {availableTimes.map(time => (
                <label key={time} className="checkbox-label">
                  <input type="checkbox" name={time} checked={!!settings.checked_times[time]} onChange={handleTimeChange} />
                  <span>{time.replace(/_/g, ' ')}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            {isStarted && <button type="button" onClick={onCancel} className="btn btn-secondary">Annuler</button>}
            <button type="submit" className="btn btn-primary">Confirmer</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
