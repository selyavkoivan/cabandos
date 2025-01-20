import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, CardImg, Button } from 'reactstrap';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Task from '../kanban/Task';
import { fetchUserByUsernameAsync } from '../../redux/slice/user/userSlice';
import '../../assets/styles/User.css';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false,
        };
    }

    componentDidMount() {
        const username = window.location.pathname.split('/').pop();
        this.props.fetchUserByUsernameAsync(username);
    }

    toggleEdit = () => {
        this.setState((prevState) => ({ isEdit: !prevState.isEdit }));
    };

    render() {
        const { userData, loading, error } = this.props;
        const { isEdit } = this.state;

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
                                src=""
                                className="profile-img"
                                alt="Profile Image"
                            />
                            <div className="mt-3 text-center">
                                <h6 className="text-wrap" style={{ wordBreak: 'break-word' }}>
                                    {userData.user.userName}
                                </h6>
                                <hr />
                                <Button variant="primary" onClick={() => this.setState({ isEdit: true })}>
                                    <FontAwesomeIcon icon={faPenToSquare} /> Edit Profile
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
                                    <div>Edit Profile Component</div> 
                                ) : (
                                    <div>
                                        <h4>About</h4>
                                        <p className="profile-description">
                                                {userData.user.description || 'No description provided.'}
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
