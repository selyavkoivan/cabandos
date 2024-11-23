import React, { Component } from 'react';
import { Card, CardBody, CardTitle, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Description: ''
        };
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleAddTask = () => {
        const { Name, Description } = this.state;

        if (!Name.trim()) {
            alert('Name is required!');
            return;
        }

        this.props.onAddTask({
            name: Name,
            description: Description || null,
        });
        
    };

    render() {
        const { Name, Description } = this.state;

        return (
            <Card>
                <CardBody>
                    <CardTitle tag="h5">Add New Task</CardTitle>
                    <Form>
                        <FormGroup>
                            <Label for="taskName">Name</Label>
                            <Input
                                type="text"
                                name="Name"
                                id="taskName"
                                placeholder="Enter task name"
                                value={Name}
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="taskDescription">Description</Label>
                            <Input
                                type="textarea"
                                name="Description"
                                id="taskDescription"
                                placeholder="Enter task description (optional)"
                                value={Description}
                                onChange={this.handleInputChange}
                            />
                        </FormGroup>
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
