export const authApi = {
    async signIn(user) {
        const response = await fetch('/api/user/signin', { 
            method: 'POST',
            body: JSON.stringify({
                Username: user.Username,
                SignInPassword: user.SignInPassword
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
            return;
        }

        const data = await response.json();
        throw data; 
    },

    async signUp(user) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({
                Email: user.Email,
                Username: user.Username,
                Password: user.Password,
                RepeatedPassword: user.RepeatedPassword,
            }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            return;
        }

        const data = await response.json();
        throw data; 
    },

    async isLogin() {
        var data = await fetch('/api/user/isLogin', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(respose => respose.json())

        return data
    },

    async logout() {
        await fetch('/api/user/logout', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        })
    }
};
