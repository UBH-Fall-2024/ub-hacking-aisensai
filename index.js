import Groq from "groq-sdk";
import { key } from './key.js';
import express from "express"

const PORT = 3000;
const app = express();

const groq = new Groq({apiKey:key});

//Initial connection
app.get('/', (req, res) => {
  res.sendFile(import.meta.dirname + '/client.html');
});

app.listen(PORT, () =>{});

async function main() {
  const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: "Give me some sage wisdom",
        },
      ],
      model: "llama3-8b-8192",
    })
    .then((chatCompletion) => {
      console.log(chatCompletion.choices[0]?.message?.content || "");
    }); 
}

main();