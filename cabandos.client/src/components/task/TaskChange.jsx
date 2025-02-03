import React, { useState } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/dist/style.css";
import moment from "moment";
import PropTypes from "prop-types";

const ChangeInfo = ({ history, timeRange, changeCount }) => {

    const displayHistory =
        history.length > 2
            ? `${history[0]} -> ... -> ${history[history.length - 1]}`
            : history.join(" -> ");

    return (
        <div
            style={{
                flexDirection: "column",
                alignItems: "center",
                padding: "10px",
                lineHeight: "1.5",
                overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                color: 'black',
            }}
        >
            <strong>Changes: {changeCount}</strong>
            <div>
                {displayHistory || "..."}
            </div>
            <div>
                <small>{timeRange}</small>
            </div>
        </div>
    );
};

const TaskChangesTimeline = ({ taskChanges }) => {

    if (!taskChanges || taskChanges.length === 0) {
        return <p>No task changes available.</p>;
    }

    const sortedTaskChanges = [...taskChanges].sort((a, b) => new Date(a.changedAt) - new Date(b.changedAt));

    const groups = Array.from(
        new Set(sortedTaskChanges.map((change) => change.changeType))
    ).map((changeType, index) => ({ id: index + 1, title: changeType }));

    const mergedChanges = [];
    let currentGroup = null;

    sortedTaskChanges.forEach((change) => {
        const currentChangeTime = new Date(change.changedAt);
        const history = change.previousChange
            ? [change.previousChange.newValue, change.newValue]
            : [change.newValue];

        if (!currentGroup) {
            currentGroup = {
                startTime: currentChangeTime,
                endTime: moment(currentChangeTime).add(1, "hour").toDate(),
                changeType: change.changeType,
                history: history,
            };
        } else {
            const timeDiff = moment(currentChangeTime).diff(moment(currentGroup.endTime), "minutes");
            if (timeDiff <= 60) {
                currentGroup.history.push(change.newValue);
                currentGroup.endTime = moment(currentChangeTime).add(0.5, "hour").toDate();
            } else {
                mergedChanges.push(currentGroup);

                currentGroup = {
                    startTime: currentChangeTime,
                    endTime: moment(currentChangeTime).add(1, "hour").toDate(),
                    changeType: change.changeType,
                    history: history,
                };
            }
        }
    });

    if (currentGroup) {
        mergedChanges.push(currentGroup);
    }

    const items = mergedChanges.map((change, index) => {
        const changeCount = change.history.length - 1;

        return {
            id: index + 1,
            group: groups.find((g) => g.title === change.changeType).id,
            title: change.history.join(" -> ") || "No title",
            start_time: moment(change.startTime).valueOf(),
            end_time: moment(change.endTime).valueOf(),
            changeType: change.changeType,
            history: change.history,
            changeCount: changeCount,
        };
    });

    const minTime = moment(Math.min(...items.map(item => item.start_time)))
        .subtract(3, "hours")
        .valueOf();

    const maxTime = moment(Math.max(...items.map(item => item.end_time)))
        .add(3, "hours")
        .valueOf();

    return (
        <>
            <Timeline
                groups={groups}
                items={items}
                defaultTimeStart={minTime}
                defaultTimeEnd={maxTime}
                lineHeight={130}
                itemRenderer={({ item, itemContext, getItemProps }) => {
                    const itemProps = getItemProps();
                    const { key, style, ...restProps } = itemProps;

                    const timeRange = `${moment(item.start_time).format("HH:mm")} - ${moment(item.end_time).format("HH:mm")}`;
                    const changeCount = item.changeCount;
                    return (
                        <div
                            key={key}
                            {...restProps}
                            style={{
                                ...style,
                                height: "auto",
                                cursor: "pointer",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                boxSizing: "border-box",
                            }}
                        >
                            <ChangeInfo
                                changeType={item.changeType}
                                history={item.history}
                                time={moment(item.start_time).format("HH:mm")}
                                timeRange={timeRange}
                                changeCount={changeCount}
                            />
                        </div>
                    );
                }}
            />
        </>
    );
};

export default TaskChangesTimeline;
