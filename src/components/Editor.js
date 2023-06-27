import React, { useState } from "react";
import { putHtmlDb, putCssDb, putJavaScriptDb, getHtmlDb, getCssDb, getJavaScriptDb } from '../js/database';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { less } from '@codemirror/lang-less'

const Editor = ({ type }) => {

    const [value, setValue] = useState("");
    const localData = localStorage.getItem(type);
    function onBlur() {
        const text = localStorage.getItem(type)
        console.log(text);
        switch (type) {
            case 'javascript':
                putJavaScriptDb(text);
                console.log('Added to javascript');
                break;
            case 'html':
                putHtmlDb(text);
                console.log('Added to html');
                break;
            case 'css':
                putCssDb(text);
                console.log('Added to css');
                break;
            default:
                break;
        }
    }
    function onChange(e) {
        console.log(e);
        //setValue(e);
        //console.log(value);
        localStorage.setItem(type, e);
    }
    switch (type) {
        case 'javascript':
            getJavaScriptDb().then((data) => {
                console.log(data);
                console.info('Loaded data from javascript IndexedDB, injecting into editor');
                setValue(data || localData || "");
            });
            break;
        case 'html':
            getHtmlDb().then((data) => {
                console.log(data);
                console.info('Loaded data from html IndexedDB, injecting into editor');
                setValue(data || localData || "");
            });
            break;
        case 'css':
            getCssDb().then((data) => {
                console.log(data);
                console.info('Loaded data from css IndexedDB, injecting into editor');
                setValue(data || localData || "");
            });
            break;
        default:
            break;
    }


    if (type === 'javascript') {
        return <CodeMirror
            value={value}
            height="100%"
            width="100%"
            extensions={[javascript({ jsx: true })]}
            onBlur={onBlur}
            onChange={onChange}
        />
    }
    if (type === 'html') {
        return <CodeMirror
            value={value}
            height="100%"
            width="100%"
            extensions={[html()]}
            onBlur={onBlur}
            onChange={onChange}
        />
    }
    return <CodeMirror
        value={value}
        height="100%"
        width="100%"
        extensions={[less()]}
        onBlur={onBlur}
        onChange={onChange}
    />


}

export default Editor;