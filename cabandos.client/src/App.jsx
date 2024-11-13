import React, { Component } from 'react';
import './App.css';
import Board from './kanban/board/Board';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastsGroup: [] 
        };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    async populateWeatherData() {
        try {
            const response = await fetch('weatherforecast');
            const data = await response.json();
            this.setState({ forecastsGroup: data }); 
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    }

    render() {
        const { forecastsGroup } = this.state;

        return (
            <div>
                <h1 id="tableLabel">КАБАНДОС</h1>
                {Array.isArray(forecastsGroup) && forecastsGroup.length > 0 ?
                    <Board forecastsGroup={forecastsGroup} />
                    :
                    <p>Загрузка данных...</p> 
                }
            </div>
        );
    }
}

export default App;