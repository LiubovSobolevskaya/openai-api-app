import { Configuration, OpenAIApi } from "openai";
import { getHtmlDb, getCssDb, getJavaScriptDb } from './database';
import axios from 'axios';

async function generate(req, res) {

    const prompt = await generatePrompt(req);
    const params = {
        model: 'gpt-3.5-turbo',
        max_tokens: 2000,
        temperature: 1,
        messages: [{ role: 'user', content: prompt }],
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
    };
    try {
        const response = await axios.post("https://api.openai.com/v1/chat/completions", JSON.stringify(params), { headers });
        return response.data.choices[0].message.content;
    } catch (err) {
        console.log(err);
    }
}

async function generatePrompt(text) {

    const valueJavaScript = await getJavaScriptDb();
    const valueHtml = await getHtmlDb();
    const valueCss = await getCssDb();
    let prompt = '';
    if (valueCss.trim().length) {
        prompt += `css: ${valueCss} \n`;
    }
    if (valueHtml.trim().length) {
        prompt += `html: ${valueHtml} \n`;
    }
    if (valueJavaScript.trim().length) {
        prompt += `javascript: ${valueJavaScript} \n`;
    }
    return `${prompt} \n ${text}. \n Every piece of code wrap into  ~~~ and add the type of file it should be added to. 
    Always include code that is not being changed. 
    NEVER add <!DOCTYPE html> <html>,<head>, and <body> to the html. 
    Only add what goes inside the body! NEVER put <style> and <script> inside html file. NEVER add <!DOCTYPE html> <html>,<head>, and <body> to the html.
    Always separate html, css and js files. 
    Never keep them in the same place! NEVER add <!DOCTYPE html> <html>,<head>, and <body> to the html 
    
    here is the example of the responce: Sure. here is the result.
    ~~~
    css
    h1 {
        font-size: 40px;
        margin-top: 50px;
    }
    ~~~
    ~~~
    javascript
    document.getElementById("clickButton").addEventListener("click", function() {
        let randomColor = getRandomColor();
        document.querySelector("h1").style.color = randomColor;
    });
    
    function getRandomColor() {
      ...
        return color;
    }
    ~~~
    ~~~
    html
    <h1>My Title</h1>
    <button>Button</button>
    ~~~
    DO NOT ADD <!DOCTYPE html>
    <html>
    <head>
     ///
    </head>
    <body>
    `;

}


export default generate;