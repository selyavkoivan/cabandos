import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody, Card, CardBody, CardTitle, CardText } from "reactstrap";
import moment from "moment";
import { closeModal } from "../../redux/slice/task/taskChangesSlice";

const ChangeInfoModal = () => {
    const dispatch = useDispatch();
    const { isModalOpen, selectedChanges } = useSelector(state => state.taskChanges);

    if (!selectedChanges || selectedChanges.length === 0) return null;

    const changeDates = [...new Set(selectedChanges.map(change => moment(change.changedAt).format("YYYY-MM-DD")))];

    const typeTitle = [...new Set(selectedChanges.map(change => change.changeType))];
    const dateTitle = changeDates.length === 1
        ? `on ${changeDates[0]}`
        : `from ${changeDates[0]} to ${changeDates[changeDates.length - 1]}`;

    const modalTitle = `${typeTitle} Details ${dateTitle}`;

    const handleClose = () => dispatch(closeModal());

    return (
        <Modal isOpen={isModalOpen}
            toggle={handleClose} size="xl" centered>
            <ModalHeader toggle={handleClose}>{modalTitle}</ModalHeader>
            <ModalBody style={{ maxHeight: "80vh", overflowY: "auto" }}>
                <div className="d-flex flex-wrap gap-3 justify-content-left">
                    {selectedChanges.map((change, index) => (
                        <Card className="text-center" key={index} style={{ width: "200px" }}>
                            <CardBody className="p-0">
                                <CardTitle tag="h6">Change {index + 1}</CardTitle>
                                <CardText><span className="fw-bold">Type:</span> {change.changeType}</CardText>
                                <CardText><span className="fw-bold">Old:</span> {change.previousChange?.newValue || "N/A"}</CardText>
                                <CardText><span className="fw-bold">New:</span> {change.newValue}</CardText>
                                <hr />
                                <CardText>
                                    <small>{moment(change.changedAt).format("HH:mm:ss")}</small>
                                </CardText>
                                {change.user && change.user.avatarUrl && change.user.userName && (
                                    <CardText className="p-2 mb-2 text-center card-text user-info">
                                        <a href={`/profile/${change.user.userName}`} className="d-flex align-items-center justify-content-center">
                                            <img
                                                src={change.user.avatarUrl}
                                                alt={change.user.userName}
                                                className="rounded-circle"
                                                style={{ width: "30px", height: "30px", marginRight: "10px" }}
                                            />
                                            <span>{change.user.userName}</span>
                                        </a>
                                    </CardText>
                                )}
                            </CardBody>
                        </Card>
                    ))}
                </div>
            </ModalBody>
        </Modal >
    );
};

export default ChangeInfoModal;
