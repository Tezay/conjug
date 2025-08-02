import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-full bg-base-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-primary mb-4">Conditions d'Utilisation</h1>
              <p className="text-base-content/70">Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
            </div>

            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-base-content">
              {/* Section 1 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">1. Acceptation des Conditions</h2>
                <p className="mb-4">
                  En utilisant Conjug.fr (ci-après "le Service"), vous acceptez d'être lié par ces conditions d'utilisation. 
                  Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre service.
                </p>
              </section>

              {/* Section 2 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">2. Description du Service</h2>
                <p className="mb-4">
                  Conjug.fr est une plateforme éducative en ligne dédiée à l'apprentissage de la conjugaison 
                  en langues étrangères (espagnol, italien). Le service propose :
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Des exercices de conjugaison interactifs</li>
                  <li>Un système de progression et de classement</li>
                  <li>Le suivi des performances individuelles</li>
                  <li>Un accès gratuit aux fonctionnalités de base</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">3. Conditions d'Inscription</h2>
                <div className="bg-base-300 p-4 rounded-lg mb-4">
                  <h3 className="font-bold text-warning mb-2">Conditions obligatoires :</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Être une personne physique âgée d'au moins 13 ans</li>
                    <li>Ne posséder qu'un seul compte par personne</li>
                    <li>Fournir des informations exactes et véridiques</li>
                    <li>Ne pas utiliser de robots, scripts ou moyens automatisés</li>
                  </ul>
                </div>
                <p className="mb-4">
                  Les comptes multiples, les bots et toute forme d'automatisation sont strictement interdits 
                  et entraîneront la suspension immédiate du compte.
                </p>
              </section>

              {/* Section 4 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">4. Utilisation Acceptable</h2>
                <p className="mb-4">Vous vous engagez à :</p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Utiliser le service uniquement à des fins éducatives légitimes</li>
                  <li>Respecter les autres utilisateurs</li>
                  <li>Ne pas tenter de contourner les systèmes de sécurité</li>
                  <li>Ne pas partager vos identifiants de connexion</li>
                  <li>Signaler tout comportement abusif ou problème technique</li>
                </ul>

                <div className="alert alert-error mb-4">
                  <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.962-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <h3 className="font-bold">Usages interdits :</h3>
                    <ul className="list-disc list-inside mt-2">
                      <li>Tentatives de piratage ou d'intrusion</li>
                      <li>Utilisation de scripts automatisés</li>
                      <li>Création de comptes multiples</li>
                      <li>Partage de contenus inappropriés</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">5. Propriété Intellectuelle</h2>
                <p className="mb-4">
                  Tous les contenus présents sur Conjug.fr (textes, exercices, interface, logos) sont protégés 
                  par les droits d'auteur et appartiennent à Conjug.fr ou à ses partenaires.
                </p>
                <p className="mb-4">
                  Vous ne pouvez pas reproduire, distribuer ou modifier ces contenus sans autorisation écrite préalable.
                </p>
              </section>

              {/* Section 6 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">6. Suspension et Résiliation</h2>
                <p className="mb-4">
                  Nous nous réservons le droit de suspendre ou résilier votre compte en cas de :
                </p>
                <ul className="list-disc list-inside mb-4 space-y-2">
                  <li>Violation de ces conditions d'utilisation</li>
                  <li>Comportement abusif ou frauduleux</li>
                  <li>Utilisation de moyens automatisés</li>
                  <li>Création de comptes multiples</li>
                  <li>Inactivité prolongée (plus de 2 ans)</li>
                </ul>
              </section>

              {/* Section 7 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">7. Limitation de Responsabilité</h2>
                <p className="mb-4">
                  Conjug.fr est fourni "en l'état" sans garantie d'aucune sorte. Nous ne saurions être tenus 
                  responsables des dommages directs ou indirects résultant de l'utilisation du service.
                </p>
                <p className="mb-4">
                  Nous nous efforçons de maintenir le service disponible mais ne garantissons pas une disponibilité 
                  continue ou sans interruption.
                </p>
              </section>

              {/* Section 8 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">8. Protection des Mineurs</h2>
                <p className="mb-4">
                  Les utilisateurs de moins de 16 ans doivent obtenir le consentement parental avant de créer un compte. 
                  Nous encourageons les parents à surveiller l'utilisation d'Internet par leurs enfants.
                </p>
              </section>

              {/* Section 9 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">9. Modifications des Conditions</h2>
                <p className="mb-4">
                  Nous nous réservons le droit de modifier ces conditions à tout moment. Les utilisateurs seront 
                  informés des modifications importantes par email ou notification sur le site.
                </p>
                <p className="mb-4">
                  La poursuite de l'utilisation du service après modification constitue l'acceptation des nouvelles conditions.
                </p>
              </section>

              {/* Section 10 */}
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-primary mb-4">10. Droit Applicable et Juridiction</h2>
                <p className="mb-4">
                  Ces conditions sont régies par le droit français. Tout litige sera soumis à la juridiction 
                  des tribunaux français compétents.
                </p>
              </section>

              {/* Contact */}
              <section className="mb-8 bg-base-300 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-primary mb-4">Contact</h2>
                <p className="mb-2">
                  Pour toute question concernant ces conditions d'utilisation :
                </p>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">contact@conjug.fr</span>
                </div>
              </section>
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mt-8 pt-6 border-t border-base-300">
              <Link to="/" className="btn btn-outline">
                ← Retour à l'accueil
              </Link>
              <Link to="/privacy" className="btn btn-primary">
                Politique de confidentialité →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
