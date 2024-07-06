import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a deranged killer.  what are you thinking?" }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();