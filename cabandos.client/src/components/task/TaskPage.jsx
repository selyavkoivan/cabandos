import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import { connect } from 'react-redux';
import TaskChangesTimeline from './TaskChangesTimeline';
import { fetchTaskChangesAsync, selectTaskStatusText } from '../../redux/slice/task/taskSlice';

class TaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHistoryVisible: false,
        };
    }

    componentDidMount() {
        const taskId = window.location.pathname.split('/').pop();
        this.props.fetchTaskChangesAsync(taskId);
    }

    toggleHistory = () => {
        this.setState((prevState) => ({ isHistoryVisible: !prevState.isHistoryVisible }));
    };

    render() {
        const { task, loading, error } = this.props;
        const { isHistoryVisible } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        if (!task) {
            return null;
        }

        return (
            <Container className="mt-5">
                <Row>
                    <Col md={8}>
                        <Card className="task-card">
                            <CardTitle className="d-flex align-items-center justify-content-between">
                                <h5>{task.name}</h5>
                                <Button onClick={this.toggleHistory}>
                                    {isHistoryVisible ? 'Hide History' : 'Show History'}
                                </Button>
                            </CardTitle>
                            <CardBody>
                                <CardText>Description: {task.description || 'No description provided'}</CardText>
                                <CardText>
                                    <strong>Status:</strong> {selectTaskStatusText(task.status)}
                                </CardText>
                                {task.user && task.user.userName && (
                                    <CardText>
                                        <strong>Creator:</strong> {task.user.userName}
                                    </CardText>
                                )}
                                <Button>Edit Task</Button>
                            </CardBody>
                        </Card>

                        {isHistoryVisible && task.taskChanges && task.taskChanges.length > 0 && (
                            <div className="task-history mt-4">
                                <h5>History of Changes</h5>
                                <TaskChangesTimeline taskChanges={task.taskChanges} />
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    task: state.task.taskChanges,
    loading: state.task.loading,
    error: state.task.error,
});

const mapDispatchToProps = {
    fetchTaskChangesAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
