import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { putHtmlDb, putCssDb, putJavaScriptDb } from '../js/database';
import generate from '../js/generatePrompt';
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
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        const fetchResponse = async () => {
            // If the last message was sent by the user, simulate a reply
            if (messages.length && messages[messages.length - 1].sender === "You") {
                const chatGPTResponse = await generate(messages[messages.length - 1].message);
                console.log(chatGPTResponse);
                setMessages([...messages, { message: chatGPTResponse, sentTime: "just now", sender: "Bot", direction: "incoming" }]);
            }
        };

        fetchResponse();
    }, [messages]);



    const handleInputChange = (e) => {
        console.log(e);
        setInputValue(e);
    };

    const handleSend = () => {
        if (inputValue.trim() !== "") {
            // Adding the new message to the list of messages
            setMessages([...messages, { message: inputValue, sender: "You", direction: "outgoing" }]);
            // Clearing the input value
            setInputValue("");
        }
    };

    return <div style={{ position: "relative", height: "100%", width: "100%" }}>
        <MainContainer>
            <ChatContainer>
                <MessageList>
                    {messages.map((msg, index) => (
                        <Message key={index} model={msg} />
                    ))}
                </MessageList>
                <MessageInput
                    placeholder="Type message here"
                    value={inputValue}
                    onChange={handleInputChange}
                    onSend={handleSend} />
            </ChatContainer>
        </MainContainer>
    </div >;
}
export default MessageFeed;