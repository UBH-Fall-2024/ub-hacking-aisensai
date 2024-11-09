import Groq from "groq-sdk";
import { key } from './key.js';
import express from "express"
import path from 'path'

const PORT = 3000;
const app = express();

const groq = new Groq({apiKey:key});

app.use("/css",express.static("./node_modules/bootstrap/dist/css"));
app.use("/js",express.static("./node_modules/bootstrap/dist/js"));

app.use(express.static(path.join(import.meta.dirname, 'css')));

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
