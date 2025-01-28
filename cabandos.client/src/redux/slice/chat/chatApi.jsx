export const chatApi = {
    async fetchChatHistory(otherUserId, skip = 0, take = 10) {
        const response = await fetch(`/api/chat/history/${otherUserId}?skip=${skip}&take=${take}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            return response.json();
        }

        const data = await response.json();
        throw data;
    },

    sendMessage(websocket, messageObject) {
        if (websocket && websocket.readyState === WebSocket.OPEN) {
            websocket.send(JSON.stringify(messageObject)); 
            return messageObject;
        }
        throw new Error('WebSocket is not open');
    },

    async getUserStatus(userId) {
        const response = await fetch(`/api/chat/status/${userId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            return response.json(); 
        }

        const data = await response.json();
        throw data;
    },
};