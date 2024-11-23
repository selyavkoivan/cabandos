import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import BoardColumn from './BoardColumn';
import { getRandomColor } from '../Color';
import 'reactstrap'
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasksGroup: this.props.tasksGroup,
            randomRowColor: ''
        };
    }

    componentDidMount() {
        const { randomColor } = getRandomColor();
        this.setState({ randomRowColor: randomColor });
    }

    handleMoveTask = (task, toStatus) => {
        const tasksGroup = [...this.state.tasksGroup];
        const indexToDelete = tasksGroup[task.status].tasks.findIndex(f => f.id === task.id);
        if (indexToDelete !== -1) {
            tasksGroup[task.status].tasks.splice(indexToDelete, 1);
            task.status = toStatus
        }


        const targetColumn = tasksGroup[toStatus].tasks;
        targetColumn.push(task);

        this.setState({ tasksGroup });

        fetch('/api/task/EditTaskStatus', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };


    handleDeleteTask = (task) => {
        const tasksGroup = [...this.state.tasksGroup]
        const tasks = [...tasksGroup[task.status].tasks]

        const index = tasks.findIndex(f => f.id === task.id)
        if (index !== -1) {
            tasks.splice(index, 1)
        }
        tasksGroup[task.status].tasks = tasks
        this.setState({ tasksGroup });

        fetch('/api/task/DeleteTask', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    handleAddTask = (taskDTO) => {
        fetch("api/task/AddTask",
            {
                method: "POST",
                body: JSON.stringify(taskDTO),
                headers: {
                    "Content-Type": "application/json"
                },
            }
        )
            .then(response => response.json())
            .then(data => {
                const tasksGroup = this.state.tasksGroup
                const tasks = tasksGroup[data.status].tasks
                tasks.push(data)
                this.setState({ tasksGroup })
            })
    }

    render() {
        const { tasksGroup, randomRowColor } = this.state;

        return (
            <Container>
                <Row
                    className="justify-content-center"
                    style={{
                        flexWrap: "wrap",
                        backgroundColor: randomRowColor,
                    }}
                >
                    {tasksGroup.map((tasks) => (
                        <Col className="m-0 p-0" key={tasks.status} >
                            <BoardColumn 
                                status={tasks.status}
                                onMoveTask={this.handleMoveTask}
                                onDeleteTask={this.handleDeleteTask}
                                onAddTask={this.handleAddTask}
                                tasks={tasks.tasks}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default Board;