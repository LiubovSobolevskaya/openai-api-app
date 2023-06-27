import React from "react";
import { getHtmlDb, getCssDb, getJavaScriptDb } from '../js/database';

export default class Preview extends React.Component {
    hasMounted = false;
    async componentDidMount() {
        if (this.hasMounted) return;
        this.hasMounted = true;

        try {
            this.instance.script = null;
            this.instance.div = null;
            this.instance.style = null;



            console.log("I am being mounted!");
            const valueJavaScript = await getJavaScriptDb();
            const valueHtml = await getHtmlDb();
            const valueCss = await getCssDb();
            console.info('Loaded data from IndexedDB');

            // Append CSS
            const style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = valueCss;
            this.instance.appendChild(style);

            // Append HTML

            const div = document.createElement('div');
            div.innerHTML = valueHtml;
            this.instance.appendChild(div);


            // Append JavaScript

            // Append JavaScript
            const script = document.createElement('script');
            script.id = 'my-script'; // Assigning an ID to the script element
            script.type = 'text/javascript';
            script.innerHTML = `(function() { ${valueJavaScript} })();`;
            this.instance.appendChild(script);



        } catch (error) {
            console.error('Error loading data from IndexedDB:', error);
        }
    }

    render() {
        return <div ref={el => (this.instance = el)} />;
    }
}
