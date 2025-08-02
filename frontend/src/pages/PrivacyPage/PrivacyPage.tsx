import { Link } from 'react-router-dom';

const PrivacyPage = () => {
  return (
    <div className="min-h-full bg-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">Politique de Confidentialité</h1>
              <p className="text-base-content/70">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
              <div className="badge badge-success gap-2 mt-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Conforme RGPD
              </div>
            </div>

            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-base-content">
              {/* Section 1 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">1. Introduction</h2>
                <p className="mb-4">
                  Conjug.fr s'engage à protéger votre vie privée et vos données personnelles conformément au 
                  Règlement Général sur la Protection des Données (RGPD) et à la loi française.
                </p>
                <p className="mb-4">
                  Cette politique explique comment nous collectons, utilisons, stockons et protégeons vos informations 
                  lorsque vous utilisez notre plateforme éducative.
                </p>
              </section>

              {/* Section 2 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">2. Responsable du Traitement</h2>
                <div className="bg-base-300 p-4 rounded-lg mb-4">
                  <p className="font-bold mb-2">Conjug.fr</p>
                  <p>Email : contact@conjug.fr</p>
                  <p className="text-sm text-base-content/70 mt-2">
                    Nous sommes le responsable du traitement de vos données personnelles.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">3. Données Collectées</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="card bg-base-300">
                    <div className="card-body p-4">
                      <h3 className="card-title text-lg text-primary">Données d'inscription</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Prénom et nom</li>
                        <li>Adresse email</li>
                        <li>Nom d'utilisateur</li>
                        <li>Établissement (facultatif)</li>
                        <li>Mot de passe (chiffré)</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="card bg-base-300">
                    <div className="card-body p-4">
                      <h3 className="card-title text-lg text-primary">Données d'utilisation</h3>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        <li>Points d'expérience (XP)</li>
                        <li>Classements et rang</li>
                        <li>Séries quotidiennes</li>
                        <li>Réponses aux exercices</li>
                        <li>Paramètres d'exercices</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="alert alert-info mb-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold">Données techniques minimales</h3>
                    <p>Nous collectons uniquement les données de session nécessaires au fonctionnement. 
                    Aucun cookie de tracking ou analyse tierce partie n'est utilisé.</p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">4. Finalités du Traitement</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="badge badge-primary flex-shrink-0 mt-1">1</div>
                    <div>
                      <h3 className="font-bold">Fourniture du service éducatif</h3>
                      <p className="text-sm text-base-content/70">Permettre l'accès aux exercices de conjugaison et le suivi des progrès</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="badge badge-primary flex-shrink-0 mt-1">2</div>
                    <div>
                      <h3 className="font-bold">Gestion des comptes utilisateurs</h3>
                      <p className="text-sm text-base-content/70">Authentification, récupération de mot de passe, gestion des profils</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="badge badge-primary flex-shrink-0 mt-1">3</div>
                    <div>
                      <h3 className="font-bold">Classements et gamification</h3>
                      <p className="text-sm text-base-content/70">Calcul des scores, classements hebdomadaires et généraux</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="badge badge-primary flex-shrink-0 mt-1">4</div>
                    <div>
                      <h3 className="font-bold">Communication de service</h3>
                      <p className="text-sm text-base-content/70">Notifications importantes, confirmations d'inscription</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">5. Base Légale du Traitement</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-success/10 border border-success/20 p-4 rounded-lg">
                    <h3 className="font-bold text-success mb-2">Consentement</h3>
                    <p className="text-sm">Pour l'inscription et l'utilisation du service</p>
                  </div>
                  
                  <div className="bg-info/10 border border-info/20 p-4 rounded-lg">
                    <h3 className="font-bold text-info mb-2">Exécution du contrat</h3>
                    <p className="text-sm">Pour la fourniture des services éducatifs</p>
                  </div>
                </div>
              </section>

              {/* Section 6 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">6. Stockage et Sécurité</h2>
                <div className="bg-base-300 p-6 rounded-lg mb-4">
                  <h3 className="font-bold mb-3">Mesures de sécurité :</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside">
                    <li>Chiffrement des mots de passe</li>
                    <li>Connexions sécurisées (HTTPS)</li>
                    <li>Base de données protégée</li>
                    <li>Accès limité aux données</li>
                    <li>Sessions sécurisées</li>
                    <li>Sauvegarde régulière</li>
                  </ul>
                </div>
                <p className="mb-4">
                  Vos données sont stockées sur des serveurs sécurisés et ne sont jamais partagées avec des tiers 
                  à des fins commerciales.
                </p>
              </section>

              {/* Section 7 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">7. Vos Droits (RGPD)</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="card bg-primary/10 border border-primary/20">
                    <div className="card-body p-4">
                      <h3 className="font-bold text-primary">Droit d'accès</h3>
                      <p className="text-xs">Consulter vos données personnelles</p>
                    </div>
                  </div>
                  
                  <div className="card bg-secondary/10 border border-secondary/20">
                    <div className="card-body p-4">
                      <h3 className="font-bold text-secondary">Droit de rectification</h3>
                      <p className="text-xs">Corriger vos informations</p>
                    </div>
                  </div>
                  
                  <div className="card bg-accent/10 border border-accent/20">
                    <div className="card-body p-4">
                      <h3 className="font-bold text-accent">Droit à l'effacement</h3>
                      <p className="text-xs">Supprimer votre compte</p>
                    </div>
                  </div>
                  
                  <div className="card bg-info/10 border border-info/20">
                    <div className="card-body p-4">
                      <h3 className="font-bold text-info">Droit à la portabilité</h3>
                      <p className="text-xs">Récupérer vos données</p>
                    </div>
                  </div>
                  
                  <div className="card bg-success/10 border border-success/20">
                    <div className="card-body p-4">
                      <h3 className="font-bold text-success">Droit d'opposition</h3>
                      <p className="text-xs">Vous opposer au traitement</p>
                    </div>
                  </div>
                  
                  <div className="card bg-warning/10 border border-warning/20">
                    <div className="card-body p-4">
                      <h3 className="font-bold text-warning">Droit de limitation</h3>
                      <p className="text-xs">Limiter le traitement</p>
                    </div>
                  </div>
                </div>
                
                <div className="alert alert-info mt-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <h3 className="font-bold">Exercer vos droits</h3>
                    <p>Contactez-nous à contact@conjug.fr avec votre demande. 
                    Nous vous répondrons dans un délai de 30 jours maximum.</p>
                  </div>
                </div>
              </section>

              {/* Section 8 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">8. Durée de Conservation</h2>
                <div className="overflow-x-auto">
                  <table className="table table-zebra w-full">
                    <thead>
                      <tr>
                        <th>Type de données</th>
                        <th>Durée de conservation</th>
                        <th>Justification</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Données de compte</td>
                        <td>Jusqu'à suppression du compte</td>
                        <td>Fourniture du service</td>
                      </tr>
                      <tr>
                        <td>Données d'utilisation</td>
                        <td>Jusqu'à suppression du compte</td>
                        <td>Suivi des progrès</td>
                      </tr>
                      <tr>
                        <td>Comptes inactifs</td>
                        <td>2 ans sans connexion</td>
                        <td>Nettoyage automatique</td>
                      </tr>
                      <tr>
                        <td>Logs de sécurité</td>
                        <td>6 mois</td>
                        <td>Sécurité et debugging</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Section 9 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">9. Cookies et Technologies</h2>
                <div className="bg-success/10 border border-success/20 p-4 rounded-lg mb-4">
                  <h3 className="font-bold text-success mb-2">🍪 Politique cookies simplifiée</h3>
                  <p className="mb-2">Nous utilisons uniquement des cookies techniques essentiels :</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>Cookies de session :</strong> Pour maintenir votre connexion</li>
                    <li><strong>Cookies de préférences :</strong> Pour sauvegarder vos paramètres d'exercices</li>
                  </ul>
                  <p className="text-sm text-success mt-2">
                    ❌ Aucun cookie de tracking, publicité ou analyse tierce
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">10. Transferts de Données</h2>
                <div className="alert alert-success">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h3 className="font-bold">Données hébergées en Europe</h3>
                    <p>Vos données sont stockées et traitées exclusivement sur des serveurs situés dans l'Union Européenne (Allemagne). 
                    Aucun transfert vers des pays tiers.</p>
                  </div>
                </div>
              </section>

              {/* Section 11 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">11. Modifications de la Politique</h2>
                <p className="mb-4">
                  Nous pouvons modifier cette politique de confidentialité. En cas de changement important, 
                  nous vous informerons par email et/ou par notification sur le site.
                </p>
                <p className="mb-4">
                  La date de dernière mise à jour est indiquée en haut de cette page.
                </p>
              </section>

              {/* Contact Section */}
              <section className="mb-8 bg-base-300 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-primary mb-4">12. Contact et Réclamations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold mb-2">Questions sur vos données :</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">contact@conjug.fr</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-bold mb-2">Réclamation CNIL :</h3>
                    <p className="text-sm text-base-content/70">
                      Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL 
                      (Commission Nationale de l'Informatique et des Libertés).
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 pt-6 border-t border-base-300">
              <Link to="/terms" className="btn btn-outline">
                ← Conditions d'utilisation
              </Link>
              <Link to="/" className="btn btn-primary">
                Retour à l'accueil →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
