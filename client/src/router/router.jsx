import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { MainLayout } from '@layout/MainLayout.jsx';
import { CustomRoute } from './route.jsx';

const Home = lazy(() => import('@pages/home/Home.jsx'));
const About = lazy(() => import('@pages/about/About.jsx'));

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/about',
        component: About,
    },
];

const AppRouter = () => {
    return (
        <Router>
            <MainLayout>
                <Suspense
                    fallback={
                        <div className="lazy-loading">
                            {'Loading...'}
                        </div>
                    }
                >
                    {
                        routes.map((route, i) => (
                        // eslint-disable-next-line react/no-array-index-key
                            <CustomRoute key={ i } { ...route } />
                        ))
                    }
                </Suspense>
            </MainLayout>
        </Router>
    );
};

export default AppRouter;
