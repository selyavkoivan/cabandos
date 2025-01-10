import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTaskAsync, moveTaskAsync, addTaskAsync, toggleAddingTask } from '../../redux/slice/task/tasksSlice';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import Task from './Task';
import AddTask from './AddTask';

class BoardColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdding: false
        };
    }

    handleDeleteTask = (task) => {
        this.props.onDeleteTask(task);
    }

    handleAddTask = (task) => {
        this.props.onAddTask({ ...task, status: this.props.status }); 
        this.handleToggleAdd()
    };

    handleMoveTask = (task, toStatus) => {
        this.props.onMoveTask({ ...task, status: toStatus }); 
    };

    handleDragOver = (event) => {
        event.preventDefault();
    };

    handleDrop = (event) => {
        const taskData = JSON.parse(event.dataTransfer.getData('text/plain'));
        this.props.onMoveTask(taskData, this.props.status);
    };

    handleToggleAdd = () => {
        this.setState(prevState => ({ isAdding: !prevState.isAdding }));
    };

    render() {
        const { tasks, status, randomRowColor } = this.props;
        const { isAdding } = this.state
        return (
            <Card
                style={{ backgroundColor: randomRowColor, height: '100%' }}
                onDrop={this.handleDrop}
                onDragOver={this.handleDragOver}
            >
                <CardBody className="m-0 p-0">
                    <CardTitle className="h1 text-center">column #{status}</CardTitle>
                    {isAdding ? (
                        <AddTask onAddTask={this.handleAddTask} />
                    ) : (
                            <Button onClick={this.handleToggleAdd}>+ Добавить</Button>
                    )}

                    {tasks.length || isAdding ? (
                        tasks.map((task) => (
                            <Task
                                key={task.id}
                                color={randomRowColor}
                                task={task}
                                onDeleteTask={this.handleDeleteTask}
                                onMoveTask={this.handleMoveTask}
                            />
                        ))
                    ) : (
                        <p className='text-secondary h2 m-5 p-5'>Записей нет</p>
                    )}
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    randomRowColor: state.tasks.randomRowColor,
    isAdding: state.tasks.addingTaskStatus,
});

const mapDispatchToProps = {
    deleteTaskAsync,  
    addTaskAsync,    
    moveTaskAsync,   
    toggleAddingTask
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardColumn);
