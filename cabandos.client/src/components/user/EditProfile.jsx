import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { editUserAsync, fetchUserByUsernameAsync } from '../../redux/slice/user/userSlice';
import ValidatedInput from '../shared/ValidatedInput';
import EditPassword from './EditPassword'

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editEmail: false,
            editPassword: false,
            inputs: {
                userName: { value: this.props.currentUser?.user.userName || '', error: '' },
            },
        };
    }

    handleInputChange = (name, value, error) => {
        this.setState((prevState) => ({
            inputs: {
                ...prevState.inputs,
                [name]: { value, error },
            },
        }));
    };

    handleEmailEdit = () => {
       
    };

    toggleEditPassword = () => {
        this.setState((prevState) => ({ editPassword: !prevState.editPassword }));
    };

    validateInputs = () => {
        const { inputs } = this.state;
        const newInputs = { ...inputs };

        if (!inputs.userName.value.trim()) {
            newInputs.userName.error = 'Enter your username.';
        }

        this.setState({ inputs: newInputs });

        return !Object.values(newInputs).some((input) => input.error);
    };

    handleEdit = () => {
        if (!this.validateInputs()) {
            return;
        }

        const { inputs } = this.state;
        const userDTO = {
            username: inputs.userName.value,
        };
        this.props.editUserAsync({ username: this.props.currentUser.user.userName, userDTO: userDTO}); 
    };

    handleCancel = () => {
        this.props.toggleEdit();
    };

    handleUpload = () => {
        
    };

    render() {
        const { inputs, editEmail, editPassword } = this.state;
        const { currentUser } = this.props;

        if (!currentUser) {
            return <div>Loading...</div>;
        }

        return (
            <div className="col-12 m-0 ps-3">
                {editEmail ? (
                    <EditEmail toggleEditEmail={this.toggleEditEmail} toggleEdit={this.props.toggleEdit} />
                ) : editPassword ? (
                    <EditPassword toggleEditPassword={this.toggleEditPassword} toggleEdit={this.props.toggleEditPassword} />
                ) : (   
                    <div className="p-2">
                        <h2 className="mb-3">Edit user data</h2>
                        <ValidatedInput
                            type="text"
                            name="userName"
                            placeholder="Username"
                            value={inputs.userName.value || currentUser.user.userName}
                            validate={(value) => (!value.trim() ? 'Enter your username.' : '')}
                            onChange={this.handleInputChange}
                            icon={<span>@</span>}
                        />

                        <div className="m-0 p-0">
                            <div className="mt-3">
                                <div className="text-center mt-3">
                                    <label htmlFor="file" id="drop-area" className="col-12 p-5 border border-5 rounded">
                                        <FontAwesomeIcon icon={faCloudUpload} /> Upload your photo: click or drag it here
                                    </label>
                                    <input
                                        type="file"
                                        id="file"
                                        name="file"
                                        className="d-none"
                                        accept="image/*"
                                        onChange={this.handleUpload}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                            <button className="btn btn-primary me-2" onClick={this.handleEdit}>Save</button>
                                    <button className="btn btn-secondary me-2" onClick={this.handleEmailEdit}>Edit email</button>
                                    <button className="btn btn-secondary me-2" onClick={this.toggleEditPassword}>Edit password</button>
                            <button className="btn btn-outline-danger" onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser,
});

const mapDispatchToProps = {
    editUserAsync,
    fetchUserByUsernameAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
