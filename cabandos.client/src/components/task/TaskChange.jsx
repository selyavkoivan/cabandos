import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';
import { selectTaskStatusText } from '../../redux/slice/task/taskSlice';

const TaskChange = ({ taskChange }) => {
    return (
        <Card className="mb-3">
            <CardBody>
                <CardTitle>{taskChange.changeType} - {new Date(taskChange.changedAt).toLocaleString()}</CardTitle>
                <CardText>Old Value: {taskChange.previousChange ? taskChange.previousChange.newValue : 'N/A'}</CardText>
                <CardText>New Value: {taskChange.newValue}</CardText>
                <CardText>Changed By: {taskChange.userId || 'Unknown'}</CardText>
            </CardBody>
        </Card>
    );
};

export default TaskChange;
