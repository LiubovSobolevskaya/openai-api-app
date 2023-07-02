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
    
    <!-- Internal CSS for styling -->
    <style>
       
    </style>
</head>

<body>
   
    <!-- Internal JavaScript -->
    <script>
      
    </script>
</body>

</html>`
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
    if (!valueHtml.trim().length && !valueCss.trim().length && !valueJavaScript.trim().length) {
        return `${text}. ${returnFormat}`;
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
    <div id="container" style={{ position: 'relative' }}>
    <div> `
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

    return `${prompt} \n ${text}. ${returnFormat}`;

}


export default generate;