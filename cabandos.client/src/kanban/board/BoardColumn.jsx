import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import Task from './Task';
import AddTask from './AddTask'
import { getRandomColor } from '../Color';

class BoardColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: '',
            isAdding: false
        };
    }

    componentDidMount() {
        const { randomColor } = getRandomColor();
        this.setState({ bgColor: randomColor });
    }

    handleDrop = (event) => {
        const taskData = JSON.parse(event.dataTransfer.getData('text/plain'));
        this.props.onMoveTask(taskData, this.props.status);
    };

    handleDragOver = (event) => {
        event.preventDefault();
    };

    handleDeleteTask = (task) => {
        this.props.onDeleteTask(task)
    };

    handleAddTask = (task) => {
        this.toggleAdd()

        task.status = this.props.status
        this.props.onAddTask(task)
    }

    toggleAdd = () => {
        this.setState(prevState => ({ isAdding: !prevState.isAdding }));
    }

    render() {
        const { tasks, status } = this.props;
        const { bgColor, isAdding } = this.state;

        return (
            <Card
                style={{ backgroundColor: bgColor, height: '100%' }}
                onDrop={this.handleDrop}
                onDragOver={this.handleDragOver}
            >
                <CardBody className="m-0 p-0">
                    <CardTitle className="h1 text-center">column #{status}</CardTitle>
                    {isAdding ?
                        <AddTask onAddTask={this.handleAddTask}/> :
                        <Button onClick={this.toggleAdd}>+ Добавить</Button>
                    }

                    {tasks.map((task) => (
                         
                            <Task key={task.id}
                                color={bgColor}
                                task={task}
                                handleDeleteTask={this.handleDeleteTask}
                            />
                    ))}
                </CardBody>
            </Card>
        );
    }
}

export default BoardColumn;
