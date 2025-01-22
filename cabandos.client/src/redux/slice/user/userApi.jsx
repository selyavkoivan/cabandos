export const userApi = {
    async fetchAllUsers() {
        const response = await fetch('/api/user/all', { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch all users');
        }
        return response.json();
    },

    async searchUsers(searchUserDTO) {
        const response = await fetch('/api/user/search', {
            method: 'POST',
            body: JSON.stringify(searchUserDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to search users');
        }
        return response.json();
    },

    async fetchUserByUsername(username) {
        const response = await fetch(`/api/user/profile/${username}`, { method: 'GET' });

        if (!response.ok) {
            throw new Error('Failed to fetch user by username');
        }
        return response.json();
    },

    async fetchUser(searchUserDTO) {
        const response = await fetch('/api/user/profile', {
            method: 'POST',
            body: JSON.stringify(searchUserDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user');
        }
        return response.json();
    },

    async fetchMe(searchUserDTO) {
        const response = await fetch('/api/user/me', {
            method: 'POST',
            body: JSON.stringify(searchUserDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch current user');
        }
        return response.json();
    },

    async editUser(username, userDTO) {
        const response = await fetch(`/api/user/edit/userdata/${username}`, {
            method: 'POST',
            body: JSON.stringify(userDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const data = await response.json();
            throw data;
        } 

        return userDTO.username;
    },

    async editUserPassword(username, userDTO) {
        const response = await fetch(`/api/user/edit/password/${username}`, {
            method: 'POST',
            body: JSON.stringify(userDTO),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const data = await response.json();
            throw data;
        } 
    },

    async uploadUserPhoto(username, file) {
        const response = await fetch('/api/user/edit/avatar/' + username, {
            method: 'POST',
            body: file
        })

        if (!response.ok) {
            const data = await response.json();
            throw data;
        }
    },
};