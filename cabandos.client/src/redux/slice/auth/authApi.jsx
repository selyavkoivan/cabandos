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
    }
};
