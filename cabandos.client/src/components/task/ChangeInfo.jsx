import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModal, setChanges } from "../../redux/slice/task/taskChangesSlice";
import ChangeInfoModal from "./ChangeInfoModal";

const ChangeInfo = ({ history, timeRange, changeCount, changes }) => {
    const dispatch = useDispatch();
    const modalIsOpen = useSelector(state => state.taskChanges.isModalOpen);

    const toggleModalHandler = () => {
        if (!modalIsOpen) {
            dispatch(setChanges(changes));
        }
        dispatch(toggleModal());
    };

    const displayHistory =
        history.length > 2
            ? `${history[0]} -> ... -> ${history[history.length - 1]}`
            : history.join(" -> ");

    return (
        <div
            onClick={toggleModalHandler}
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
            <ChangeInfoModal isOpen={modalIsOpen} />
        </div>
    );
};

export default ChangeInfo;
