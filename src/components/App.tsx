import React from 'react'
import Header from './Header';
import AppContext from '../context/AppContext';
import AppProvider from '../context/AppProvider';
import {
    createMemorySource,
    createHistory,
    LocationProvider, Router
} from '@reach/router';
import Auth from './Auth';
import Todos from './Todos';

export default function App() {
    return (
        <AppProvider>
            <AppContext.Consumer>
                {
                    state => (
                        <div className="container mb-5">
                            <Header />

                            <Router>
                                <Todos path="/" />
                                <Auth path="/auth" />
                            </Router>
                        </div>
                    )

                }
            </AppContext.Consumer>
        </AppProvider>
    )
}
