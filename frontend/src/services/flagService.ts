// Service centralisé pour gérer les drapeaux
interface FlagConfig {
  icon: string;
  alt: string;
  title: string;
}

// Import des drapeaux depuis le dossier assets
const flagIcons = {
  es: () => import('../assets/flags/es.svg?url'),
  it: () => import('../assets/flags/it.svg?url'),
} as const;

// Configuration des drapeaux avec métadonnées
export const flagConfigs: Record<string, FlagConfig> = {
  es: {
    icon: '',
    alt: 'Drapeau de l\'Espagne',
    title: 'Espagnol'
  },
  it: {
    icon: '',
    alt: 'Drapeau de l\'Italie', 
    title: 'Italien'
  }
} as const;

// Cache pour les URLs des drapeaux
const flagCache = new Map<string, string>();

/**
 * Charge dynamiquement l'URL d'un drapeau
 */
export const loadFlagIcon = async (langCode: string): Promise<string | null> => {
  if (flagCache.has(langCode)) {
    return flagCache.get(langCode)!;
  }

  try {
    const flagImport = flagIcons[langCode as keyof typeof flagIcons];
    if (!flagImport) {
      console.warn(`Flag not found for language: ${langCode}`);
      return null;
    }

    const flagModule = await flagImport();
    const flagUrl = flagModule.default || flagModule;
    
    flagCache.set(langCode, flagUrl);
    flagConfigs[langCode].icon = flagUrl;
    
    return flagUrl;
  } catch (error) {
    console.error(`Error loading flag for ${langCode}:`, error);
    return null;
  }
};

/**
 * Précharge tous les drapeaux disponibles
 */
export const preloadFlags = async (): Promise<void> => {
  const loadPromises = Object.keys(flagIcons).map(loadFlagIcon);
  await Promise.allSettled(loadPromises);
};

export type SupportedLanguage = keyof typeof flagIcons;
