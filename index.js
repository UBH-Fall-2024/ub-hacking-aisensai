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


app.get('/client', (req, res) => {
 //res.send("responding");

 //sends json file to client when a fetch request is sent to /client
 res.sendFile(import.meta.dirname + '/test.json');
 
 //runs function to request data from groq
 main();

});

//starts listening on specified port
app.listen(PORT, () =>{});


//asks groq prompt
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

//main();