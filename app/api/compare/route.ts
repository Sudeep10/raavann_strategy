import { NextResponse } from "next/server";
import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";

import { z } from "zod";

export const RowScheme = z.object({
	companyA: z.string(),
	companyB: z.string(),
});

export const RowsSchema = z.object({
	rows: z.array(RowScheme).max(5),
});

export type RowType = z.infer<typeof RowScheme>;
export type RowsType = z.infer<typeof RowsSchema>;

const client = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
	const { prompt } = await req.json();

	const response = await client.responses.parse({
		model: "gpt-5.1",
		reasoning: null,
		input: `
      ${prompt}
    `,
		text: {
			format: zodTextFormat(RowsSchema, "rows"),
		},
	});

	return NextResponse.json(response.output_parsed);
}
