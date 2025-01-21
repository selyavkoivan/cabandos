import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTaskAsync, moveTaskAsync, addTaskAsync } from '../../redux/slice/task/taskSlice';
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
    };

    handleAddTask = (task) => {
        this.props.onAddTask({ ...task, status: this.props.tasksItem.status }); 
        this.handleToggleAdd();
    };

    handleMoveTask = (task, toStatus) => {
        this.props.onMoveTask({ ...task, status: toStatus }); 
    };

    handleDragOver = (event) => {
        event.preventDefault();
    };

    handleDrop = (event) => {
        const taskData = JSON.parse(event.dataTransfer.getData('text/plain'));
        this.props.onMoveTask(taskData, this.props.tasksItem.status);
    };

    handleToggleAdd = () => {
        this.setState(prevState => ({ isAdding: !prevState.isAdding }));
    };

    render() {
        const { tasksItem } = this.props;
        const { isAdding } = this.state;

        return (
            <Card
                style={{ height: '100%' }}
                onDrop={this.handleDrop}
                onDragOver={this.handleDragOver}
            >
                <CardBody className="m-0 p-0">
                    <CardTitle className="h1 text-center">{tasksItem.status}</CardTitle>
                    {tasksItem.status === 0 && (isAdding ? (
                        <AddTask onAddTask={this.handleAddTask} />
                    ) : (
                            <Button
                                onClick={this.handleToggleAdd}
                                className="w-auto p"
                            >
                                + Add
                            </Button>


                    ))}

                    {tasksItem.tasks.length || isAdding ? (
                        tasksItem.tasks.map((task) => (
                            <Task
                                key={task.id}
                                task={task}
                                onDeleteTask={this.handleDeleteTask}
                                onMoveTask={this.handleMoveTask}
                            />
                        ))
                    ) : (
                        <p className="text-secondary h2 m-5 p-5">No tasks available</p>
                    )}
                </CardBody>
            </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    isAdding: state.task.addingTaskStatus,
});

const mapDispatchToProps = {
    deleteTaskAsync,  
    addTaskAsync,    
    moveTaskAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardColumn);
