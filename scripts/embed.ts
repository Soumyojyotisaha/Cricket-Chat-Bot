import { PGEssay, PGJSON } from "@/types";
import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import OpenAI from 'openai';

loadEnvConfig("");

const generateEmbeddings = async (essays: PGEssay[]) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  if (!essays || !Array.isArray(essays)) {
    console.error("Invalid essays data. Please check the structure of your JSON file.");
    return;
  }

  for (let i = 0; i < essays.length; i++) {
    const essay = essays[i];

    const { url, title, description, paragraphs } = essay;

    for (let j = 0; j < paragraphs.length; j++) {
      const content = paragraphs[j];

      const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-ada-002",
        input: content
      });

      const [{ embedding }] = embeddingResponse.data;
      const { data, error } = await supabase
        .from('crickbuzz_pg')
        .insert([
          {
            essay_title: title,
            essay_url: url,
            essay_description: description,
            essay_paragraph: paragraphs,
            content_tokens: content.split(' ').length,
            embedding,
          }
        ])
        .select("*");

      if (error) {
        console.error(`Error saving data for essay ${i}, paragraph ${j}:`, error.message);
      } else {
        console.log(`Saved data for essay ${i}, paragraph ${j}`);
      }

      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  }
};

(async () => {
  try {
    const json: PGJSON = JSON.parse(fs.readFileSync('scripts/pg.json', 'utf8'));
    await generateEmbeddings(json.essays);
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error.message);
  }
})();
