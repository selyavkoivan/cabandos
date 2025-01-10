import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { signUpAsync } from '../../redux/slice/auth/authSlice';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        this.props.signUpAsync({
            Email: this.state.Email,
            Username: this.state.Username,
            Password: this.state.Password,
            RepeatedPassword: this.state.RepeatedPassword
        })
    }

    handlePasswordClick = (event) => {
        this.setState({ showPassword: !this.state.showPassword })
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-6">
                        <div className="m-5 text-center">
                            <h1>Регистрация</h1>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="username-addon">@</span>
                            </div>
                            <input required type="text" name="username" className="form-control"
                                placeholder="Имя пользователя"
                                aria-label="Имя пользователя"
                                aria-describedby="username-addon"
                                value={this.state.Username} name="Username"
                                onChange={this.handleInputChange} />
                        </div>
                        <div className="mt-3 input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="">
                                    <p className="m-0">
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </p>
                                </span>
                            </div>
                            <input required type="email" className="form-control" placeholder="Почта" aria-label="Почта" name="Email"
                                aria-describedby="email-addon" value={this.state.Email}
                                onChange={this.handleInputChange} />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span role="button" className="input-group-text" id="password-addon"
                                    onClick={this.handlePasswordClick}>
                                    <p className="m-0">
                                        <FontAwesomeIcon icon={this.state.showPassword ? faEyeSlash : faEye} />
                                    </p>
                                </span>
                            </div>
                            <input required type={this.state.showPassword ? 'text' : 'password'}
                                name="Password"
                                className="form-control" placeholder="Пароль" aria-label="Пароль"
                                aria-describedby="password-addon" value={this.state.Password}
                                onChange={this.handleInputChange} />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span role="button" className="input-group-text" id="repeated-password-addon"
                                    onClick={this.handlePasswordClick}>
                                    <p className="m-0">
                                        <FontAwesomeIcon icon={this.state.showPassword ? faEyeSlash : faEye} />
                                    </p>
                                </span>
                            </div>
                            <input required type={this.state.showPassword ? 'text' : 'password'}
                                className="form-control" placeholder="Повторите пароль" aria-label="Повторите пароль"
                                aria-describedby="repeated-password-addon" value={this.state.RepeatedPassword} name="RepeatedPassword"
                                onChange={this.handleInputChange} />
                        </div>
                        <input type="submit" value="Регистрация" className="btn btn-primary col-12 p-2"
                            onClick={this.handleSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    status: state.auth.status,
    error: state.auth.error,
});

const mapDispatchToProps = {
    signUpAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);