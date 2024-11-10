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


app.get('/client', async(req, res) => {
  const groqMessage = await getGroq();
  res.send(groqMessage.choices[0]?.message?.content.split("\n").filter(i => i.match(/\d/)) || "");
});

//starts listening on specified port
app.listen(PORT, () =>{});

async function getGroq() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  //console.log(chatCompletion.choices[0]?.message?.content || "");
  return chatCompletion;
}

async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Give me some sage wisdom that are NOT quotes, in a numbered list",
      },
    ],
    model: "llama3-8b-8192",
  });
}
