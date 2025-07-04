import SimpleViewCounter from "@/components/simple-view-counter"

// Simple function to get view count
async function getViewCount(route: string): Promise<number> {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Missing environment variables")
      return 0
    }

    const { createClient } = await import("@supabase/supabase-js")
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    const { count, error } = await supabase.from("views").select("*", { count: "exact", head: true }).eq("route", route)

    if (error) {
      console.error("Error getting view count:", error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error("Failed to get view count:", error)
    return 0
  }
}

export default async function TestSimplePage() {
  const route = "/test-simple"
  const viewCount = await getViewCount(route)

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Simple View Counter Test</h1>

      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Environment Check</h2>
          <div className="space-y-2 text-sm">
            <p>NEXT_PUBLIC_SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}</p>
            <p>SUPABASE_SERVICE_ROLE_KEY: {process.env.SUPABASE_SERVICE_ROLE_KEY ? "✅ Set" : "❌ Missing"}</p>
          </div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">View Counter</h2>
          <SimpleViewCounter route={route} initialCount={viewCount} trackView={true} />
          <p className="text-sm text-gray-600 mt-2">This counter should increment each time you refresh the page.</p>
        </div>
      </div>
    </div>
  )
}
