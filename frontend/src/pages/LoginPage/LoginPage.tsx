import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axios from '../../api/axiosInstance';
  

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'L\'email n\'est pas valide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis';
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
      const response = await axios.post('/login', new URLSearchParams(formData));
      
      if (response.data.retour === 'trueAuth') {
        // Connexion réussie - rafraîchir le statut d'authentification
        await refreshAuth();
        navigate('/');
      } else {
        setSubmitError('Email ou mot de passe incorrect');
      }
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setSubmitError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center bg-base-100 px-4 py-8">
      <div className="card w-full max-w-md bg-base-200 shadow-xl">
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">Connexion</h1>
            <p className="text-base-content/70">
              Connectez-vous à votre compte Conjug.fr
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
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
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

            {/* Mot de passe */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Mot de passe</span>
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
                  disabled={isLoading}
                />
              </label>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password}</span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt">
                  <Link to="/forgot-password" className="link link-primary">
                    Mot de passe oublié ?
                  </Link>
                </span>
              </label>
            </div>

            {/* Bouton de connexion */}
            <button
              type="submit"
              className={`btn btn-primary w-full ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Connexion...
                </>
              ) : (
                'Se connecter'
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="divider my-6">OU</div>

          {/* Lien vers inscription */}
          <div className="text-center">
            <p className="text-base-content/70 mb-3">
              Vous n'avez pas encore de compte ?
            </p>
            <Link to="/register" className="btn btn-outline btn-secondary w-full">
              Créer un compte
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

export default LoginPage;
