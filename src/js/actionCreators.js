// actionCreators.js
import { SET_HTML_DATA, SET_CSS_DATA, SET_JS_DATA, MESSAGE_SENT } from './actions';

export const setHTMLData = data => ({
    type: SET_HTML_DATA,
    payload: data
});

export const setCSSData = data => ({
    type: SET_CSS_DATA,
    payload: data
});

export const setJSData = data => ({
    type: SET_JS_DATA,
    payload: data
});

export const MessageSent = data => ({
    type: MESSAGE_SENT,
    payload: data
});

