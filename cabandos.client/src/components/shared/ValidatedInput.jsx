import React from 'react';

class ValidatedInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            error: '',
        };
    }

    componentDidMount() {
        this.setState({
            value: this.props.value ? this.props.value : ''
        });
    }

    handleChange = (event) => {
        const { value } = event.target;
        const { name, onChange, validate } = this.props;

        let error = '';
        if (validate) {
            error = validate(value);
        }

        this.setState({ value, error });
        if (onChange) {
            onChange(name, value, error);
        }
    };

    render() {
        const { type, placeholder, name, icon, onIconClick, iconPosition = 'left' } = this.props;
        const { value, error } = this.state;

        return (
            <div className="input-group mb-3">
                {icon && iconPosition === 'left' && (
                    <div className="input-group-prepend">
                        <span
                            role="button"
                            className="input-group-text"
                            onClick={onIconClick}
                        >
                            {icon}
                        </span>
                    </div>
                )}
                <input
                    type={type}
                    name={name}
                    className={`form-control ${error ? 'is-invalid' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={this.handleChange}
                />
                {icon && iconPosition === 'right' && (
                    <div className="input-group-append">
                        <span
                            role="button"
                            className="input-group-text"
                            onClick={onIconClick}
                        >
                            {icon}
                        </span>
                    </div>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        );
    }
}

export default ValidatedInput;
