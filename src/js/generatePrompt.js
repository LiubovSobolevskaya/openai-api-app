import { Configuration, OpenAIApi } from "openai";
import { getHtmlDb, getCssDb, getJavaScriptDb } from './database';
import axios from 'axios';
const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});


async function generate(req, res) {

    const prompt = await generatePrompt(req);
    const params = {
        model: 'gpt-3.5-turbo',
        max_tokens: 1000,
        temperature: 0.9,
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

    if (!text.includes('Hello') && !text.includes('hello')) {
        const valueJavaScript = await getJavaScriptDb();
        const valueHtml = await getHtmlDb();
        const valueCss = await getCssDb();
        let prompt = `Given this `;
        if (valueCss.trim().length) {
            prompt += `css: ${valueCss} \n`;
        }
        if (valueHtml.trim().length) {
            prompt += `html: ${valueHtml} \n`;
        }
        if (valueJavaScript.trim().length) {
            prompt += `javascript: ${valueJavaScript} \n`;
        }
        return `${prompt} \n ${text}`;
    }
    else return text;
}


export default generate;