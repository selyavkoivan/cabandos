import React, { Component } from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import Forecast from './Forecast';
import { getRandomColor } from '../Color';

class BoardColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: '',
        };
    }

    componentDidMount() {
        const { randomColor } = getRandomColor();
        this.setState({ bgColor: randomColor });
    }

    handleDrop = (event) => {
        const forecastData = JSON.parse(event.dataTransfer.getData('text/plain'))
        this.props.onMoveForecast(forecastData, this.props.columnNumber);
    };

    handleDragOver = (event) => {
        event.preventDefault();
    };

    handleDeleteForecast = (forecast) => {
        this.props.onDeleteForecast(forecast, this.props.columnNumber)
    }

    render() {
        const { forecasts, columnNumber } = this.props;
        const { bgColor } = this.state;

        return (
            <Card style={{ backgroundColor: bgColor, height: '100%', }}
                onDrop={this.handleDrop}
                onDragOver={this.handleDragOver}>
                <CardBody>
                    <CardTitle tag="h1" style={{ textAlign: "center" }}>column #{columnNumber + 1}</CardTitle>
                    {forecasts.map((forecast, index) => (
                        <Forecast key={index} color={bgColor} columnNumber={columnNumber} forecast={forecast} handleDeleteForecast={this.handleDeleteForecast} />
                    ))}
                </CardBody>
            </Card>
        );
    }
}

export default BoardColumn;