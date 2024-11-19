import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { getRandomColor, getDarkColor } from '../Color';

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

    render() {
        const { forecast, color } = this.props;
        const { backgroundColor, temperatureColor, summaryColor } = this.state;

        return (
            <Card key={forecast.date} className="m-1">
                <CardTitle
                    className="text-center"
                    style={{
                        backgroundColor: getDarkColor(color),
                        height: '30px',
                        cursor: 'grab',
                    }}
                    draggable
                    onDragStart={this.handleDragStart}
                    tag="h5"
                >
                    {forecast.date}
                </CardTitle>
                <CardBody>
                    <CardText
                        className="p-2 mb-2"
                        style={{
                            backgroundColor: temperatureColor,
                            borderRadius: '5px',
                            textAlign: 'center',
                        }}
                    >
                        Temperature: {forecast.temperatureC}°C
                    </CardText>
                    <CardText
                        className="p-2 mb-2"
                        style={{
                            backgroundColor: temperatureColor,
                            borderRadius: '5px',
                            textAlign: 'center',
                        }}
                    >
                        Temperature: {forecast.temperatureF}°F
                    </CardText>
                    <CardText
                        className="p-2 mb-2"
                        style={{
                            backgroundColor: summaryColor,
                            borderRadius: '5px',
                            textAlign: 'center',
                        }}
                    >
                        Summary: {forecast.summary}
                    </CardText>
                </CardBody>
            </Card>
        );
    }
}

export default Forecast;
