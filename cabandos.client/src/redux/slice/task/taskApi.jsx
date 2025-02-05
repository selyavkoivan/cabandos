export const taskApi = {
    async fetchTasksByStatus() {
        const response = await fetch('/api/task/GetTasksByStatus');
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        return response.json();
    },

    async addTask(taskDTO) {
        const response = await fetch('/api/task/AddTask', {
            method: 'POST',
            body: JSON.stringify(taskDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to add task');
        }
        return response.json();
    },

    async editTaskStatus(task) {
        const response = await fetch('/api/task/EditTaskStatus', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to update task status');
        }
        return;
    },

    async deleteTask(task) {
        const response = await fetch('/api/task/DeleteTask', {
            method: 'POST',
            body: JSON.stringify(task),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }
        return;
    },

    async fetchTaskChanges(taskId) {
        const response = await fetch(`/api/task/GetTaskChanges/${taskId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch task changes');
        }
        return response.json();
    },
};