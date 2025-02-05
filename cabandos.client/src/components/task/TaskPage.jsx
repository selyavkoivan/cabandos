import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody, CardText, Button, Spinner, Badge } from 'reactstrap';
import { connect } from 'react-redux';
import TaskChangesTimeline from './TaskChangesTimeline';
import { fetchTaskChangesAsync, selectTaskStatusText, toggleHistory, toggleEditing, editTaskAsync } from '../../redux/slice/task/taskSlice';
import { FaEdit } from 'react-icons/fa';
import TaskEditForm from './TaskEditForm';
import '../../assets/styles/TaskChange.css';

class TaskPage extends Component {
    componentDidMount() {
        const taskId = window.location.pathname.split('/').pop();
        this.props.fetchTaskChangesAsync(taskId);
    }

    handleSave = (updatedTaskData) => {
        this.props.editTaskAsync({ ...this.props.taskChangeData.task, ...updatedTaskData });
    };

    render() {
        const { isEditing, taskChangeData, loading, error, isHistoryVisible, toggleHistory } = this.props;

        if (loading) return <div className="text-center mt-5">Loading...</div>;
        if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;
        if (!taskChangeData) return null;

        return (
            <Container className="mt-5 d-flex justify-content-center">
                <Row className="w-100">
                    <Col md={{ size: 8, offset: 2 }}>
                        <Card className="task-card shadow p-4">
                            <CardBody>
                                <div className="d-flex align-items-center justify-content-between">
                                    <h3 className="task-title m-0">{taskChangeData.task.name}</h3>
                                    {!isEditing &&
                                        <Button
                                            color="link"
                                            className="p-0 text-primary w-auto "
                                            onClick={this.props.toggleEditing}
                                            style={{ fontSize: '1.2rem' }}
                                        >
                                            <FaEdit />
                                        </Button>
                                    }
                                </div>

                                <CardText className="text-muted">{taskChangeData.task.description || 'No description provided'}</CardText>

                                <CardText>
                                    <Badge color="primary" className="p-2">
                                        Status: {selectTaskStatusText(taskChangeData.task.status)}
                                    </Badge>
                                </CardText>

                                {taskChangeData.user && taskChangeData.user.avatarUrl && taskChangeData.user.userName && (
                                    <CardText className="p-2 mb-2 card-text user-info">
                                        <a href={`/profile/${taskChangeData.user.userName}`} className="d-flex align-items-center">
                                            <img
                                                src={taskChangeData.user.avatarUrl}
                                                alt={taskChangeData.user.userName}
                                                className="rounded-circle"
                                                style={{ width: '30px', height: '30px', marginRight: '10px' }}
                                            />
                                            <span>{taskChangeData.user.userName}</span>
                                        </a>
                                    </CardText>
                                )}
                            </CardBody>
                        </Card>

                        {isEditing ?
                            <TaskEditForm
                                task={taskChangeData.task}
                                onSave={this.handleSave}
                                onCancel={this.props.toggleEditing}
                            />
                            :
                            <div className="text-center mt-3">
                                <Button color="light" className="text-secondary" onClick={toggleHistory}>
                                    {isHistoryVisible ? 'Hide History' : 'Show History'}
                                </Button>
                            </div>
                        }

                        {isHistoryVisible && taskChangeData.task.taskChanges?.length > 0 && (
                            <div className="task-history mt-4 mb-5 p-3 shadow rounded">
                                <h5 className="mb-3">History of Changes</h5>
                                <TaskChangesTimeline taskChanges={taskChangeData.task.taskChanges} />
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    isEditing: state.task.isEditing,
    taskChangeData: state.task.taskChanges,
    loading: state.task.loading,
    error: state.task.error,
    isHistoryVisible: state.task.isHistoryVisible,
});

const mapDispatchToProps = {
    fetchTaskChangesAsync,
    toggleHistory,
    toggleEditing,
    editTaskAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
