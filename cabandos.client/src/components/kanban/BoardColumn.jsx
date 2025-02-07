import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteTaskAsync, moveTaskAsync, addTaskAsync, selectTaskStatusText } from '../../redux/slice/task/taskSlice';
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

    handleMoveTask = (task, toStatus, forceMove = false) => {
        const { allowedMoves } = this.props;

        if (forceMove || (allowedMoves[task.status] && allowedMoves[task.status].includes(toStatus))) {
            this.props.onMoveTask(task, toStatus);
        }
    };

    handleDragOver = (event) => {
        event.preventDefault();
    };

    handleDrop = (event) => {
        const taskData = JSON.parse(event.dataTransfer.getData('text/plain'));
        const forceMove = event.shiftKey;
        this.handleMoveTask(taskData, this.props.tasksItem.status, forceMove);
    };

    handleToggleAdd = () => {
        this.setState(prevState => ({ isAdding: !prevState.isAdding }));
    };

    render() {
        const { tasksItem, isLogin } = this.props;
        const { isAdding } = this.state;

        if (!tasksItem) {
            return null;
        }

        return (
            <Card
                style={{ height: '100%' }}
                onDrop={isLogin ? this.handleDrop : undefined}
                onDragOver={isLogin ? this.handleDragOver : undefined}

            >
                <CardBody className="m-0 p-0">
                    <CardTitle className="h1 text-center">{selectTaskStatusText(tasksItem.status)}</CardTitle>
                    {isLogin && tasksItem.status === 0 && (isAdding ? (
                        <AddTask onAddTask={this.handleAddTask} />
                    ) : (
                            <Button onClick={this.handleToggleAdd} className="w-auto p-2">
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
                                isFreezed={!isLogin}
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
    allowedMoves: state.task.allowedMoves,
    isLogin: state.auth.isLogin,
});


const mapDispatchToProps = {
    deleteTaskAsync,  
    addTaskAsync, 
    moveTaskAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardColumn);
