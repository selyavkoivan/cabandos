import React, { Component } from 'react';
import '../../assets/styles/Chat.css';
import { connect } from 'react-redux';

class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            websocket: null,
            isConnected: false,
            messages: [], // Структура сообщений [{ text, time, from, to }]
            message: '',
        };
    }

    componentDidMount() {
        const { otherUserId, me } = this.props;

        if (!me || !me.user.id) {
            console.error('User data is missing.');
            return;
        }

        const ws = new WebSocket(`wss://localhost:7045/api/chat/${otherUserId}`);

        ws.onopen = () => {
            console.log('WebSocket connection opened.');
            this.setState({ isConnected: true });
        };

        ws.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data);
            console.log('Message from server:', parsedMessage);

            this.setState((prevState) => ({
                messages: [...prevState.messages, parsedMessage],
            }));
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed.');
            this.setState({ isConnected: false });
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        this.setState({ websocket: ws });
    }

    componentWillUnmount() {
        const { websocket } = this.state;
        if (websocket && websocket.readyState === WebSocket.OPEN) {
            websocket.close();
        }
    }

    handleMessageChange = (e) => {
        this.setState({ message: e.target.value });
    };

    handleMessageSend = () => {
        const { websocket, isConnected, message } = this.state;
        const { otherUserId, me } = this.props;

        if (websocket && isConnected && message.trim()) {
            const messageObject = {
                text: message.trim(),
                time: new Date().toISOString(),
                from: me.user.id, // Ваш ID
                to: otherUserId, // ID собеседника
            };
            alert(JSON.stringify(messageObject))
            websocket.send(JSON.stringify(messageObject));

            this.setState((prevState) => ({
                messages: [...prevState.messages, messageObject],
                message: '',
            }));
        }
    };

    render() {
        const { messages, message, isConnected } = this.state;
        const { me } = this.props;

        return (
            <div className="chat-wrapper">
                <div className="chat-header">
                    <h2>Chat</h2>
                </div>

                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${msg.from === me.user.id ? 'chat-message-own' : '' 
                                }`}
                        >
                            <div className="chat-message-meta">
                                <span className="chat-message-time">
                                    {new Date(msg.time).toLocaleTimeString()}
                                </span>
                            </div>
                            <div className="chat-message-text">
                                {msg.text.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="chat-input-container row">
                    <textarea
                        className="chat-input col-11"
                        value={message}
                        onChange={(e) => {
                            this.handleMessageChange(e);
                            e.target.style.height = 'auto'; 
                            e.target.style.height = `${e.target.scrollHeight}px`; 
                        }}
                        placeholder="Type a message..."
                        rows={1} 
                        style={{
                            maxHeight: '6em', 
                            overflow: 'hidden', 
                        }}
                    />
                    <button
                        className="chat-send-button col-1"
                        onClick={this.handleMessageSend}
                        disabled={!isConnected || !message.trim()}
                    >
                        ➤
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    me: state.user.me,
});

export default connect(mapStateToProps, null)(ChatComponent);
