export interface LlamaAsset {
  id: string;
  path: string;
  alt: string;
}

// Configuration des lamas disponibles
const LLAMA_ASSETS: LlamaAsset[] = [
  { id: 'llama1', path: '/src/assets/llamas/llama1.png', alt: 'Lama 1' },
  { id: 'llama2', path: '/src/assets/llamas/llama2.png', alt: 'Lama 2' },
  { id: 'llama3', path: '/src/assets/llamas/llama3.png', alt: 'Lama 3' },
  { id: 'llama4', path: '/src/assets/llamas/llama4.png', alt: 'Lama 4' },
  { id: 'llama5', path: '/src/assets/llamas/llama5.png', alt: 'Lama 5' },
  { id: 'llama6', path: '/src/assets/llamas/llama6.png', alt: 'Lama 6' },
  { id: 'llama7', path: '/src/assets/llamas/llama7.png', alt: 'Lama 7' },
];

/**
 * Sélectionne un lama aléatoirement parmi ceux disponibles
 */
export const getRandomLlama = (): LlamaAsset => {
  const randomIndex = Math.floor(Math.random() * LLAMA_ASSETS.length);
  return LLAMA_ASSETS[randomIndex];
};

/**
 * Charge l'image d'un lama de manière asynchrone
 */
export const loadLlamaImage = async (llama: LlamaAsset): Promise<string> => {
  try {
    // Import dynamique de l'asset
    const module = await import(llama.path);
    return module.default;
  } catch (error) {
    console.error(`Failed to load llama image: ${llama.id}`, error);
    throw error;
  }
};

/**
 * Obtient tous les lamas disponibles
 */
export const getAllLlamas = (): LlamaAsset[] => {
  return [...LLAMA_ASSETS];
};

/**
 * Sélectionne un lama différent du précédent
 */
export const getRandomLlamaExcluding = (excludeId?: string): LlamaAsset => {
  if (!excludeId || LLAMA_ASSETS.length <= 1) {
    return getRandomLlama();
  }
  
  const availableLlamas = LLAMA_ASSETS.filter(llama => llama.id !== excludeId);
  const randomIndex = Math.floor(Math.random() * availableLlamas.length);
  return availableLlamas[randomIndex];
};
