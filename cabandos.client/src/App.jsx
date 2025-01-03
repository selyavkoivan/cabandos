import React, { Component } from 'react';

import { Route, Routes } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import Layout from './kanban/Layout'
import './App.css';
import store from './redux/store';
import { Provider } from 'react-redux';

class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Provider store={store}>
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
                </Layout>
            </Provider>
        );
    }
}

export default App;