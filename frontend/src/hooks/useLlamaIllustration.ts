import { useState, useEffect, useCallback, useRef } from 'react';
import { getRandomLlama, getRandomLlamaExcluding, loadLlamaImage, type LlamaAsset } from '../services/llamaService';

interface UseLlamaIllustrationReturn {
  currentLlama: LlamaAsset | null;
  imageUrl: string | null;
  isLoading: boolean;
  hasError: boolean;
  refreshLlama: () => void;
}

interface ExerciseData {
  verb?: string;
  time?: string;
  pronouns?: string;
  is_correct?: boolean | null;
}

export const useLlamaIllustration = (exerciseData?: ExerciseData): UseLlamaIllustrationReturn => {
  const [currentLlama, setCurrentLlama] = useState<LlamaAsset | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  // Référence pour suivre la question précédente
  const previousQuestionRef = useRef<string>('');

  const loadLlama = useCallback(async (llama: LlamaAsset) => {
    try {
      setIsLoading(true);
      setHasError(false);
      
      const url = await loadLlamaImage(llama);
      setImageUrl(url);
      setCurrentLlama(llama);
    } catch (error) {
      console.error('Error loading llama:', error);
      setHasError(true);
      setImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshLlama = useCallback(() => {
    const newLlama = getRandomLlamaExcluding(currentLlama?.id);
    loadLlama(newLlama);
  }, [loadLlama, currentLlama?.id]);

  // Charger un lama initial
  useEffect(() => {
    if (!currentLlama) {
      const initialLlama = getRandomLlama();
      loadLlama(initialLlama);
    }
  }, [loadLlama, currentLlama]);

  // Détecter les changements de question et changer de lama
  useEffect(() => {
    if (!exerciseData || !exerciseData.verb || !exerciseData.time || !exerciseData.pronouns) {
      return;
    }

    // Créer un identifiant unique pour la question actuelle
    const currentQuestion = `${exerciseData.verb}-${exerciseData.time}-${exerciseData.pronouns}`;
    
    // Si c'est une nouvelle question (et pas juste un changement d'état de réponse)
    if (previousQuestionRef.current && 
        previousQuestionRef.current !== currentQuestion && 
        exerciseData.is_correct === null) {
      refreshLlama();
    }
    
    // Mettre à jour la référence
    previousQuestionRef.current = currentQuestion;
  }, [exerciseData, refreshLlama]);

  return {
    currentLlama,
    imageUrl,
    isLoading,
    hasError,
    refreshLlama
  };
};
