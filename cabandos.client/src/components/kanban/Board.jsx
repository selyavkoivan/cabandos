import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import BoardColumn from './BoardColumn';
import { connect } from 'react-redux';
import { fetchTasksByStatus, deleteTaskAsync, addTaskAsync, moveTaskAsync } from '../../redux/slice/task/tasksSlice';

class Board extends Component {
    async componentDidMount() {
        this.props.fetchTasksByStatus();
    }

    handleDeleteTask = (task) => {
        this.props.deleteTaskAsync(task);
    };

    handleAddTask = (task) => {
        this.props.addTaskAsync(task);
    };

    handleMoveTask = (task, toStatus) => {
        this.props.moveTaskAsync({ task, toStatus });
    };

    render() {
        const { tasksGroup } = this.props;

        return (
            <Container>
                <h1 id="tableLabel">KABANDOS</h1>
                {Array.isArray(tasksGroup) && tasksGroup.length > 0 ? (
                    <Row
                        className="justify-content-center"
                        style={{
                            flexWrap: 'wrap'
                        }}
                    >
                        {tasksGroup.map((tasks) => (
                            <Col className="m-0 p-0" key={tasks.status}>
                                <BoardColumn
                                    onMoveTask={this.handleMoveTask}
                                    onDeleteTask={this.handleDeleteTask}
                                    onAddTask={this.handleAddTask}
                                    status={tasks.status}
                                    tasks={tasks.tasks}
                                />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p>Loading data...</p>
                )}
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    tasksGroup: state.tasks.tasksGroup,
    randomRowColor: state.tasks.randomRowColor,
});

const mapDispatchToProps = {
    fetchTasksByStatus,
    deleteTaskAsync,
    moveTaskAsync,
    addTaskAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
