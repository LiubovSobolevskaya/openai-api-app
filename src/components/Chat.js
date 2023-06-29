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
                const codeparts = chatGPTResponse.split('```');
                if (codeparts.length === 1) {
                    setMessages([...messages, { message: codeparts[0], sentTime: "just now", sender: "Bot", direction: "incoming" }]);
                    return;
                }
                codeparts.forEach(element => {
                    element = element.trim();
                    if (element.includes('javascript') && element.slice(0, 10) === 'javascript') {
                        element = element.substring(10);
                        putJavaScriptDb(element);
                        console.log('Added to javascript');
                        localStorage.setItem('javascript', element);
                    }
                    else if (element.includes('css') && element.slice(0, 3) === 'css') {
                        element = element.substring(3);
                        putCssDb(element);
                        console.log('Added to css');
                        localStorage.setItem('css', element);
                    }
                    else if (element.includes('html') && element.slice(0, 4) === 'html') {
                        element = element.substring(4);
                        if (element.includes('<script>')) {
                            const scriptPart = element.split('<script>')[1].split('</script>')[0];
                            if (scriptPart.includes('src')) {
                                element = element.split('<script>')[0] + element.split('</script>')[1]
                            }
                        }
                        // if (element.includes('<style>')) {
                        //     const part = element.split('<style>')[1];
                        //     const words = part.split(' ');
                        //     let word = words[0];
                        //     let save = [word];
                        //     let i = 0;
                        //     while (word !== '</style>') {
                        //         i++;
                        //         word = words[i]
                        //         save.push(word);
                        //     }
                        //     putCssDb(save.join(" "));
                        //     console.log('Added to css');
                        //     localStorage.setItem('css', save.join(" "));
                        // }
                        // if (element.includes('<script>')) {
                        //     const part = element.split('<script>')[1].split('</script>')[0];
                        //     console.log(part);
                        //     const words = part.split(' ');
                        //     console.log(words);
                        //     let word = words[0];
                        //     let save = [word];
                        //     let i = 0;
                        //     while (word !== '</script>') {
                        //         i++;
                        //         word = words[i]
                        //         save.push(word);
                        //     }
                        //     console.log(save.join(" "));
                        //     putJavaScriptDb(save.join(" "));
                        //     console.log('Added to JavaScript');
                        //     localStorage.setItem('javascript', save.join(" "));
                        // }
                        // if (element.includes('<body>')) {
                        //     const part = element.split('<body>')[1];
                        //     const words = part.split(' ');
                        //     let word = words[0];
                        //     let save = [word];
                        //     let i = 0;
                        //     while (word !== '</body>' || word !== '</script>') {
                        //         i++;
                        //         word = words[i]
                        //         save.push(word);
                        //     }
                        //     putHtmlDb(save.join(" "));
                        //     console.log('Added to Html');
                        //     localStorage.setItem('html', element);


                        // }
                        // else {
                        if (element.trim().length) {
                            putHtmlDb(element);
                        }
                        console.log('Added to html');
                        localStorage.setItem('html', element);

                    }
                    else {
                        setMessages([...messages, { message: codeparts[0], sentTime: "just now", sender: "Bot", direction: "incoming" }]);
                    }

                });


            }
        };

        fetchResponse();
    }, [messages]);



    const handleInputChange = (e) => {
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