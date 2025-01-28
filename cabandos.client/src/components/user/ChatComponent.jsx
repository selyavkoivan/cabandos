﻿import React, { Component } from 'react';
import '../../assets/styles/Chat.css';
import { connect } from 'react-redux';

class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            websocket: null,
            isConnected: false,
            messages: [],
            message: '',
            isLoading: false,
            hasMoreMessages: true,
            scrollPosition: 0,
            loadCount: 10,
        };
        this.messagesEndRef = React.createRef();
    }

    componentDidMount() {
        const { otherUserId, me } = this.props;

        if (!me || !me.user.id) {
            console.error('User data is missing.');
            return;
        }

        this.loadMessages(otherUserId, this.state.loadCount); 

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
            }), this.scrollToBottom);
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

    loadMessages = (otherUserId) => {
        const { messages } = this.state;

        this.setState({ isLoading: true });

        const chatMessagesDiv = document.querySelector('.chat-messages');
        const previousScrollHeight = chatMessagesDiv.scrollHeight;

        fetch(`/api/chat/history/${otherUserId}?skip=${messages.length}&take=${this.state.loadCount}`, { method: 'GET' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch chat history');
                }
                return response.json();
            })
            .then((newMessages) => {
                this.setState(
                    (prevState) => ({
                        messages: [...newMessages.reverse(), ...prevState.messages],
                        hasMoreMessages: newMessages.length === this.state.loadCount,
                        isLoading: false,
                    }),
                    () => {
                        const newScrollHeight = chatMessagesDiv.scrollHeight;
                        chatMessagesDiv.scrollTop = newScrollHeight - previousScrollHeight;
                    }
                );
            })
            .catch((error) => {
                console.error('Error loading chat history:', error);
                this.setState({ isLoading: false });
            });
    };


    handleScroll = (e) => {
        const { scrollTop } = e.target;
        const { hasMoreMessages, isLoading } = this.state;

        if (scrollTop === 0 && hasMoreMessages && !isLoading) {
            const { otherUserId } = this.props;
            this.loadMessages(otherUserId, 10);
        }
    };


    handleMessageChange = (e) => {
        this.setState({ message: e.target.value });
    };

    handleMessageSend = () => {
        const { websocket, isConnected, message } = this.state;
        const { otherUserId, me } = this.props;

        if (websocket && isConnected && message.trim()) {
            const messageObject = {
                message: message.trim(),
                sentAt: new Date().toISOString(),
                fromUserId: me.user.id,
                toUserId: otherUserId,
            };
            websocket.send(JSON.stringify(messageObject));

            this.setState((prevState) => ({
                messages: [...prevState.messages, messageObject],
                message: '',
            }), this.scrollToBottom);
        }
    };

    scrollToBottom = () => {
        if (this.messagesEndRef.current) {
            this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    render() {
        const { messages, message, isConnected, isLoading } = this.state;
        const { me } = this.props;

        return (
            <div className="chat-wrapper">
                <div className="chat-header">
                    <h2>Chat</h2>
                </div>

                <div
                    className="chat-messages"
                    onScroll={this.handleScroll}
                >
                    {isLoading && <div className="loading-indicator">Loading...</div>}

                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${msg.fromUserId === me.user.id ? 'chat-message-own' : ''}`}
                        >
                            <div className="chat-message-meta">
                                <span className="chat-message-time">
                                    {new Date(msg.sentAt).toLocaleTimeString()}
                                </span>
                            </div>
                            <div className="chat-message-text">
                                {msg.message.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>
                                        {line}
                                        <br />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div ref={this.messagesEndRef} />
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
