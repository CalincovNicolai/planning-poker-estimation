import {BrowserRouter as Router, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import {lazy, Suspense} from 'react';
import PageLayout from './components/layout/PageLayout';
import DarkModeToggle from './components/dark-mode/DarkModeToggle.tsx';
import BackToLobbyButton from './components/back-button/BackToLobbyButton.tsx';
import Loader from './components/primitives/Loader.tsx';
import {AnimatePresence} from "framer-motion";
import FadeRouteWrapper from "./components/animations/FadeRouteWrapper.tsx";

const Room = lazy(() => import('./pages/Room'));
const Lobby = lazy(() => import('./pages/Lobby'));
const NotFound = lazy(() => import('./pages/NotFound'));

function AppRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Navigate to="/lobby"/>}/>
                <Route
                    path="/lobby"
                    element={
                        <FadeRouteWrapper>
                            <PageLayout headerRight={<DarkModeToggle/>}>
                                <Lobby/>
                            </PageLayout>
                        </FadeRouteWrapper>
                    }
                />
                <Route
                    path="/room/:roomId"
                    element={
                        <FadeRouteWrapper>
                            <PageLayout
                                headerLeft={
                                    <BackToLobbyButton
                                        label={'Leave Room'}
                                        className="w-40 h-12 p-3 bg-zinc-200 dark:bg-zinc-700 rounded-xl text-black dark:text-white hover:disabled:bg-zinc-200 hover:disabled:dark:bg-zinc-700 hover:bg-blue-400 hover:text-white transition-colors cursor-pointer"
                                    />
                                }
                                headerRight={<DarkModeToggle/>}
                            >
                                <Room/>
                            </PageLayout>
                        </FadeRouteWrapper>
                    }
                />
                <Route
                    path="*"
                    element={
                        <FadeRouteWrapper>
                            <PageLayout headerRight={<DarkModeToggle/>}>
                                <NotFound/>
                            </PageLayout>
                        </FadeRouteWrapper>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

export default function App() {
    return (
        <div className="min-h-screen w-full bg-white dark:bg-zinc-800 text-zinc-800 dark:text-white">
            <Router>
                <Suspense
                    fallback={
                        <div className="h-screen w-full flex items-center justify-center">
                            <Loader label="Loading page..."/>
                        </div>
                    }
                >
                    <AppRoutes/>
                </Suspense>
            </Router>
        </div>
    );
}
