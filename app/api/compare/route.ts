import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import { z } from "zod";

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
	const { prompt, num } = await req.json();

	const dynamicCompanies: Record<string, z.ZodString> = {};

	for (let i = 1; i <= num; i++) {
		dynamicCompanies[`company${i}`] = z.string();
	}

	const RowSchema = z.object(dynamicCompanies);

	const RowsSchema = z.object({
		rows: z.array(RowSchema).max(5),
	});

	const response = await client.responses.parse({
		model: "gpt-5.1",
		reasoning: null,
		input: [
			{
				role: "system",
				content: `
			Compare the given companies **strictly and only** using the data points provided below.
			Do NOT use any external knowledge, assumptions, or information that is not explicitly included in the data points.

			Your comparison MUST:
			- rely exclusively on the above data points
			- ignore anything not provided
			- avoid adding facts, market knowledge, or invented details
			- make comparisons only where both sides have relevant data
			`,
			},
			{
				role: "user",
				content: prompt,
			},
		],
		text: {
			format: zodTextFormat(RowsSchema, "rows"),
		},
	});

	return NextResponse.json(response.output_parsed);
}
