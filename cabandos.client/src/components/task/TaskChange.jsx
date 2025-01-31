import React from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/dist/style.css";
import moment from "moment";
import PropTypes from "prop-types";

const ChangeInfo = ({ changeType, newValue, time }) => {
    return (
        <div style={{ padding: "10px", border: "1px solid #ccc", borderRadius: "5px", backgroundColor: "#f9f9f9" }}>
            <strong>{changeType}</strong>
            <div><em>Changed to: {newValue}</em></div>
            <div><small>{time}</small></div>
        </div>
    );
};

ChangeInfo.propTypes = {
    changeType: PropTypes.string.isRequired,
    newValue: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
};

const TaskChangesTimeline = ({ taskChanges }) => {
    if (!taskChanges || taskChanges.length === 0) {
        return <p>No task changes available.</p>;
    }

    const sortedTaskChanges = [...taskChanges].sort((a, b) => new Date(a.changedAt) - new Date(b.changedAt));

    const groups = Array.from(
        new Set(sortedTaskChanges.map((change) => change.changeType))
    ).map((changeType, index) => ({ id: index + 1, title: changeType }));

    const changeHistory = {};

    const mergedChanges = [];
    sortedTaskChanges.forEach((change) => {
        const lastGroup = mergedChanges.length > 0 ? mergedChanges[mergedChanges.length - 1] : null;
        const lastChangeTime = lastGroup ? new Date(lastGroup.endTime) : null;
        const currentChangeTime = new Date(change.changedAt);

        if (!changeHistory[change.changeType]) {
            changeHistory[change.changeType] = [];
        }

        changeHistory[change.changeType].push(change.newValue);

        const statusTitle = changeHistory[change.changeType].join(' -> ');

        if (lastGroup && change.changeType === lastGroup.changeType &&
            (currentChangeTime - lastChangeTime) / 1000 < 3600) {
            lastGroup.endTime = currentChangeTime;
            lastGroup.title = statusTitle;
        } else {
            mergedChanges.push({
                id: mergedChanges.length + 1,
                group: groups.find((g) => g.title === change.changeType).id,
                title: statusTitle,
                startTime: currentChangeTime,
                endTime: moment(currentChangeTime).add(0.5, "hour").toDate(),
                changeType: change.changeType,
            });
        }
    });

    const items = mergedChanges.map((change) => ({
        id: change.id,
        group: change.group,
        title: change.title,
        start_time: moment(change.startTime),
        end_time: moment(change.endTime).add(0.5, "hour").toDate(),
    }));

    const minTime = moment(Math.min(...taskChanges.map(tc => new Date(tc.changedAt).getTime())));
    const maxTime = moment(Math.max(...taskChanges.map(tc => new Date(tc.changedAt).getTime())));

    return (
        <Timeline
            groups={groups}
            items={items}
            defaultTimeStart={minTime}
            defaultTimeEnd={maxTime}
            itemContent={(item) => (
                <ChangeInfo
                    changeType={item.changeType}
                    newValue={item.title} 
                    time={moment(item.start_time).format("HH:mm")}
                />
            )}
        />
    );
};

export default TaskChangesTimeline;
