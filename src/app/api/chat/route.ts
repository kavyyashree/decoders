import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY!,
    });

    const campusContext = `You are an AI assistant for Siddaganga Institute of Technology (SITE).
You help with:
- Room availability
- Timetables
- Events
- Canteen info
- Issue reporting
- Study materials
Reply friendly and useful.`;

    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",   // WORKING FREE MODEL
      messages: [
        { role: "system", content: campusContext },
        { role: "user", content: message },
      ],
      max_tokens: 300
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "I could not process your request.";

    return NextResponse.json({ response: reply });

  } catch (error) {
    console.error("Chat API Error:", error);

    return NextResponse.json({
      response:
        "Something went wrong. Try again, I'm here to help!",
    });
  }
}
