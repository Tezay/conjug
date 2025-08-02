import { useState, useEffect } from 'react';
import { loadFlagIcon, flagConfigs, type SupportedLanguage } from '../../services/flagService';

interface FlagIconProps {
  langCode: SupportedLanguage;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  fallback?: React.ReactNode;
}

const sizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4', 
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8'
} as const;

const FlagIcon: React.FC<FlagIconProps> = ({ 
  langCode, 
  size = 'md', 
  className = '',
  fallback 
}) => {
  const [flagUrl, setFlagUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadFlag = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        
        const url = await loadFlagIcon(langCode);
        
        if (isMounted) {
          if (url) {
            setFlagUrl(url);
          } else {
            setHasError(true);
          }
        }
      } catch (error) {
        if (isMounted) {
          setHasError(true);
          console.error(`Failed to load flag for ${langCode}:`, error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(true);
        }
      }
    };

    loadFlag();

    return () => {
      isMounted = false;
    };
  }, [langCode]);

  const config = flagConfigs[langCode];
  const sizeClass = sizeClasses[size];

  // État de chargement
  if (isLoading && !flagUrl) {
    return (
      <div className={`${sizeClass} ${className} bg-base-300 animate-pulse rounded-sm flex-shrink-0`} />
    );
  }

  // État d'erreur avec fallback
  if (hasError || !flagUrl) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div 
        className={`${sizeClass} ${className} bg-base-300 rounded-sm flex items-center justify-center flex-shrink-0`}
        title={config?.title || langCode.toUpperCase()}
      >
        <span className="text-xs font-bold text-base-content/50">
          {langCode.toUpperCase()}
        </span>
      </div>
    );
  }

  // Drapeau chargé avec succès
  return (
    <img
      src={flagUrl}
      alt={config?.alt || `Drapeau ${langCode}`}
      title={config?.title || langCode.toUpperCase()}
      className={`${sizeClass} ${className} object-cover rounded-sm flex-shrink-0`}
      loading="lazy"
      onError={() => setHasError(true)}
    />
  );
};

export default FlagIcon;
