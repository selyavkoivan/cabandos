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
        this.setState((prevState) => {
            const forecastsGroup = prevState.forecastsGroup.map(col => [...col]);
            forecastsGroup.forEach((column, index) => {
                const indexToDelete = column.findIndex(f => f.date === forecast.date && forecast.key === index);
                if (indexToDelete !== -1) {
                    column.splice(indexToDelete, 1);
                }
            });

            forecastsGroup[toColumnTitle].push(forecast);

            return { forecastsGroup };
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