import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { signUpAsync } from '../../redux/slice/auth/authSlice';
import ValidatedInput from '../shared/ValidatedInput';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                Username: { value: '', error: '' },
                Email: { value: '', error: '' },
                Password: { value: '', error: '' },
                RepeatedPassword: { value: '', error: '' },
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

    handlePasswordToggle = () => {
        this.setState((prevState) => ({ showPassword: !prevState.showPassword }));
    };

    validateInputs = () => {
        const { inputs } = this.state;
        const newInputs = { ...inputs };

        if (!inputs.Username.value.trim()) {
            newInputs.Username.error = 'Enter your username.';
        }
        if (!inputs.Email.value.trim() || !/\S+@\S+\.\S+/.test(inputs.Email.value)) {
            newInputs.Email.error = 'Enter a valid email address.';
        }
        if (!inputs.Password.value.trim()) {
            newInputs.Password.error = 'Enter your password.';
        }
        if (inputs.Password.value !== inputs.RepeatedPassword.value) {
            newInputs.RepeatedPassword.error = 'Passwords do not match.';
        }

        this.setState({ inputs: newInputs });

        return !Object.values(newInputs).some((input) => input.error);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.validateInputs()) {
            return;
        }

        const { Username, Email, Password, RepeatedPassword } = this.state.inputs;
        this.props.signUpAsync({
            Username: Username.value,
            Email: Email.value,
            Password: Password.value,
            RepeatedPassword: RepeatedPassword.value
        });
    };

    render() {
        const { inputs, showPassword } = this.state;

        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-6">
                        <div className="m-5 text-center">
                            <h1>Sign Up</h1>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <ValidatedInput
                                maxLength={20}
                                type="text"
                                name="Username"
                                placeholder="Username"
                                validate={(value) => (!value.trim() ? 'Enter your username.' : '')}
                                onChange={this.handleInputChange}
                                icon={<span>@</span>}
                            />
                            <ValidatedInput
                                maxLength={30}
                                type="email"
                                name="Email"
                                placeholder="Email"
                                validate={(value) =>
                                    !value.trim() || !/\S+@\S+\.\S+/.test(value)
                                        ? 'Enter a valid email address.'
                                        : ''
                                }
                                onChange={this.handleInputChange}
                                icon={<FontAwesomeIcon icon={faEnvelope} />}
                            />
                            <ValidatedInput
                                type={showPassword ? 'text' : 'password'}
                                name="Password"
                                placeholder="Password"
                                validate={(value) => (!value.trim() ? 'Enter your password.' : '')}
                                onChange={this.handleInputChange}
                                icon={
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                    />
                                }
                                onIconClick={this.handlePasswordToggle}
                            />
                            <ValidatedInput
                                type={showPassword ? 'text' : 'password'}
                                name="RepeatedPassword"
                                placeholder="Repeat Password"
                                validate={(value) =>
                                    value !== inputs.Password.value
                                        ? 'Passwords do not match.'
                                        : ''
                                }
                                onChange={this.handleInputChange}
                                icon={
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                    />
                                }
                                onIconClick={this.handlePasswordToggle}
                            />
                            <button type="submit" className="btn btn-primary col-12 p-2">
                                Sign Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    signUpAsync,
};

export default connect(null, mapDispatchToProps)(SignUp);
