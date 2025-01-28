import React, { Component } from 'react';
import '../../assets/styles/Chat.css';
import { connect } from 'react-redux';
import {
    fetchChatHistoryAsync,
    sendMessageAsync,
    setMessage,
    setWebSocket,
    setIsConnected,
    addMessage,
    setScrollPosition,
} from '../../redux/slice/chat/chatSlice';

class ChatComponent extends Component {
    constructor(props) {
        super(props);
        this.messagesEndRef = React.createRef();
    }

    componentDidMount() {
        const { otherUserId, me, websocket, fetchChatHistoryAsync, setWebSocket, setIsConnected, addMessage } = this.props;

        if (!me || !me.user.id) {
            console.error('User data is missing.');
            return;
        }

        fetchChatHistoryAsync({ otherUserId, skip: 0, take: this.props.loadCount });

        const ws = new WebSocket(`wss://localhost:7045/api/chat/${otherUserId}`);
        ws.onopen = () => {
            console.log('WebSocket connection opened.');
            setIsConnected(true);
        };
        ws.onmessage = (event) => {
            const parsedMessage = JSON.parse(event.data);
            console.log('Message from server:', parsedMessage);
            addMessage(parsedMessage);
            this.scrollToBottom();
        };
        ws.onclose = () => {
            console.log('WebSocket connection closed.');
            setIsConnected(false);
        };
        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        setWebSocket(ws);

        this.scrollToBottom();
    }

    componentWillUnmount() {
        const { websocket } = this.props;
        if (websocket && websocket.readyState === WebSocket.OPEN) {
            websocket.close();
        }
    }

    handleScroll = (e) => {
        const { scrollTop } = e.target;
        const { hasMoreMessages, isLoading, fetchChatHistoryAsync, otherUserId, setScrollPosition } = this.props;

        if (scrollTop === 0 && hasMoreMessages && !isLoading) {
            fetchChatHistoryAsync({ otherUserId, skip: this.props.messages.length, take: this.props.loadCount });
        }
        setScrollPosition(scrollTop);
    };

    handleMessageChange = (e) => {
        this.props.setMessage(e.target.value);
    };

    handleMessageSend = () => {
        const { websocket, isConnected, message, otherUserId, me, sendMessageAsync } = this.props;

        if (websocket && isConnected && message.trim()) {
            const messageObject = {
                message: message.trim(),
                sentAt: new Date().toISOString(),
                fromUserId: me.user.id,
                toUserId: otherUserId,
            };
            sendMessageAsync({ messageObject, websocket });
            this.props.setMessage('');
            this.scrollToBottom();
        }
    };

    scrollToBottom = () => {
        if (this.messagesEndRef.current) {
            this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    render() {
        const { messages, message, isLoading, me } = this.props;

        const formatDate = (date) => {
            return new Date(date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        };

        let lastMessageDate = null;

        return (
            <div className="chat-wrapper">
                <h2>Chat</h2>

                <div className="chat-messages" onScroll={this.handleScroll}>
                    {isLoading && <div className="loading-indicator">Loading...</div>}

                    {messages.map((msg, index) => {
                        const isOwnMessage = msg.fromUserId === me.user.id;
                        const previousMessage = messages[index - 1];
                        const nextMessage = messages[index + 1];

                        const currentMessageDate = formatDate(msg.sentAt);
                        const showDateSeparator = lastMessageDate !== currentMessageDate;
                        lastMessageDate = currentMessageDate;

                        var shouldAddMarginTop = false;
                        var showArrowForOwn = false;
                        var showArrowForOther = false;

                        if (nextMessage && nextMessage.fromUserId !== msg.fromUserId) {
                            if (isOwnMessage) {
                                showArrowForOwn = true;
                            } else {
                                showArrowForOther = true;
                            }
                        } else {
                            const timeDifferenceOld = previousMessage
                                ? (new Date(msg.sentAt) - new Date(previousMessage.sentAt)) / 1000
                                : null;
                            const timeDifferenceNew = nextMessage
                                ? (new Date(nextMessage.sentAt) - new Date(msg.sentAt)) / 1000
                                : null;

                            shouldAddMarginTop = timeDifferenceOld && timeDifferenceOld > 60;

                            const isLastMessage = index === messages.length - 1;

                            showArrowForOwn = isOwnMessage && (isLastMessage || timeDifferenceNew > 60);
                            showArrowForOther = !isOwnMessage && (isLastMessage || timeDifferenceNew > 60);
                        }

                        return (
                            <div key={index}>
                                {showDateSeparator && <div className="date-separator">{currentMessageDate}</div>}
                                <div className={`chat-message-wrapper ${isOwnMessage ? 'own' : ''}`} style={shouldAddMarginTop ? { marginTop: '10px' } : { marginTop: '2px' }}>
                                    <div className={`chat-message ${isOwnMessage ? 'chat-message-own' : ''}`}>
                                        {showArrowForOwn && <div className="message-arrow own"></div>}
                                        {showArrowForOther && <div className="message-arrow other"></div>}
                                        <div className="chat-message-text">
                                            {msg.message.split('\n').map((line, i) => (
                                                <React.Fragment key={i}>
                                                    {line}
                                                    <br />
                                                </React.Fragment>
                                            ))}
                                        </div>
                                        <div className="chat-message-meta">
                                            {new Date(msg.sentAt).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={this.messagesEndRef} />
                </div>

                <div className="chat-input-container">
                    <textarea
                        className="chat-input"
                        value={message}
                        onChange={this.handleMessageChange}
                        placeholder="Type a message..."
                        rows={1}
                        style={{
                            maxHeight: '6em',
                            overflow: 'hidden',
                        }}
                    />
                    <button
                        className="chat-send-button"
                        onClick={this.handleMessageSend}
                        disabled={!message.trim()}
                    >
                        ➤
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    messages: state.chat.messages,
    isLoading: state.chat.isLoading,
    websocket: state.chat.websocket,
    message: state.chat.message,
    hasMoreMessages: state.chat.hasMoreMessages,
    loadCount: state.chat.loadCount,
    isConnected: state.chat.isConnected,
    me: state.user.me,
});

const mapDispatchToProps = {
    fetchChatHistoryAsync,
    sendMessageAsync,
    setMessage,
    setWebSocket,
    setIsConnected,
    addMessage,
    setScrollPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);
