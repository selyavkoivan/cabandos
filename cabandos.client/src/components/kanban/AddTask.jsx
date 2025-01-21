import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Button, Form } from 'reactstrap';
import ValidatedInput from '../shared/ValidatedInput';

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                Name: { value: '', error: '' },
                Description: { value: '', error: '' },
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

    handleAddTask = () => {
        const { inputs } = this.state;

        if (!inputs.Name.value.trim()) {
            this.setState((prevState) => ({
                inputs: {
                    ...prevState.inputs,
                    Name: { ...prevState.inputs.Name, error: 'Name is required!' },
                },
            }));
            return;
        }

        this.props.onAddTask({
            name: inputs.Name.value,
            description: inputs.Description.value || null,
        });
    };

    render() {
        const { inputs } = this.state;

        return (
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Add New Task</CardTitle>
                    <Form>
                        <ValidatedInput
                            type="text"
                            name="Name"
                            placeholder="Enter task name"
                            maxLength={30}
                            validate={(value) => (!value.trim() ? 'Name is required!' : '')}
                            onChange={this.handleInputChange}
                        />
                        <ValidatedInput
                            type="textarea"
                            name="Description"
                            placeholder="Enter task description (optional)"
                            maxLength={100}
                            validate={() => ''}
                            onChange={this.handleInputChange}
                        />
                        <Button color="primary" onClick={this.handleAddTask}>
                            Add Task
                        </Button>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}

export default AddTask;
