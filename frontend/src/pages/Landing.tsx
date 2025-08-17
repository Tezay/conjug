import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <div className="hero min-h-[calc(100vh-4rem)] lg:min-h-[80vh] bg-gradient-to-br from-base-100 to-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse max-w-6xl mx-auto px-4">
                    <div className="flex-1 max-w-md lg:max-w-lg">
                        <img 
                            src="/assets/images/mobile-app-illustration.webp" 
                            alt="Application Conjug.fr sur mobile"
                            className="w-full h-auto object-contain"
                        />
                    </div>
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                            Plus d'excuse pour{" "}
                            <span className="text-primary">conjuguer</span>,<br />
                            des{" "}
                            <span className="text-primary">bonnes notes</span>{" "}
                            assurées
                        </h1>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
                            <Link to="/es" className="btn btn-primary btn-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                Commencer à conjuguer
                            </Link>
                            <Link to="/leaderboard" className="btn btn-outline btn-lg">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Voir le classement
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="bg-base-200 py-16">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="flex-1 max-w-md lg:max-w-lg">
                            <img 
                                src="/assets/images/exercise-mode-illustration.webp" 
                                alt="Mode exercice Conjug.fr"
                                className="w-full h-auto object-contain"
                            />
                        </div>
                        <div className="flex-1 text-center lg:text-left">
                            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-primary">
                                Comment ça marche ?
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="badge badge-primary badge-lg">1</div>
                                    <p className="text-lg">Choisissez la langue, les temps, et les types de verbes à réviser</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="badge badge-primary badge-lg">2</div>
                                    <p className="text-lg">Révisez les conjugaisons avec nos exercices interactifs</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="badge badge-primary badge-lg">3</div>
                                    <p className="text-lg">Suivez vos progrès et grimpez dans le classement !</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Developers Section */}
            <div className="bg-base-100 py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
                        Rencontrez l'équipe
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className="card-body items-center text-center">
                                <div className="avatar">
                                    <div className="w-24 rounded-full hover:scale-110 transition-transform duration-300">
                                        <img src="https://gravatar.com/avatar/dbcea079dab478e5cb50bb7272bea83fc0a83f6e725b2d9d07ce99a54d66c35f?s=200&d=identicon" alt="Cédric" />
                                    </div>
                                </div>
                                <h3 className="card-title text-2xl">Cédric</h3>
                                <p className="text-base-content/70">Co-créateur & Développeur</p>
                                <p>S'occupe du backend et de l'architecture.</p>
                            </div>
                        </div>
                        <div className="card bg-base-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                            <div className="card-body items-center text-center">
                                <div className="avatar">
                                    <div className="w-24 rounded-full hover:scale-110 transition-transform duration-300">
                                        <img src="https://gravatar.com/avatar/3b072d8bbfcfc9ed87bde8ea5d3eb943c4fe7ab05351f060ba92f370b3607204?s=200&d=identicon" alt="Eliot" />
                                    </div>
                                </div>
                                <h3 className="card-title text-2xl">Eliot</h3>
                                <p className="text-base-content/70">Co-créateur & Développeur</p>
                                <p>S'occupe du frontend et conçoit l'expérience utilisateur pour rendre l'apprentissage agréable.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer footer-center bg-base-300 text-base-content p-10">
                <div className="max-w-4xl">
                    <div className="grid grid-flow-col gap-4">
                        <Link to="/terms" className="link link-hover">Conditions d'utilisation</Link>
                        <Link to="/privacy" className="link link-hover">Politique de confidentialité</Link>
                        <a href="https://github.com/conjug/" target="_blank" rel="noopener noreferrer" className="link link-hover">
                            GitHub
                        </a>
                    </div>
                    <div>
                        <p className="font-bold text-lg">Conjug.fr</p>
                        <p>Maîtrisez les conjugaisons en espagnol et en italien</p>
                    </div>
                    <div>
                        <p>© 2025 Conjug.fr - Tous droits réservés.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
