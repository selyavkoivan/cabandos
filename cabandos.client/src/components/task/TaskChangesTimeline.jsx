import React, { Component } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/dist/style.css";
import { connect } from "react-redux";
import moment from "moment";
import { processTaskChanges } from "../../redux/slice/task/taskChangesSlice";
import ChangeInfo from "./ChangeInfo";

class TaskChangesTimeline extends Component {
    componentDidMount() {
        const { taskChanges, dispatch } = this.props;
        if (taskChanges) {
            dispatch(processTaskChanges(taskChanges));
        }
    }

    render() {
        const { groups, items } = this.props;

        if (!items || items.length === 0) {
            return <p>No task changes available.</p>;
        }

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
                        <div key={key} {...restProps} style={style}>
                            <ChangeInfo
                                history={item.history}
                                timeRange={timeRange}
                                changeCount={item.changeCount}
                                changes={item.changes}
                            />
                        </div>
                    );
                }}
            />
        );
    }
}

const mapStateToProps = (state) => ({
    groups: state.taskChanges.groups,
    items: state.taskChanges.items,
});

export default connect(mapStateToProps)(TaskChangesTimeline);