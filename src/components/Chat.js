import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import React, { useEffect, useState } from "react";

import {
    MainContainer,
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
} from "@chatscope/chat-ui-kit-react";


const MessageFeed = () => {
    const [messages, setMessages] = useState([]);

    return <div style={{ position: "relative", height: "500px" }}>
        <MainContainer>
            <ChatContainer>
                <MessageList>
                    {messages.map((message) => (
                        <Message key={message.id} model={{
                            message: "Hello my friend",
                        }} />
                    ))}
                </MessageList>
                <MessageInput placeholder="Type message here" />
            </ChatContainer>
        </MainContainer>
    </div>;
}
export default MessageFeed;