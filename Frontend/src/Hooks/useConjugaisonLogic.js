import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { fetchInitialData, postConjugaisonRequest } from "../Services/conjugaisonService";

const useConjugaisonLogic = () => {
  const location = useLocation();
  const lang = location.pathname.replace("/", "");

  const [isStarted, setIsStarted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(true);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [settings, setSettings] = useState({ verb_type: "tous", checked_times: {} });
  const [exerciseData, setExerciseData] = useState(null);
  const [userResponse, setUserResponse] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const postRequest = useCallback(async (body) => {
    setIsSubmitting(true);
    try {
      const data = await postConjugaisonRequest(lang, body);
      setExerciseData(data);
      if (data.is_correct === null) {
        setUserResponse("");
      }
    } catch (err) {
      console.error("Erreur lors de la requête POST", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [lang]);

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const data = await fetchInitialData(lang);
        setAvailableTimes(data.time_keys || []);
        const initialChecked = {};
        if (data.time_keys?.length > 0) {
          initialChecked[data.time_keys[0]] = true;
        }
        setSettings((prev) => ({ ...prev, checked_times: initialChecked }));
      } catch (e) {
        console.error("Erreur fetch initial", e);
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [lang]);

  const handleSettingsConfirm = async (newSettings) => {
    setIsLoading(true);
    setIsSettingsOpen(false);
    setSettings(newSettings);

    const body = { temps: "true", verb_type: newSettings.verb_type };
    for (const time in newSettings.checked_times) {
      if (newSettings.checked_times[time]) {
        body[time] = "on";
      }
    }

    await postRequest(body);
    if (!isStarted) setIsStarted(true);
    setIsLoading(false);
  };

  const isResultView = useMemo(() => {
    return exerciseData && exerciseData.is_correct !== null;
  }, [exerciseData]);

  return {
    lang,
    isStarted,
    isSettingsOpen,
    availableTimes,
    settings,
    exerciseData,
    userResponse,
    isLoading,
    isSubmitting,
    isResultView,
    setIsSettingsOpen,
    setUserResponse,
    handleSettingsConfirm,
    handleSettingsCancel: () => { if (isStarted) setIsSettingsOpen(false); },
    handleConfirm: () => {
      const response = userResponse.trim();
      if (response) postRequest({ reponse: response });
    },
    handleSkip: () => postRequest({ continue: "true" }),
    handleShowLesson: () => alert("Fonctionnalité 'Voir la leçon' à implémenter."),
  };
};

export default useConjugaisonLogic;
