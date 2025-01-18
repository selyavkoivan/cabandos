export const authApi = {
    async signIn(user) {
        const response = await fetch('/api/auth/signin', { 
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
        const response = await fetch('/api/auth/signup', {
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
        var data = await fetch('/api/auth/isLogin', {
            method: 'GET',
            headers: { "Content-Type": "application/json" },
        }).then(respose => respose.json())

        return data
    },

    async logout() {
        await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
        })
    }
};
