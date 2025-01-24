import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/shared/Layout';
import './assets/styles/App.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import NotificationManager from './components/shared/notifications/NotificationManager'
import ChatComponent from './components/user/Chat'
class App extends Component {
    static displayName = App.name;

    constructor(props) {
        super(props);
        this.state = {
            serverReady: false,
        };
    }

    async componentDidMount() {
        const response = await fetch('/api/health');
        if (response.ok) {
            this.setState({ serverReady: true });
        }

        {
            const message = localStorage.getItem('successedMessage');
            if (message) {
                NotificationManager.showSuccess(message);
                localStorage.removeItem('successedMessage');
            }
        }
    }

    render() {
        const { serverReady } = this.state;

        return (
            <Provider store={store}>
                <Layout>
                    <ChatComponent/>
                </Layout>
            </Provider>
        );
    }
}

export default App;
