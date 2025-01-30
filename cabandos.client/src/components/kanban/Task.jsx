import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { AiOutlineClose } from "react-icons/ai";
import { selectTaskStatusText } from '../../redux/slice/task/taskSlice';
import "../../assets/styles/Board.css";

class Task extends Component {
    constructor(props) {
        super(props);
    }

    handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', JSON.stringify(this.props.task));
    };

    handleDelete = (event) => {
        this.props.onDeleteTask(this.props.task);
    };

    render() {
        const { task, isFreezed } = this.props;

        return (
            <Card key={task.id} className="m-1 hoverable">
                <CardTitle
                    className="d-flex align-items-center justify-content-between"
                    style={{
                        height: '30px',
                        cursor: 'grab',
                        padding: '0 10px',
                    }}
                    draggable
                    onDragStart={!isFreezed && this.handleDragStart}
                    tag="h5"
                >
                    <span style={{ flex: 1, textAlign: 'center' }}>{task.name}</span>
                    {!isFreezed && (
                        <AiOutlineClose
                            className="ai-outline-close"
                            onDragStart={(e) => e.stopPropagation()}
                            onClick={this.handleDelete}
                        />
                    )}
                </CardTitle>
                <CardBody>
                    <CardText className="p-2 mb-2 text-center name">
                        Name: {task.name}
                    </CardText>
                    <CardText className="p-2 mb-2 text-center card-text">
                        Description: {task.description || 'Not provided'}
                    </CardText>
                    {task.userName && (
                        <CardText className="p-2 mb-2 text-center card-text">
                            Creator: {task.userName}
                        </CardText>
                    )}
                    <CardText
                        className={`d-inline-block w-auto border rounded p-2 mb-2 text-center card-text status ${task.status !== undefined && `status-${task.status}`}`}
                    >
                        Status: {selectTaskStatusText(task.status)}
                    </CardText>
                    {task.user && task.user.avatarUrl && task.user.userName && (
                        <CardText className="p-2 mb-2 text-center card-text user-info">
                            <a href={`/profile/${task.user.userName}`} className="d-flex align-items-center justify-content-center">
                                <img
                                    src={task.user.avatarUrl}
                                    alt={task.user.userName}
                                    className="rounded-circle"
                                    style={{ width: '30px', height: '30px', marginRight: '10px' }}
                                />
                                <span>{task.user.userName}</span>
                            </a>
                        </CardText>
                    )}
                </CardBody>
            </Card>
        );
    }
}

export default Task;
