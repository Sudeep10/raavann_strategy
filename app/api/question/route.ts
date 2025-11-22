import fs from "fs";
import path from "path";
import { zodTextFormat } from "openai/helpers/zod";
import { NextResponse } from "next/server";
import OpenAI from "openai";

import { z } from "zod";

const BASE_DIR = path.resolve(process.cwd(), "companies_transcript");

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
	const { company, question } = await req.json();

	const requestedPath = path.resolve(BASE_DIR, `${company}.txt`);

	if (!requestedPath.startsWith(BASE_DIR + path.sep)) {
		return new Response("Invalid file path", { status: 400 });
	}

	if (!fs.existsSync(requestedPath)) {
		return new Response("File not found", { status: 404 });
	}

	const content = fs.readFileSync(requestedPath, "utf8");

	const answersSchema = z.object({
		answers: z.array(z.string()).max(5),
	});

	const response = await client.responses.parse({
		model: "gpt-5.1",
		reasoning: null,
		input: `
      Based on the following transcript of a company's information, answer the question below. Give no more than five brief answers, ensuring each one flows logically from the answer before it.. All answers should be based solely on the provided transcript. The answers must be highly detailed and not generic at all and tone must sound interesting while making sure it's easy to understand and read. If can't find the answer in the transcript, respond with "Answer not found"

      Question:
      ${question}

      Transcript:
      ${content}
	    `,
		text: {
			format: zodTextFormat(answersSchema, "rows"),
		},
	});

	return NextResponse.json(response.output_parsed);
}
