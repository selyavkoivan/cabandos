import React from 'react';
import { connect } from 'react-redux';
import { signInAsync } from '../../redux/slice/auth/authSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ValidatedInput from '../shared/ValidatedInput';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inputs: {
                Username: { value: '', error: '' },
                Password: { value: '', error: '' },
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
        if (!inputs.Password.value.trim()) {
            newInputs.Password.error = 'Enter your password.';
        }

        this.setState({ inputs: newInputs });

        return !Object.values(newInputs).some((input) => input.error);
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.validateInputs()) {
            return;
        }

        const { Username, Password } = this.state.inputs;
        this.props.signInAsync({
            Username: Username.value,
            SignInPassword: Password.value,
        });
    };

    render() {
        const { inputs, showPassword } = this.state;

        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-6">
                        <div className="m-5 text-center">
                            <h1>Sign In</h1>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <ValidatedInput
                                type="text"
                                name="Username"
                                placeholder="Username"
                                validate={(value) => (!value.trim() ? 'Enter your username.' : '')}
                                onChange={this.handleInputChange}
                                icon={<span>@</span>}
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
                            <button type="submit" className="btn btn-primary col-12 p-2">
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    signInAsync,
};

export default connect(null, mapDispatchToProps)(SignIn);
