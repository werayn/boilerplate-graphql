import { hot } from 'react-hot-loader';
import React from 'react';
import AppRouter from '@router/router.jsx';

class App extends React.Component {
    render() {
        return (
            <AppRouter />
        );
    }
}

export default hot(module)(App);
