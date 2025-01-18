export const userApi = {
    async fetchAllUsers() {
        const response = await fetch('/api/user/all', { method: 'GET' })
        if (!response.ok) {
            throw new Error('Failed to get all users');
        }
        return response.json();
    },

    async fetchUsersByUsername(userDTO) {
        const response = await fetch('/api/users/search', {
            method: 'POST',
            body: JSON.stringify(userDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get users by username');
        }
        return response.json();
    },

    async fetchUserByUsername(userDTO) {
        const response = await fetch('/api/user/search', {
            method: 'POST',
            body: JSON.stringify(userDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get user by username');
        }
        return response.json();
    },

    async fetchMe(userDTO) {
        const response = await fetch('/api/user/me', {
            method: 'POST',
            body: JSON.stringify(userDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get me');
        }
        return response.json();
    },

    async editUser(userDTO) {
        const response = await fetch('/api/user/edit/userdata/' + userDTO.username, {
            method: 'POST',
            body: JSON.stringify(userDTO.userDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to edit user');
        }
        return;
    },

    async editUserPassword(userDTO) {
        const response = await fetch('/api/user/edit/password/' + userDTO.username, {
            method: 'POST',
            body: JSON.stringify(userDTO.userDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to edit user password');
        }
        return;
    }
};