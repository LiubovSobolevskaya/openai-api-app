import { useReducer } from "react";
// import {
//     SET_HTML_DATA,
//     SET_CSS_DATA,
//     SET_JS_DATA
// } from "./actions";

const initialState = {
    htmlData: "",
    cssData: "",
    jsData: "",
    isMessageSent: false,
};

const contentReducer = (state = initialState, action) => {
    console.log(action.payload);
    switch (action.type) {
        case 'SET_HTML_DATA':
            return { ...state, htmlData: action.payload };
        case 'SET_CSS_DATA':
            return { ...state, cssData: action.payload };
        case 'SET_JS_DATA':
            return { ...state, jsData: action.payload };
        case 'MESSAGE_SENT':
            return { ...state, isMessageSent: action.payload };
        default:
            return state;
    }
};

export default contentReducer;