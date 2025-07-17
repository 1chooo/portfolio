import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";
import {
  ViewRequestSchema,
  ViewResponseSchema,
  ErrorResponseSchema,
} from "@/lib/schemas/page-views";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();

    const validatedBody = ViewRequestSchema.parse(rawBody);
    const { slug } = validatedBody;

    const isProduction = process.env.NODE_ENV === "production";

    if (!isProduction) {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("page_views")
        .select("views")
        .eq("page", `project/${slug}`)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      const response = ViewResponseSchema.parse({ views: data?.views || 0 });
      return NextResponse.json(response);
    }

    const supabase = createClient();

    const { data: currentData, error: fetchError } = await supabase
      .from("page_views")
      .select("views")
      .eq("page", `project/${slug}`)
      .single();

    if (fetchError && fetchError.code !== "PGRST116") {
      throw fetchError;
    }

    let newViews = 1;

    if (currentData) {
      // Update existing record
      newViews = currentData.views + 1;
      const { error: updateError } = await supabase
        .from("page_views")
        .update({ views: newViews, updated_at: new Date().toISOString() })
        .eq("page", `project/${slug}`);

      if (updateError) throw updateError;
    } else {
      // Insert new record
      const { error: insertError } = await supabase.from("page_views").insert({
        page: `project/${slug}`,
        views: 1,
      });

      if (insertError) throw insertError;
    }

    const response = ViewResponseSchema.parse({ views: newViews });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error updating views:", error);

    // Handle Zod validation errors
    if (error && typeof error === "object" && "issues" in error) {
      const zodError = error as z.ZodError;
      const errorResponse = ErrorResponseSchema.parse({
        error: `Validation error: ${zodError.issues.map((issue) => issue.message).join(", ")}`,
      });
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const errorResponse = ErrorResponseSchema.parse({
      error: "Failed to update views",
    });
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    const validatedParams = ViewRequestSchema.parse({ slug });

    const supabase = createClient();

    const { data, error } = await supabase
      .from("page_views")
      .select("views")
      .eq("page", `project/${validatedParams.slug}`)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    const response = ViewResponseSchema.parse({ views: data?.views || 0 });
    return NextResponse.json(response);
  } catch (error) {
    console.error("Error fetching views:", error);

    // Handle Zod validation errors
    if (error && typeof error === "object" && "issues" in error) {
      const zodError = error as z.ZodError;
      const errorResponse = ErrorResponseSchema.parse({
        error: `Validation error: ${zodError.issues.map((issue) => issue.message).join(", ")}`,
      });
      return NextResponse.json(errorResponse, { status: 400 });
    }

    const errorResponse = ErrorResponseSchema.parse({
      error: "Failed to fetch views",
    });
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
