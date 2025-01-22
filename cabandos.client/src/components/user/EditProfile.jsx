import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { editUserAsync, fetchUserByUsernameAsync, uploadUserPhotoAsync } from '../../redux/slice/user/userSlice';
import ValidatedInput from '../shared/ValidatedInput';
import EditPassword from './EditPassword';
import FileUploader from '../shared/FileUploader'

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editPassword: false,
            inputs: {
                userName: { value: this.props.currentUser?.user.userName || '', error: '' },
                email: { value: this.props.currentUser?.user.email || '', error: '' },
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

    toggleEditPassword = () => {
        this.setState((prevState) => ({ editPassword: !prevState.editPassword }));
    };

    validateInputs = () => {
        const { inputs } = this.state;
        const newInputs = { ...inputs };

        if (!inputs.userName.value.trim()) {
            newInputs.userName.error = 'Enter your username.';
        }
        if (!inputs.email.value.trim()) {
            newInputs.email.error = 'Enter your email.';
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
            email: inputs.email.value,
        };
        this.props.editUserAsync({ username: this.props.currentUser.user.userName, userDTO: userDTO });
    };

    handleCancel = () => {
        this.props.toggleEdit();
    };

    handleUploadPhotoAsync = (formData) => {
        this.props.uploadUserPhotoAsync({
            username: this.props.currentUser.user.userName,
            file: formData,
        });
    };


    render() {
        const { inputs, editPassword } = this.state;
        const { currentUser } = this.props;

        if (!currentUser) {
            return <div>Loading...</div>;
        }

        return (
            <div className="col-12 m-0 ps-3">
                {editPassword ? (
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
                        <ValidatedInput
                            maxLength={50}
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={inputs.email.value || currentUser.user.email}
                            validate={(value) =>
                                !value.trim() || !/\S+@\S+\.\S+/.test(value)
                                    ? 'Enter a valid email address.'
                                    : ''
                            }
                            onChange={this.handleInputChange}
                            icon={<FontAwesomeIcon icon={faEnvelope} />}
                        />

                            <FileUploader acceptType='image/*' uploadFile={this.handleUploadPhotoAsync}/>

                        <div className="d-flex justify-content-end mt-3">
                            <button className="btn btn-primary me-2" onClick={this.handleEdit}>Save</button>
                            <button className="btn btn-secondary me-2" onClick={this.toggleEditPassword}>
                                Edit password</button>
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
    uploadUserPhotoAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
