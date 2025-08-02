import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from '../../api/axiosInstance';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    institution: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptPrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setSubmitError('');
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Le prénom est requis';
    }
    
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Le nom est requis';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    
    if (!formData.username.trim()) {
      newErrors.username = 'Le nom d\'utilisateur est requis';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères';
    } else if (!/^[a-zA-Z0-9._-]+$/.test(formData.username)) {
      newErrors.username = 'Le nom d\'utilisateur ne peut contenir que des lettres, chiffres, points, tirets et underscores';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }
    
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Vous devez accepter les conditions d\'utilisation';
    }
    
    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = 'Vous devez accepter la politique de confidentialité';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setSubmitError('');
    
    try {
      const registerData = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        username: formData.username.toLowerCase(),
        institution: formData.institution,
        password: formData.password
      };
      
      const response = await axios.post('/register', new URLSearchParams(registerData));
      
      if (response.data.retour === 'trueCreation') {
        // Inscription réussie - rafraîchir le statut d'authentification
        await refreshAuth();
        navigate('/');
      } else {
        // Gestion des erreurs spécifiques du backend
        switch (response.data.retour) {
          case 'false username':
            setSubmitError('Ce nom d\'utilisateur est déjà pris');
            break;
          case 'false email':
            setSubmitError('Cette adresse email est déjà utilisée');
            break;
          default:
            setSubmitError('Une erreur est survenue lors de la création du compte');
        }
      }
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      setSubmitError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-base-100 px-4 py-8">
      <div className="card w-full max-w-2xl bg-base-200 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">Créer un compte</h1>
            <p className="text-base-content/70">
              Rejoignez Conjug.fr pour améliorer votre conjugaison
            </p>
          </div>

          {/* Alert pour erreur globale */}
          {submitError && (
            <div className="alert alert-error mb-4">
              <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span>{submitError}</span>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Prénom et Nom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Prénom *</span>
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="Votre prénom"
                  className={`input input-bordered w-full ${errors.first_name ? 'input-error' : ''}`}
                  disabled={isLoading}
                />
                {errors.first_name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.first_name}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Nom *</span>
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  className={`input input-bordered w-full ${errors.last_name ? 'input-error' : ''}`}
                  disabled={isLoading}
                />
                {errors.last_name && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.last_name}</span>
                  </label>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Adresse email *</span>
              </label>
              <label className={`input input-bordered validator w-full ${errors.email ? 'input-error' : ''}`}>
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </g>
                </svg>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="votre@email.com"
                  required
                  disabled={isLoading}
                />
              </label>
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email}</span>
                </label>
              )}
            </div>

            {/* Nom d'utilisateur */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Nom d'utilisateur *</span>
              </label>
              <label className={`input input-bordered validator w-full ${errors.username ? 'input-error' : ''}`}>
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2.5"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </g>
                </svg>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="nom_utilisateur"
                  required
                  pattern="[a-zA-Z0-9._-]+"
                  minLength="3"
                  maxLength="30"
                  title="Lettres, chiffres, points, tirets et underscores uniquement"
                  disabled={isLoading}
                />
              </label>
              {errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.username}</span>
                </label>
              )}
              <p className="validator-hint text-sm text-base-content/60 mt-1">
                Doit contenir entre 3 et 30 caractères
                <br />Lettres, chiffres, points, tirets et underscores uniquement
              </p>
            </div>

            {/* Établissement */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Établissement</span>
                <span className="label-text-alt text-base-content/60">(facultatif)</span>
              </label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                placeholder="Nom de votre école/université"
                className="input input-bordered w-full"
                disabled={isLoading}
              />
            </div>

            {/* Mots de passe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Mot de passe *</span>
                </label>
                <label className={`input input-bordered validator w-full ${errors.password ? 'input-error' : ''}`}>
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                      ></path>
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength="6"
                    disabled={isLoading}
                  />
                </label>
                {errors.password && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.password}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Confirmer le mot de passe *</span>
                </label>
                <label className={`input input-bordered validator w-full ${errors.confirmPassword ? 'input-error' : ''}`}>
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"
                      ></path>
                      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
                    </g>
                  </svg>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                    minLength="6"
                    disabled={isLoading}
                  />
                </label>
                {errors.confirmPassword && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.confirmPassword}</span>
                  </label>
                )}
              </div>
            </div>

            {/* Acceptation des conditions - après les mots de passe */}
            <div className="space-y-4 mt-6">
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleChange}
                    className={`checkbox checkbox-primary ${errors.acceptTerms ? 'checkbox-error' : ''}`}
                    disabled={isLoading}
                  />
                  <span className="label-text text-sm">
                    J'accepte les{' '}
                    <Link to="/terms" className="link link-primary" target="_blank" rel="noopener noreferrer">
                      conditions d'utilisation
                    </Link>
                    {' '}*
                  </span>
                </label>
                {errors.acceptTerms && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.acceptTerms}</span>
                  </label>
                )}
              </div>

              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    name="acceptPrivacy"
                    checked={formData.acceptPrivacy}
                    onChange={handleChange}
                    className={`checkbox checkbox-primary ${errors.acceptPrivacy ? 'checkbox-error' : ''}`}
                    disabled={isLoading}
                  />
                  <span className="label-text text-sm">
                    J'accepte la{' '}
                    <Link to="/privacy" className="link link-primary" target="_blank" rel="noopener noreferrer">
                      politique de confidentialité
                    </Link>
                    {' '}*
                  </span>
                </label>
                {errors.acceptPrivacy && (
                  <label className="label">
                    <span className="label-text-alt text-error">{errors.acceptPrivacy}</span>
                  </label>
                )}
              </div>

              <div className="alert alert-info">
                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="font-bold text-sm">Protection de vos données</h3>
                  <p className="text-xs">
                    Vos données sont protégées conformément au RGPD. Vous pouvez les consulter, 
                    modifier ou supprimer à tout moment depuis votre profil.
                  </p>
                </div>
              </div>
            </div>

            {/* Bouton de création */}
            <button
              type="submit"
              className={`btn btn-primary w-full mt-6 ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Création du compte...
                </>
              ) : (
                'Créer mon compte'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-6">OU</div>

          {/* Lien vers connexion */}
          <div className="text-center">
            <p className="text-base-content/70 mb-3">
              Vous avez déjà un compte ?
            </p>
            <Link to="/login" className="btn btn-outline btn-secondary w-full">
              Se connecter
            </Link>
          </div>

          {/* Lien retour accueil */}
          <div className="text-center mt-4">
            <Link to="/" className="link link-neutral text-sm">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
