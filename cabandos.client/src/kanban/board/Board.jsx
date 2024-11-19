import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import BoardColumn from './BoardColumn';
import { getRandomColor } from '../Color';
import 'reactstrap'
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            forecastsGroup: this.props.forecastsGroup,
            randomRowColor: ''
        };
    }

    componentDidMount() {
        const { randomColor } = getRandomColor();
        this.setState({ randomRowColor: randomColor });
    }

    handleMoveForecast = (forecast, toColumnTitle) => {
        var forecastsGroup = this.state.forecastsGroup;

        const indexToDelete = forecastsGroup[forecast.key].findIndex(f => f.id === forecast.id);
        if (indexToDelete !== -1) {
            forecastsGroup[forecast.key].splice(indexToDelete, 1);
        }

        forecastsGroup[toColumnTitle].push(forecast);
        this.setState({ forecastsGroup: forecastsGroup })

        fetch('/api/weatherForecast/EditWeatherForecast', {
            method: 'POST',
            body: JSON.stringify(this.state.forecastsGroup),
            headers: {
                'Content-Type': 'application/json',
            },
        });
      
    };

    handleDeleteForecast = (forecast, columnFromDelete) => {
        const forecastGroup = [...this.state.forecastsGroup]
        const forecasts = [...forecastGroup[columnFromDelete]]

        const index = forecasts.findIndex(f => f.id === forecast.id)
        if (index !== -1) {
            forecasts.splice(index, 1)
        }
        forecastGroup[columnFromDelete] = forecasts
        this.setState({ forecastsGroup: forecastGroup });

        fetch('/api/weatherForecast/DeleteWeatherForecast', {
            method: 'POST',
            body: JSON.stringify({
                id: forecast.id,
                columnFrom: columnFromDelete,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    handleLoadNewData = () => {
        fetch('/api/weatherForecast/LoadNewData', { method: 'GET' })
            .then(response => response.json())
            .then(data => this.setState({ forecastsGroup: data }));
    }

    render() {
        const { forecastsGroup, randomRowColor } = this.state;

        return (
            <Container>
                <Row
                    className="justify-content-center"
                    style={{
                        flexWrap: "wrap",
                        backgroundColor: randomRowColor,
                    }}
                >
                    {forecastsGroup.map((forecasts, index) => (
                        <Col key={index} >
                            <BoardColumn
                                columnNumber={index}
                                onMoveForecast={this.handleMoveForecast}
                                onDeleteForecast={this.handleDeleteForecast}
                                forecasts={forecasts}
                            />
                        </Col>
                    ))}
                </Row>
                <Button className='m-2' onClick={this.handleLoadNewData}>
                    Загрузить новые данные</Button>

            </Container>
        );
    }
}

export default Board;