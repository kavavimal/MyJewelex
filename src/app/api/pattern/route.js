import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const patternSchema = z.object({
  name: z.string().min(1, "pattern name required").max(50),
  description: z.string().optional(),
});

export async function POST(request) {
  try {
    const res = await request.formData();
    const name = res.get("name");
    const description = res.get("description");

    const patternData = patternSchema.parse({ name, description });

    const newPattern = await prisma.pattern.create({
      data: patternData,
    });

    return NextResponse.json(
      { message: "New product pattern created successfully", newPattern },
      { status: 201 }
    );
  } catch (error) {
    if (error === "ZodError") {
      return NextResponse.json(
        { error: "Validation error", issues: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal sever error" },
      { status: 500 }
    );
  }
}
