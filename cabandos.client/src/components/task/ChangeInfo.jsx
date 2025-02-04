import React, { Component } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/dist/style.css";
import moment from "moment";

class ChangeInfo extends Component {
    render() {
        const { history, timeRange, changeCount } = this.props;

        const displayHistory =
            history.length > 2
                ? `${history[0]} -> ... -> ${history[history.length - 1]}`
                : history.join(" -> ");

        return (
            <div style={{
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                lineHeight: "1.5",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
            }}>
                <strong>Changes: {changeCount}</strong>
                <div>{displayHistory || "..."}</div>
                <div><small>{timeRange}</small></div>
            </div>
        );
    }
}

export default ChangeInfo;
