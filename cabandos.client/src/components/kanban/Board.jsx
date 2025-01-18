import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import BoardColumn from './BoardColumn';
import { connect } from 'react-redux';
import { fetchTasksByStatusAsync, deleteTaskAsync, addTaskAsync, moveTaskAsync } from '../../redux/slice/task/taskSlice';
import TreeBoardColumn from './TreeBoardColumn'

class Board extends Component {
    componentDidMount() {
        this.props.fetchTasksByStatusAsync();
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
                <h1 id="tableLabel">CABANDOS</h1>
                {Array.isArray(tasksGroup) && tasksGroup.length > 0 ? (
                    <Row
                        className="justify-content-center"
                        style={{
                            flexWrap: 'wrap',
                        }}
                    >
                        {tasksGroup.map((tasks) => (
                            <Col className="m-0 p-0" key={tasks.status}>
                                <TreeBoardColumn
                                    onMoveTask={this.handleMoveTask}
                                    onDeleteTask={this.handleDeleteTask}
                                    onAddTask={this.handleAddTask}
                                    treeNode={tasks}
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
    tasksGroup: state.task.tasksGroup
});

const mapDispatchToProps = {
    fetchTasksByStatusAsync,
    deleteTaskAsync,
    moveTaskAsync,
    addTaskAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
