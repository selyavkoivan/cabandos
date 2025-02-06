import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleModal, setChanges } from "../../redux/slice/task/taskChangesSlice";
import ChangeInfoModal from "./ChangeInfoModal";

class ChangeInfo extends Component {
    toggleModalHandler = () => {
        const { modalIsOpen, setChanges, toggleModal, changes } = this.props;
        if (!modalIsOpen) {
            setChanges(changes);
        }
        toggleModal();
    };

    render() {
        const { history, timeRange, changeCount, modalIsOpen } = this.props;
        const displayHistory =
            history.length > 2
                ? `${history[0]} -> ... -> ${history[history.length - 1]}`
                : history.join(" -> ");

        return (
            <div
                onClick={this.toggleModalHandler}
                style={{
                    cursor: "pointer",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                    lineHeight: "1.5",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    color: "black",
                }}
            >
                <strong>Changes: {changeCount}</strong>
                <div>{displayHistory || "..."}</div>
                <div><small>{timeRange}</small></div>
                <ChangeInfoModal isOpen={modalIsOpen} />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    modalIsOpen: state.taskChanges.isModalOpen,
});

const mapDispatchToProps = {
    toggleModal,
    setChanges,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangeInfo);