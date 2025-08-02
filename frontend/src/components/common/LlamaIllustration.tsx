import { useLlamaIllustration } from '../../hooks/useLlamaIllustration';

interface LlamaIllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onImageLoad?: () => void;
  exerciseData?: {
    verb?: string;
    time?: string;
    pronouns?: string;
    is_correct?: boolean | null;
  };
}

const sizeClasses = {
  sm: 'w-16 h-16 md:w-20 md:h-20',
  md: 'w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28',
  lg: 'w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40'
} as const;

const LlamaIllustration: React.FC<LlamaIllustrationProps> = ({ 
  className = '',
  size = 'lg',
  onImageLoad,
  exerciseData
}) => {
  const { imageUrl, isLoading, hasError, currentLlama } = useLlamaIllustration(exerciseData);

  const sizeClass = sizeClasses[size];

  // Composant pour la bulle de dialogue
  const SpeechBubble = () => {
    if (!exerciseData?.verb || !exerciseData?.time || !exerciseData?.pronouns) {
      return null;
    }

    return (
      <div className="relative min-w-0 ml-3 md:ml-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 z-0">
          <div className="w-0 h-0 border-t-[16px] border-b-[16px] border-r-[20px] border-transparent border-r-white drop-shadow-sm"></div>
        </div>
        
        {/* Bulle de dialogue */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-lg border-2 border-gray-100 relative z-10">
          <div className="text-center">
            {/* Verbe principal */}
            <div className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-2 md:mb-3 break-words leading-tight">
              {exerciseData.verb}
            </div>
            
            {/* Temps et pronom */}
            <div className="text-sm md:text-lg lg:text-xl text-gray-600 font-medium capitalize leading-relaxed">
              <span className="inline-block">{exerciseData.pronouns}</span>
              <span className="mx-2 text-gray-400">•</span>
              <span className="inline-block">{exerciseData.time}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Conteneur principal avec lama et bulle
  const LlamaWithBubble = () => (
    <div className="flex items-center gap-0 w-full max-w-4xl px-2 md:px-4 justify-center">
      {/* Lama */}
      <div className="flex-shrink-0">
        <div className={`${sizeClass} ${className} flex-shrink-0`}>
          <img
            src={imageUrl}
            alt={currentLlama?.alt || 'Lama illustratif'}
            className="w-full h-full object-contain rounded-lg filter drop-shadow-sm"
            style={{ imageRendering: 'pixelated' }}
            loading="lazy"
            onLoad={onImageLoad}
            onError={() => console.error('Failed to display llama image')}
          />
        </div>
      </div>
      
      {/* Bulle de dialogue */}
      <SpeechBubble />
    </div>
  );

  // État de chargement
  if (isLoading && !imageUrl) {
    return (
      <div className="flex items-center gap-0 w-full max-w-4xl px-2 md:px-4 justify-center">
        <div className={`${sizeClass} ${className} bg-base-300 animate-pulse rounded-lg flex items-center justify-center flex-shrink-0`}>
          <svg 
            className="w-8 h-8 text-base-content/30" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
          />
          </svg>
        </div>
        <div className="relative min-w-0 ml-3 md:ml-6 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="bg-gray-200 animate-pulse rounded-2xl md:rounded-3xl h-16 md:h-20 lg:h-24"></div>
        </div>
      </div>
    );
  }

  // État d'erreur
  if (hasError || !imageUrl) {
    return (
      <div className="flex items-center gap-0 w-full max-w-4xl px-2 md:px-4 justify-center">
        <div className={`${sizeClass} ${className} bg-base-200 border-2 border-dashed border-base-300 rounded-lg flex items-center justify-center flex-shrink-0`}>
          <div className="text-center">
            <svg 
              className="w-6 h-6 text-base-content/50 mx-auto mb-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span className="text-xs text-base-content/50">🦙</span>
          </div>
        </div>
        <SpeechBubble />
      </div>
    );
  }

  // Image chargée avec succès
  return <LlamaWithBubble />;
};

export default LlamaIllustration;
