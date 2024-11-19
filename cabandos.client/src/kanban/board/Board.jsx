import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
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

        const indexToDelete = forecastsGroup[forecast.key].findIndex(f => f.date === forecast.date);
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
                                forecasts={forecasts}
                            />
                        </Col>
                    ))}
                </Row>
            </Container>
        );
    }
}

export default Board;