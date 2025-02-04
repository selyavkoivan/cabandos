import React, { Component } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/dist/style.css";
import moment from "moment";
import { connect } from "react-redux";
import ChangeInfo from "./ChangeInfo";

class TaskChangesTimeline extends Component {
    processTaskChanges(taskChanges) {
        if (!taskChanges || taskChanges.length === 0) return { groups: [], items: [] };

        const sortedTaskChanges = [...taskChanges].sort((a, b) => new Date(a.changedAt) - new Date(b.changedAt));
        const groups = Array.from(new Set(sortedTaskChanges.map(change => change.changeType)))
            .map((changeType, index) => ({ id: index + 1, title: changeType }));

        const mergedChanges = [];
        let currentGroup = null;

        sortedTaskChanges.forEach(change => {
            const currentChangeTime = new Date(change.changedAt);
            const history = [change.previousChange?.newValue, change.newValue].filter(Boolean);

            if (!currentGroup) {
                currentGroup = {
                    startTime: currentChangeTime,
                    endTime: moment(currentChangeTime).toDate(),
                    changeType: change.changeType,
                    history,
                };
            } else {
                const timeDiff = moment(currentChangeTime).diff(moment(currentGroup.endTime), "minutes");
                if (timeDiff <= 60) {
                    currentGroup.history.push(change.newValue);
                    currentGroup.endTime = moment(currentChangeTime).toDate();
                } else {
                    mergedChanges.push(currentGroup);
                    currentGroup = {
                        startTime: currentChangeTime,
                        endTime: moment(currentChangeTime).toDate(),
                        changeType: change.changeType,
                        history,
                    };
                }
            }
        });

        if (currentGroup) {
            mergedChanges.push(currentGroup);
        }

        const items = mergedChanges.map((change, index) => {
            const minDuration = 60 * 60 * 1000;
            const startTime = moment(change.startTime).valueOf() - minDuration / 2;
            let endTime = moment(change.endTime).valueOf();

            if (endTime - startTime < minDuration) {
                endTime = startTime + minDuration;
            }

            return {
                id: index + 1,
                group: groups.find(g => g.title === change.changeType).id,
                title: change.history.join(" -> ") || "No title",
                start_time: startTime,
                end_time: endTime,
                original_start_time: moment(change.startTime).valueOf(),
                original_end_time: moment(change.endTime).valueOf(),
                changeType: change.changeType,
                history: change.history,
                changeCount: change.history.length - 1,
            };
        });

        return { groups, items };
    }

    render() {
        const { taskChanges } = this.props;
        if (!taskChanges || taskChanges.length === 0) {
            return <p>No task changes available.</p>;
        }

        const { groups, items } = this.processTaskChanges(taskChanges);
        const minTime = moment(Math.min(...items.map(item => item.start_time))).subtract(3, "hours").valueOf();
        const maxTime = moment(Math.max(...items.map(item => item.end_time))).add(3, "hours").valueOf();

        return (
            <Timeline
                groups={groups}
                items={items}
                defaultTimeStart={minTime}
                defaultTimeEnd={maxTime}
                lineHeight={120}
                itemRenderer={({ item, getItemProps }) => {
                    const { key, style, ...restProps } = getItemProps();
                    let timeRange = `${moment(item.original_start_time).format("HH:mm")} - ${moment(item.original_end_time).format("HH:mm")}`;
                    if (item.original_start_time === item.original_end_time) {
                        timeRange = moment(item.original_start_time).format("HH:mm");
                    }
                    return (
                        <div key={key} {...restProps} style={{
                            ...style,
                            height: "auto",
                            cursor: "pointer",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            boxSizing: "border-box",
                        }}>
                            <ChangeInfo history={item.history} timeRange={timeRange} changeCount={item.changeCount} />
                        </div>
                    );
                }}
            />
        );
    }
}


export default connect()(TaskChangesTimeline);
