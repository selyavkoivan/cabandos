import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, CardImg, Button, Badge } from 'reactstrap';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Task from '../kanban/Task';
import { fetchUserByUsernameAsync } from '../../redux/slice/user/userSlice';
import '../../assets/styles/User.css';
import EditProfile from './EditProfile';
import ChatComponent from './ChatComponent';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
            showChat: false, 
        };
    }

    componentDidMount() {
        const username = window.location.pathname.split('/').pop();
        this.props.fetchUserByUsernameAsync(username);
    }

    toggleEdit = () => {
        this.setState((prevState) => ({ isEdit: !prevState.isEdit }));
    };

    toggleChat = () => {
        this.setState((prevState) => ({ showChat: !prevState.showChat }));
    };

    render() {
        const { userData, loading, error } = this.props;
        const { isEdit, showChat } = this.state;

        if (loading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <div>Error: {error}</div>;
        }

        if (!userData) {
            return null;
        }

        return (
            <Container className="mt-5">
                <Row className="profile-row">
                    <Col md={4}>
                        <div className="profile-sidebar">
                            <CardImg
                                src={userData.user.avatarUrl}
                                className="profile-img"
                                alt="Profile Image"
                            />
                            <div className="mt-3 text-center">
                                <h6 className="text-wrap" style={{ wordBreak: 'break-word' }}>
                                    {userData.user.userName}
                                </h6>
                                <hr />
                                <Button variant="primary" onClick={this.toggleEdit}>
                                    <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
                                </Button>
                                <Button variant="primary" onClick={this.toggleChat} className="mt-2">
                                    {showChat ? 'Hide Chat' : 'Open Chat'}
                                </Button>
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="profile-info">
                            <div style={{ textAlign: 'left' }}>
                                <h3 className="mt-3 text-wrap">@{userData.user.userName}</h3>
                                <h5 className="mt-2 text-muted">{userData.user.email}</h5>
                                <hr />
                                {isEdit ? (
                                    <EditProfile toggleEdit={this.toggleEdit} />
                                ) : (
                                    <div>
                                        <h4>About</h4>
                                        <p className="profile-description">
                                            <b>Description: </b>{userData.user.description || 'No description provided.'}
                                        </p>
                                        <p className="profile-description">
                                            <b>Roles: </b>{userData.roles && userData.roles.length > 0 ? (
                                                userData.roles.map((role, index) => (
                                                    <Badge color="secondary" key={index} className="me-2">
                                                        {role}
                                                    </Badge>
                                                ))
                                            ) : (
                                                <p>No roles assigned.</p>
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className="tasks-section mt-4">
                                <h3 style={{ textAlign: 'left' }}>My Created Tasks</h3>
                                {userData.user.tasks && userData.user.tasks.length > 0 ? (
                                    <Row>
                                        {userData.user.tasks.map((task) => (
                                            <Col md="4" key={task.id}>
                                                <Task task={task} isFreezed={true} />
                                            </Col>
                                        ))}
                                    </Row>
                                ) : (
                                    <p style={{ textAlign: 'left' }}>No tasks created yet.</p>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>

                {showChat && <ChatComponent otherUserId={userData.user.id} />}
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    userData: state.user.currentUser,
    loading: state.user.loading,
    error: state.user.error,
});

const mapDispatchToProps = {
    fetchUserByUsernameAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
