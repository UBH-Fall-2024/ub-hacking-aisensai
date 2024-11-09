import Groq from "groq-sdk";
import { key } from './key.js';

const groq = new Groq({apiKey:key});

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