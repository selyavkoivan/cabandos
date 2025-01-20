import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsersAsync } from '../../redux/slice/user/userSlice';
import { Badge } from 'reactstrap';

class Users extends Component {
    componentDidMount() {
        this.props.fetchAllUsersAsync();
    }

    render() {
        const { users, loading, error } = this.props;

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        if (users.length === 0) {
            return <p>No users found.</p>;
        }

        return (
            <div className="row">
                <div className="col-8 m-auto row">
                    {users.map((userRole) => (
                        <div className="col-4 m-0 p-3" key={userRole.user.id}>
                            <div className="form-control">
                                <div className="row">
                                    <div className="p-2">
                                        <a href={`/profile/${userRole.user.userName}`}>
                                            <img
                                                alt=""
                                                className="col-12 img img-responsive rounded-circle"
                                                src=""
                                            />
                                        </a>
                                    </div>
                                    <div className="col-12 m-0">
                                        <a
                                            className="text-decoration-none text-reset"
                                            href={`/profile/${userRole.user.userName}`}
                                        >
                                            <p className="m-0">@{userRole.user.userName}</p>
                                        </a>
                                        {userRole.roles.map((role, index) => (
                                            <a
                                                href={`/profile/${userRole.user.userName}`}
                                                className="text-decoration-none text-reset"
                                                key={index}
                                            >
                                                <Badge className="mr-2">{role}</Badge>{' '}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    users: state.user.users,
    loading: state.user.loading,
    error: state.user.error,
});

const mapDispatchToProps = {
    fetchAllUsersAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);