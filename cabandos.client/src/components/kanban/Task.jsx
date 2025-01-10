import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col, Button } from 'reactstrap';
import { AiOutlineClose } from "react-icons/ai";
import "../../assets/styles/Board.css"
class Task extends Component {
    constructor(props) {
        super(props);
    }

    handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', JSON.stringify(this.props.task));
    };

    handleDelete = (event) => {
        this.props.onDeleteTask(this.props.task)
    }

    render() {
        const { task } = this.props;

        return (
            <Card key={task.id} className="m-1">
                <CardTitle
                    className="d-flex align-items-center justify-content-between"
                    style={{
                        height: '30px',
                        cursor: 'grab',
                        padding: '0 10px'
                    }}
                    draggable
                    onDragStart={this.handleDragStart}
                    tag="h5"
                >
                    <span style={{ flex: 1, textAlign: 'center' }}>{task.name}</span>
                    <AiOutlineClose
                        style={{
                            marginLeft: 'auto',
                            cursor: 'pointer',
                        }}
                        onDragStart={e => e.stopPropagation()}
                        onClick={this.handleDelete}
                    />

                </CardTitle>
                <CardBody>
                    <Row>
                        <Col xs="11">
                            <CardText className="p-2 mb-2 text-center">
                                Name: {task.name}
                            </CardText>
                            <CardText className="p-2 mb-2 text-center card-text">
                                Description: {task.description}
                            </CardText>
                            <CardText className="p-2 mb-2 text-center">
                                Status: {task.status}
                            </CardText>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

export default Task;
