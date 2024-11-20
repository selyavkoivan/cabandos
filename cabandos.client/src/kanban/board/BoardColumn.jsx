import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Button } from 'reactstrap';
import Forecast from './Forecast';
import { getRandomColor } from '../Color';

class BoardColumn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor: '',
            dragOverIndex: null,
        };
    }

    componentDidMount() {
        const { randomColor } = getRandomColor();
        this.setState({ bgColor: randomColor });
    }

    handleDrop = (event) => {
        const forecastData = JSON.parse(event.dataTransfer.getData('text/plain'));
        const { dragOverIndex } = this.state;
        this.props.onMoveForecast(forecastData, this.props.columnNumber, dragOverIndex);
        this.setState({ dragOverIndex: null });
    };

    handleDragOver = (event) => {
        event.preventDefault();
    };

    handleDragEnter = (index) => {
        this.setState({ dragOverIndex: index });
    };

    handleDragLeave = () => {
        this.setState({ dragOverIndex: null });
    };

    handleDeleteForecast = (forecast) => {
        this.props.onDeleteForecast(forecast, this.props.columnNumber);
    };

    handleAdd = () => {
        this.props.onAddForecast(this.props.columnNumber)
    }

    render() {
        const { forecasts, columnNumber } = this.props;
        const { bgColor, dragOverIndex } = this.state;

        return (
            <Card
                style={{ backgroundColor: bgColor, height: '100%' }}
                onDrop={this.handleDrop}
                onDragOver={this.handleDragOver}
            >
                <CardBody>
                    <CardTitle className="h1 text-center">column #{columnNumber + 1}</CardTitle>
                    <Button onClick={this.handleAdd}>+ Добавить</Button>
                    {forecasts.map((forecast, index) => (
                        <div key={index}>
                            <div
                                onDragEnter={() => this.handleDragEnter(index)}
                                onDragLeave={this.handleDragLeave}
                                style={{
                                    height: '20px',
                                    backgroundColor: dragOverIndex === index ? 'lightgray' : 'transparent',
                                    margin: '5px 0',
                                }}
                            ></div>
                            <Forecast
                                color={bgColor}
                                columnNumber={columnNumber}
                                forecast={forecast}
                                handleDeleteForecast={this.handleDeleteForecast}
                            />
                        </div>
                    ))}
                    <div
                        onDragEnter={() => this.handleDragEnter(forecasts.length)}
                        onDragLeave={this.handleDragLeave}
                        style={{
                            height: '20px',
                            backgroundColor: dragOverIndex === forecasts.length ? 'lightgray' : 'transparent',
                            margin: '5px 0',
                        }}
                    ></div>
                </CardBody>
            </Card>
        );
    }
}

export default BoardColumn;
