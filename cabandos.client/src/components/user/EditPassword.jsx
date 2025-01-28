import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { editUserPasswordAsync } from '../../redux/slice/user/userSlice';
import { toast } from 'react-toastify';
import ValidatedInput from '../shared/ValidatedInput';

class EditPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                OldPassword: { value: '', error: '' },
                NewPassword: { value: '', error: '' },
                RepeatedNewPassword: { value: '', error: '' },
            },
            showPassword: false,
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

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword,
        }));
    };

    validateInputs = () => {
        const { inputs } = this.state;

        const newInputs = { ...inputs };


        if (!inputs.OldPassword.value.trim()) {
            newInputs.OldPassword.error = 'Enter your current password.';
        }
        if (!inputs.NewPassword.value.trim()) {
            newInputs.NewPassword.error = 'Enter new password.';
        }
        if (!inputs.RepeatedNewPassword.value.trim()) {
            newInputs.RepeatedNewPassword.error = 'Repeat new password.';
        }


        if (inputs.NewPassword.value !== inputs.RepeatedNewPassword.value) {
            newInputs.NewPassword.error = 'New password and repeated password do not match.';
        }
        if (inputs.OldPassword.value === inputs.NewPassword.value) {
            newInputs.NewPassword.error = 'New password must not be the same as the old password.';
        }

        this.setState({ inputs: newInputs });

        return !Object.values(newInputs).some((input) => input.error);
    };

    handleEditPassword = (event) => {
        event.preventDefault();

        if (!this.validateInputs()) {
            return;
        }

        const { inputs } = this.state;

        const { targetUser } = this.props;
        const passwordDTO = {
            SignInPassword: inputs.OldPassword.value,
            Password: inputs.NewPassword.value,
            RepeatedPassword: inputs.RepeatedNewPassword.value,
        };

        this.props.editUserPasswordAsync({ passwordDTO, username: targetUser.user.userName })
    };

    handleCancel = () => {
        this.props.toggleEditPassword();
    };

    render() {
        const { inputs, showPassword } = this.state;

        return (
            <form onSubmit = { this.handleSubmit } className="p-2">
                <h2 className="mb-3">Edit password</h2>

                <ValidatedInput
                    type={showPassword ? 'text' : 'password'}
                    name="OldPassword"
                    placeholder="Current password"
                    value={inputs.OldPassword.value}
                    onChange={this.handleInputChange}
                    validate={(value) => !value.trim() ? 'Please enter your current password.' : ''}
                    icon={<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />}
                    onIconClick={this.togglePasswordVisibility}
                />
                <hr />
                <ValidatedInput
                    type={showPassword ? 'text' : 'password'}
                    name="NewPassword"
                    placeholder="New password"
                    value={inputs.NewPassword.value}
                    onChange={this.handleInputChange}
                    validate={(value) => !value.trim() ? 'Please enter your new password.' : ''}
                    icon={<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />}
                    onIconClick={this.togglePasswordVisibility}
                />
                <ValidatedInput
                    type={showPassword ? 'text' : 'password'}
                    name="RepeatedNewPassword"
                    placeholder="Repeat new password"
                    value={inputs.RepeatedNewPassword.value}
                    onChange={this.handleInputChange}
                    validate={(value) =>
                        value !== inputs.NewPassword.value ? 'Passwords do not match.' : ''
                    }
                    icon={<FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />}
                    onIconClick={this.togglePasswordVisibility}
                />

                <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-primary me-3" onClick={this.handleEditPassword}>Save</button>
                    <button className="btn btn-outline-danger" onClick={this.handleCancel}>Cancel</button>
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state) => ({
    targetUser: state.user.targetUser,
});

const mapDispatchToProps = {
    editUserPasswordAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);
