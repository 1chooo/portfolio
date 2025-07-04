import { createClient } from "@supabase/supabase-js"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    console.log("API: Increment view called")

    // Check environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log("API: Environment check", {
      hasUrl: !!supabaseUrl,
      hasServiceKey: !!supabaseServiceKey,
    })

    if (!supabaseUrl || !supabaseServiceKey) {
      return NextResponse.json({ success: false, error: "Missing Supabase environment variables" }, { status: 500 })
    }

    const { route } = await request.json()

    if (!route) {
      return NextResponse.json({ success: false, error: "Route is required" }, { status: 400 })
    }

    console.log("API: Creating Supabase client")
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    console.log("API: Inserting view record for route:", route)
    const { data, error } = await supabase.from("views").insert({ route }).select()

    if (error) {
      console.error("API: Supabase error:", error)
      return NextResponse.json({ success: false, error: `Database error: ${error.message}` }, { status: 500 })
    }

    console.log("API: View recorded successfully:", data)
    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error("API: Unexpected error:", error)
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}
