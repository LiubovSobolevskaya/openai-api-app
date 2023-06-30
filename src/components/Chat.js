import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { putHtmlDb, putCssDb, putJavaScriptDb } from '../js/database';
import {
    SET_HTML_DATA,
    SET_CSS_DATA,
    SET_JS_DATA,
    MESSAGE_SENT,
} from "../js/actions";
import generate from '../js/generatePrompt';
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchResponse = async () => {
            // If the last message was sent by the user, simulate a reply
            if (messages.length && messages[messages.length - 1].sender === "You") {
                const chatGPTResponse = await generate(messages[messages.length - 1].message);
                console.log(chatGPTResponse);
                let codeparts;
                if (chatGPTResponse.includes('~~~')) {
                    codeparts = chatGPTResponse.split('~~~');
                }
                else {
                    codeparts = chatGPTResponse.split('```');
                }
                if (codeparts.length === 1) {
                    setMessages([...messages, { message: codeparts[0], sentTime: "just now", sender: "Bot", direction: "incoming" }]);
                    return;
                }
                let i = 0;
                while (i < codeparts.length) {
                    let element = codeparts[i];
                    let processedElement = element.trim();
                    if (processedElement.toLowerCase().includes('html') && !processedElement.toLowerCase().includes('<')) {
                        i++;
                        if (codeparts[i]) {
                            processedElement = codeparts[i].trim();
                            if (processedElement.toLowerCase().includes('html') && processedElement.toLowerCase().slice(0, 4) === 'html') {
                                processedElement = processedElement.substring(5);
                            }
                            if (processedElement.includes('<body>')) {
                                processedElement = processedElement.split('<body>')[1].split('</body>')[0]
                            }
                            dispatch({
                                type: SET_HTML_DATA,
                                payload: processedElement,
                            });
                            putHtmlDb(processedElement);
                            console.log('Added to html');
                            localStorage.setItem('html', processedElement);
                        }

                    }
                    else if (processedElement.toLowerCase().includes('html') && processedElement.toLowerCase().slice(0, 4) === 'html') {
                        processedElement = processedElement.substring(5);
                        if (processedElement.includes('<script>')) {
                            const scriptPart = processedElement.split('<script>')[1].split('</script>')[0];
                            if (scriptPart.includes('src')) {
                                processedElement = processedElement.split('<script>')[0] + processedElement.split('</script>')[1]
                            }
                        }
                        if (processedElement.includes('<body>')) {
                            processedElement = processedElement.split('<body>')[1].split('</body>')[0]
                        }


                        if (processedElement.trim().length) {
                            dispatch({
                                type: SET_HTML_DATA,
                                payload: processedElement,
                            });
                            putHtmlDb(processedElement);
                            console.log('Added to html');
                            localStorage.setItem('html', processedElement);

                        }


                    }
                    else if (processedElement.toLowerCase().includes('css') && !processedElement.toLowerCase().includes('font-size')) {
                        i++;
                        if (codeparts[i]) {
                            processedElement = codeparts[i].trim();
                            if (processedElement.toLowerCase().includes('css') && processedElement.toLowerCase().slice(0, 3) === 'css') {
                                processedElement = processedElement.substring(4);
                            }
                            dispatch({
                                type: SET_CSS_DATA,
                                payload: processedElement,
                            });
                            putCssDb(processedElement);
                            console.log('Added to css');
                            localStorage.setItem('css', processedElement);
                        }

                    }
                    else if (processedElement.toLowerCase().includes('css') && processedElement.toLowerCase().slice(0, 3) === 'css') {
                        processedElement = processedElement.substring(4);
                        dispatch({
                            type: SET_CSS_DATA,
                            payload: processedElement,
                        });
                        putCssDb(processedElement);
                        console.log('Added to css');
                        localStorage.setItem('css', processedElement);

                    }
                    else if (processedElement.toLowerCase().includes('javascript') && !processedElement.toLowerCase().includes('return')) {
                        i++;
                        if (codeparts[i]) {
                            processedElement = codeparts[i].trim();
                            if (processedElement.toLowerCase().includes('javascript') && processedElement.toLowerCase().slice(0, 10) === 'javascript') {
                                processedElement = processedElement.substring(11);
                            }
                            dispatch({
                                type: SET_JS_DATA,
                                payload: processedElement,
                            });
                            putJavaScriptDb(processedElement);
                            console.log('Added to javascript');
                            localStorage.setItem('javascript', processedElement);
                        }

                    }
                    else if (processedElement.toLowerCase().includes('javascript') && processedElement.toLowerCase().slice(0, 10) === 'javascript') {
                        processedElement = processedElement.substring(10);
                        dispatch({
                            type: SET_JS_DATA,
                            payload: processedElement,
                        });
                        putJavaScriptDb(processedElement);
                        console.log('Added to javascript');
                        localStorage.setItem('javascript', processedElement);

                    }

                    else {
                        setMessages([...messages, { message: codeparts[0], sentTime: "just now", sender: "Bot", direction: "incoming" }]);
                    }
                    i++;

                }
                dispatch({
                    type: MESSAGE_SENT,
                    payload: false,
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
        dispatch({
            type: MESSAGE_SENT,
            payload: true,
        });
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