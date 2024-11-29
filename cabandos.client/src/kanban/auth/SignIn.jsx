import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordClick = this.handlePasswordClick.bind(this);
    }

    onUsernameChange(event) {
        this.setState({ Username: event.target.value });
    }

    onPasswordChange(event) {
        this.setState({ Password: event.target.value });
    }

    handleSubmit(event) {

        fetch('/api/auth/signin', {
            method: 'POST',
            body: JSON.stringify({
                Username: this.state.Username,
                SignInPassword: this.state.Password
            }),
            headers: { "Content-Type": "application/json" }
        }).then((res) => {
            if (res.status === 200) {
                window.location.replace(`/profile/${this.state.Username}`)
            }
            return res.json()
        })
            .then((result) => {
                alert(result.error_description)
                this.setState({ nameError: result.error_description })
            })
    }

    handlePasswordClick(event) {
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
                            <input required type="text" name="username" id="form3Example3" className="form-control"
                                placeholder="Имя пользователя"
                                aria-label="Имя пользователя"
                                aria-describedby="username-addon"
                                value={this.state.Email}
                                onChange={e => this.onUsernameChange(e)} />
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
                                className="form-control" placeholder="Пароль" aria-label="Пароль"
                                aria-describedby="password-addon" value={this.state.Password}
                                onChange={e => this.onPasswordChange(e)} />
                        </div>

                        <input type="submit" value="Вход" className="btn btn-primary col-12 p-2"
                            onClick={this.handleSubmit} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SignIn;