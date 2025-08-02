import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

import HomePage from '../pages/HomePage/HomePage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import LeaderboardPage from '../pages/LeaderboardPage/LeaderboardPage';
import ConjugaisonPage from '../pages/ConjugaisonPage/ConjugaisonPage';

const TermsPage = lazy(() => import("../pages/TermsPage/TermsPage"));
const PrivacyPage = lazy(() => import("../pages/PrivacyPage/PrivacyPage"));

const routes: RouteObject[] = [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/profile", element: <ProfilePage /> },
    { path: "/leaderboard", element: <LeaderboardPage /> },
    { path: "/it", element: <ConjugaisonPage key="it" /> },
    { path: "/es", element: <ConjugaisonPage key="es" /> },
    {
        path: "/terms",
        element: <TermsPage />
    },
    {
        path: "/privacy", 
        element: <PrivacyPage />
    },
    { path: "*", element: <div className="p-8 text-error">404 - Not Found</div> }
];

export default routes;