export interface LlamaAsset {
  id: string;
  alt: string;
}

/**
 * Remarque : place tes images dans src/assets/llamas/
 * Exemple : src/assets/llamas/llama1.png
 *
 * On utilise `?url` pour que Vite retourne directement l'URL de l'asset.
 */
const llamaImports = {
  llama1: () => import('../assets/llamas/llama1.png?url'),
  llama2: () => import('../assets/llamas/llama2.png?url'),
  llama3: () => import('../assets/llamas/llama3.png?url'),
  llama4: () => import('../assets/llamas/llama4.png?url'),
  llama5: () => import('../assets/llamas/llama5.png?url'),
  llama6: () => import('../assets/llamas/llama6.png?url'),
  llama7: () => import('../assets/llamas/llama7.png?url'),
} as const;

export const llamaConfigs: Record<keyof typeof llamaImports, LlamaAsset> = {
  llama1: { id: 'llama1', alt: 'Lama 1' },
  llama2: { id: 'llama2', alt: 'Lama 2' },
  llama3: { id: 'llama3', alt: 'Lama 3' },
  llama4: { id: 'llama4', alt: 'Lama 4' },
  llama5: { id: 'llama5', alt: 'Lama 5' },
  llama6: { id: 'llama6', alt: 'Lama 6' },
  llama7: { id: 'llama7', alt: 'Lama 7' },
};

const llamaCache = new Map<keyof typeof llamaImports, string>();

/**
 * Charge dynamiquement l'URL d'un lama.
 * Accepte soit un LlamaAsset (objet), soit directement l'id du lama.
 */
export const loadLlamaImage = async (
    llamaOrId: LlamaAsset | keyof typeof llamaImports | string
): Promise<string> => {
  // normaliser la clé
  const key = (typeof llamaOrId === 'string' ? llamaOrId : llamaOrId.id) as keyof typeof llamaImports;

  const importer = (llamaImports as any)[key] as (() => Promise<any>) | undefined;
  if (!importer) {
    throw new Error(`No llama asset found for id "${key}"`);
  }

  if (llamaCache.has(key)) {
    return llamaCache.get(key)!;
  }

  try {
    const module = await importer();
    // Vite returns the URL as default export when using ?url
    const url = (module && (module.default || module)) as string;
    llamaCache.set(key, url);
    return url;
  } catch (err) {
    console.error(`Failed to load llama image for ${key}:`, err);
    throw err;
  }
};

/** Retourne un lama aléatoire (objet metadata only) */
export const getRandomLlama = (): LlamaAsset => {
  const keys = Object.keys(llamaConfigs) as (keyof typeof llamaImports)[];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return llamaConfigs[randomKey];
};

/** Retourne un lama aléatoire différent de excludeId (si fourni) */
export const getRandomLlamaExcluding = (excludeId?: string): LlamaAsset => {
  const keys = Object.keys(llamaConfigs).filter(k => k !== excludeId) as (keyof typeof llamaImports)[];
  if (keys.length === 0) return getRandomLlama();
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return llamaConfigs[randomKey];
};

/** Retourne tous les lamas disponbles (metadata uniquement) */
export const getAllLlamas = (): LlamaAsset[] => Object.values(llamaConfigs);

/** Précharge toutes les images (utile au lancement de l'app) */
export const preloadLlamas = async (): Promise<void> => {
  const keys = Object.keys(llamaImports) as (keyof typeof llamaImports)[];
  await Promise.allSettled(keys.map(k => loadLlamaImage(k)));
};

export type SupportedLlama = keyof typeof llamaImports;
