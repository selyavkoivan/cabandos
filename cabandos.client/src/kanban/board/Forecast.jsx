import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText, Row, Col, Button } from 'reactstrap';
import { getRandomColor, getDarkColor } from '../Color';
import { AiOutlineClose } from "react-icons/ai";
class Forecast extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundColor: '',
            temperatureColor: '',
            summaryColor: ''
        };
    }

    componentDidMount() {
        this.setState({ backgroundColor: getRandomColor().randomColor });
        this.setState({ temperatureColor: getRandomColor().randomColor });
        this.setState({ summaryColor: getRandomColor().randomColor });
    }

    handleDragStart = (event) => {
        const data = { ...this.props.forecast, key: this.props.columnNumber };
        event.dataTransfer.setData('text/plain', JSON.stringify(data));
    };

    handleDelete = (event) => {
        this.props.handleDeleteForecast(this.props.forecast)
    }

    render() {
        const { forecast, color } = this.props;
        const { backgroundColor, temperatureColor, summaryColor } = this.state;

        return (
            <Card key={forecast.date} className="m-1">
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
                    <span style={{ flex: 1, textAlign: 'center' }}>{forecast.date}</span>
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
                            <CardText
                            className="p-2 mb-2 text-center"
                            style={{
                                backgroundColor: temperatureColor
                            }}
                        >
                            Temperature: {forecast.temperatureC}°C
                        </CardText>
                            <CardText
                                className="p-2 mb-2 text-center"
                                style={{
                                    backgroundColor: temperatureColor
                                }}
                            >
                                Temperature: {forecast.temperatureF}°F
                            </CardText>
                            <CardText
                                className="p-2 mb-2 text-center"
                                style={{
                                    backgroundColor: summaryColor
                                }}
                            >
                                Summary: {forecast.summary}
                            </CardText>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        );
    }
}

export default Forecast;
