import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col, Button } from 'reactstrap';
import { getRandomColor, getDarkColor } from '../Color';
import { AiOutlineClose } from "react-icons/ai";
import "./Board.css"
class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: ''
        };
    }

    componentDidMount() {
        this.setState({ backgroundColor: getRandomColor().randomColor });
    }

    handleDragStart = (event) => {
        event.dataTransfer.setData('text/plain', JSON.stringify(this.props.task));
    };

    handleDelete = (event) => {
        this.props.handleDeleteTask(this.props.task)
    }

    render() {
        const { task, color } = this.props;
        const { backgroundColor } = this.state;

        return (
            <Card key={task.id} className="m-1">
                <CardTitle
                    className="d-flex align-items-center justify-content-between"
                    style={{
                        backgroundColor: getDarkColor(color),
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
                        <Col xs="1" className="d-flex flex-column justify-content-between">
                            <Button color="primary" className="w-100 h-50 d-flex align-items-center justify-content-center">
                                1
                            </Button>
                            <Button color="secondary" className="w-100 h-50 d-flex align-items-center justify-content-center">
                                1
                            </Button>
                        </Col>

                        <Col xs="11">
                            <CardText className="p-2 mb-2 text-center">
                                Name: {task.name}
                            </CardText>
                            <CardText className="p-2 mb-2 text-center card-text">
                                Description: {task.descripion}
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
