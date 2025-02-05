import React, { Component } from 'react';
import { Button, Form } from 'reactstrap';
import { FaSave, FaTimes } from 'react-icons/fa';
import ValidatedInput from '../shared/ValidatedInput';

class TaskEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                Name: { value: props.task.name, error: '' },
                Description: { value: props.task.description || '', error: '' },
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

    handleSave = () => {
        const { inputs } = this.state;
        const { onSave } = this.props;

        if (!inputs.Name.value.trim()) {
            this.setState((prevState) => ({
                inputs: {
                    ...prevState.inputs,
                    Name: { ...prevState.inputs.Name, error: 'Name is required!' },
                },
            }));
            return;
        }

        onSave({
            name: inputs.Name.value,
            description: inputs.Description.value || null,
        });
    };

    render() {
        const { onCancel } = this.props;
        const { inputs } = this.state;

        return (
            <Form>
                <ValidatedInput
                    type="text"
                    name="Name"
                    placeholder="Enter task name"
                    maxLength={30}
                    value={inputs.Name.value}
                    validate={(value) => (!value.trim() ? 'Name is required!' : '')}
                    onChange={this.handleInputChange}
                />
                <ValidatedInput
                    type="textarea"
                    name="Description"
                    placeholder="Enter task description (optional)"
                    maxLength={100}
                    value={inputs.Description.value}
                    validate={() => ''}
                    onChange={this.handleInputChange}
                />
                <div className="d-flex justify-content-end mt-2">
                    <Button color="success" onClick={this.handleSave} className="me-2">
                        <FaSave /> Save
                    </Button>
                    <Button color="secondary" onClick={onCancel}>
                        <FaTimes /> Cancel
                    </Button>
                </div>
            </Form>
        );
    }
}

export default TaskEditForm;
