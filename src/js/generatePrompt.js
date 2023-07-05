import { Configuration, OpenAIApi } from "openai";
import { getHtmlDb, getCssDb, getJavaScriptDb } from './database';
import axios from 'axios';

var returnFormat = `Return code in the following format
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Sample Page</title>
    
    <style>
       
    </style>
</head>

<body>
   
    <script>
      
    </script>
</body>

</html>`


async function generate(req, res) {

    const prompt = await generatePrompt(req);
    const params = {
        model: 'gpt-3.5-turbo',
        max_tokens: 1000,
        temperature: 0.99,
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
    if (!valueHtml.trim().length && !valueCss.trim().length && !valueJavaScript.trim().length) {
        return `$Given an empty web page: {text}. ${returnFormat}. Do not create elements dynamically using javascript. Add them to html part!. Avoid using onClick() events. Use event listeners  instead!`;
    }

    let prompt = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My Sample Page</title>`


    if (valueCss.trim().length) {
        prompt += `<style> ${valueCss} \n  </style>\n`;
    }

    prompt += `</head>`;
    prompt += `<body>   
    <div id="container">
    <div>`
    if (valueHtml.trim().length) {
        prompt += `${valueHtml} \n`;
    }
    prompt += `</div> 
               </div>`
    if (valueJavaScript.trim().length) {
        prompt += ` <script> ${valueJavaScript} \n </script>`;
    }
    prompt += `</body>`
    prompt += `</html>
    `
    console.log(prompt);
    return `${prompt} \n ${text}.${returnFormat}. Do not create or update elements dynamically using javascript. Add or change them them to html part! Do not use Onclick events. Use events listeners instead!`;

}


export default generate;