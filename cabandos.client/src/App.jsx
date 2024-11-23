import React, { Component } from 'react';
import './App.css';
import Board from './kanban/board/Board';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasksByStatus: [] 
        };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    async populateWeatherData() {
        try {
            const response = await fetch('/api/task/GetTasksByStatus');
            if (!response.ok) {
                throw new Error(`Server responded with status: ${response.status}`);
            }
            const data = await response.json();
            this.setState({ tasksByStatus: data });
        } catch (error) {
            console.error("Error fetching tasks data:", error.message);
        }
    }

    render() {
        const { tasksByStatus } = this.state;

        return (
            <div>
                <h1 id="tableLabel">КАБАНДОС</h1>
                {Array.isArray(tasksByStatus) && tasksByStatus.length > 0 ?
                    <Board tasksGroup={tasksByStatus} />
                    :
                    <p>Загрузка данных...</p> 
                }
            </div>
        );
    }
}

export default App;