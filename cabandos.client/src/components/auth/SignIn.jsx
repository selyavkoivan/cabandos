import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { signInAsync } from '../../redux/slice/auth/authSlice';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        this.props.signInAsync({ Username: this.state.Username, SignInPassword: this.state.Password });
       
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
                            <h1>Вход</h1>
                        </div>
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id="username-addon">@</span>
                            </div>
                            <input required type="text" name="Username" id="form3Example3" className="form-control"
                                placeholder="Имя пользователя"
                                aria-label="Имя пользователя"
                                aria-describedby="username-addon"
                                value={this.state.Username}
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
                            <input name="Password" required type={this.state.showPassword ? 'text' : 'password'}
                                className="form-control" placeholder="Пароль" aria-label="Пароль"
                                aria-describedby="password-addon" value={this.state.Password}
                                onChange={this.handleInputChange} />
                        </div>

                        <input type="submit" value="Вход" className="btn btn-primary col-12 p-2"
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
    signInAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);