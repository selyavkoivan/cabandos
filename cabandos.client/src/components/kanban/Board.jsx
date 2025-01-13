import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
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
                    <Row noGutters>
                        <Col md={6}>
                            <Card>
                                <CardBody className="m-0 p-0">
                                    <CardTitle className="h1 text-center">Closed</CardTitle>
                                    <Row noGutters>
                                        <Col md={6}>
                                            <BoardColumn
                                                onMoveTask={this.handleMoveTask}
                                                onDeleteTask={this.handleDeleteTask}
                                                onAddTask={this.handleAddTask}
                                                status={tasksGroup[0].status}
                                                tasks={tasksGroup[0].tasks}
                                                title="Completed"
                                            />
                                        </Col>
                                        <Col md={6}>
                                            <BoardColumn
                                                onMoveTask={this.handleMoveTask}
                                                onDeleteTask={this.handleDeleteTask}
                                                onAddTask={this.handleAddTask}
                                                status={tasksGroup[1].status}
                                                tasks={tasksGroup[1].tasks}
                                                title="Rejected"
                                            />
                                        </Col>

                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={3}>
                            <BoardColumn
                                onMoveTask={this.handleMoveTask}
                                onDeleteTask={this.handleDeleteTask}
                                onAddTask={this.handleAddTask}
                                status={tasksGroup[2].status}
                                tasks={tasksGroup[2].tasks}
                                title="In Progress"
                            />
                        </Col>
                        <Col md={3}>
                            <BoardColumn
                                onMoveTask={this.handleMoveTask}
                                onDeleteTask={this.handleDeleteTask}
                                onAddTask={this.handleAddTask}
                                status={tasksGroup[3].status}
                                tasks={tasksGroup[3].tasks}
                                title="On Review"
                            />
                        </Col>
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
