import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import dotenv from 'dotenv';

dotenv.config();

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const output = await replicate.run(
      "meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3",
      {
        input: {
          prompt: prompt,
          max_new_tokens: 500,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1
        }
      }
    );

    return NextResponse.json({ result: output });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to generate response' },
      { status: 500 }
    );
  }
}