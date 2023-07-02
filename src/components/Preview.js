import React from "react";
import { getHtmlDb, getCssDb, getJavaScriptDb } from '../js/database';
import { connect } from 'react-redux';
import { setHTMLData, setCSSData, setJSData, MessageSent } from '../js/actionCreators';
import Loader from './assets/loader.css';

class Preview extends React.Component {

    async componentDidMount() {

        try {
            // this.instance.script = null;
            // this.instance.div = null;
            // this.instance.style = null;

            const valueJavaScript = await getJavaScriptDb();
            const valueHtml = await getHtmlDb();
            const valueCss = await getCssDb();

            this.props.setHTMLData(valueHtml);
            this.props.setCSSData(valueCss);
            this.props.setJSData(valueJavaScript);

            while (this.instance.firstChild) {
                this.instance.removeChild(this.instance.firstChild);
            }

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
            const script = document.createElement('script');
            script.id = 'my-script'; // Assigning an ID to the script element
            script.type = 'text/javascript';
            script.innerHTML = `(function() { ${valueJavaScript} })();`;
            this.instance.appendChild(script);



        } catch (error) {
            console.error('Error loading data from IndexedDB:', error);
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.htmlData !== this.props.htmlData ||
            prevProps.cssData !== this.props.cssData ||
            prevProps.jsData !== this.props.jsData
        ) {
            this.updateContent();
        }
    }



    updateContent() {
        while (this.instance.firstChild) {
            this.instance.removeChild(this.instance.firstChild);
        }

        // Append CSS
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = this.props.cssData;
        this.instance.appendChild(style);
        // Append HTML

        const div = document.createElement('div');
        div.innerHTML = this.props.htmlData;
        this.instance.appendChild(div);

        // Append JavaScript
        const script = document.createElement('script');
        script.id = 'my-script'; // Assigning an ID to the script element
        script.type = 'text/javascript';
        script.innerHTML = `(function() { ${this.props.jsData} })();`;
        this.instance.appendChild(script);

    }

    render() {
        const isLoading = this.props.isMessageSent;

        return (
            <div id="container">
                <div ref={el => (this.instance = el)}></div>

                {isLoading ? (
                    <div className="loader-container">
                        <div className="spinner"></div>
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    htmlData: state.htmlData,
    cssData: state.cssData,
    jsData: state.jsData,
    isMessageSent: state.isMessageSent
});

const mapDispatchToProps = dispatch => ({
    setHTMLData: (data) => dispatch(setHTMLData(data)),
    setCSSData: (data) => dispatch(setCSSData(data)),
    setJSData: (data) => dispatch(setJSData(data)),
    MessageSent: (data) => dispatch(MessageSent(data)),
});


export default connect(mapStateToProps, mapDispatchToProps)(Preview);