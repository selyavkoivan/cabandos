import React, { useState } from "react";
import ChangeInfoModal from "./ChangeInfoModal";

const ChangeInfo = ({ history, timeRange, changeCount, changes }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const toggleModal = () => setModalIsOpen(!modalIsOpen);

    const displayHistory =
        history.length > 2
            ? `${history[0]} -> ... -> ${history[history.length - 1]}`
            : history.join(" -> ");

    return (
        <div
            onClick={toggleModal}
            style={{
                cursor: "pointer",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                lineHeight: "1.5",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            }}
        >
            <strong>Changes: {changeCount}</strong>
            <div>{displayHistory || "..."}</div>
            <div><small>{timeRange}</small></div>
            <ChangeInfoModal isOpen={modalIsOpen} toggle={toggleModal} changes={changes} />
        </div>
    );
};

export default ChangeInfo;
