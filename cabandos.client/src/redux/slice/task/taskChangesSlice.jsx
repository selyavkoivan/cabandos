import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
    isModalOpen: false,
    selectedChanges: [],
    groups: [],
    items: [],
};

const taskChangesSlice = createSlice({
    name: 'taskChanges',
    initialState,
    reducers: {
        toggleModal: (state) => {
            state.isModalOpen = !state.isModalOpen;
        },
        setChanges: (state, action) => {
            state.selectedChanges = action.payload;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        },
        processTaskChanges: (state, action) => {
            const taskChanges = action.payload;
            if (!taskChanges || taskChanges.length === 0) return;

            const groupedByType = taskChanges.reduce((acc, change) => {
                if (!acc[change.changeType]) {
                    acc[change.changeType] = [];
                }
                acc[change.changeType].push(change);
                return acc;
            }, {});

            const groups = Object.keys(groupedByType).map((changeType, index) => ({
                id: index + 1,
                title: changeType,
            }));

            Object.values(groupedByType).forEach(changes => {
                changes.sort((a, b) => new Date(a.changedAt) - new Date(b.changedAt));
            });

            const mergedChanges = [];
            Object.entries(groupedByType).forEach(([changeType, changes]) => {
                let currentGroup = null;

                changes.forEach(change => {
                    const currentChangeTime = new Date(change.changedAt);
                    const history = [
                        change.previousChange?.newValue || 'No Data',
                        change.newValue || 'No Data'

                    ].filter(Boolean);

                    if (!currentGroup) {
                        currentGroup = {
                            startTime: currentChangeTime,
                            endTime: moment(currentChangeTime).toDate(),
                            changeType,
                            history,
                            changes: [change],
                        };
                    } else {
                        const timeDiff = moment(currentChangeTime).diff(moment(currentGroup.endTime), 'minutes');
                        if (timeDiff <= 60) {
                            currentGroup.history.push(change.newValue || 'No Data');
                            currentGroup.endTime = moment(currentChangeTime).toDate();
                            currentGroup.changes.push(change);
                        } else {
                            mergedChanges.push(currentGroup);
                            currentGroup = {
                                startTime: currentChangeTime,
                                endTime: moment(currentChangeTime).toDate(),
                                changeType,
                                history,
                                changes: [change],
                            };
                        }
                    }
                });

                if (currentGroup) {
                    mergedChanges.push(currentGroup);
                }
            });

            const items = mergedChanges.map((change, index) => {
                const minDuration = 60 * 60 * 1000;
                const startTime = moment(change.startTime).valueOf();
                let endTime = moment(change.endTime).valueOf();
                let additionalDuration = 0
                const mainDuration = endTime - startTime;

                if (endTime - startTime < minDuration) {
                    additionalDuration = minDuration - mainDuration

                    endTime = startTime + minDuration;
                }

                return {
                    id: index + 1,
                    group: groups.find(g => g.title === change.changeType).id,
                    title: change.history.join(' -> ') || 'No title',
                    start_time: startTime,
                    end_time: endTime,
                    original_start_time: moment(change.startTime).valueOf(),
                    original_end_time: moment(change.endTime).valueOf(),
                    changeType: change.changeType,
                    history: change.history,
                    changes: change.changes,
                    changeCount: change.history.length - 1,
                    mainDuration: mainDuration,
                    additionalDuration: additionalDuration,
                };
            });

            state.groups = groups;
            state.items = items;
        },
    },
});

export const { toggleModal, setChanges, closeModal, processTaskChanges } = taskChangesSlice.actions;
export default taskChangesSlice.reducer;