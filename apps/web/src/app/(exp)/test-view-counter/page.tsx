import ViewCounter from "@/components/view-counter"
import { getViewCount } from "@/lib/actions"
import { Suspense } from "react"

async function ViewCounterWrapper() {
  const route = "/test-view-counter"

  try {
    const viewCount = await getViewCount(route)

    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">View Counter Test</h2>
        <ViewCounter route={route} initialCount={viewCount} trackView={true} />
        <p className="text-sm text-gray-600">This page will increment the view count each time you visit it.</p>
      </div>
    )
  } catch (error) {
    console.error("Error in ViewCounterWrapper:", error)
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">View Counter Test</h2>
        <p className="text-red-500">
          Error loading view counter: {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    )
  }
}

export default function TestViewCounterPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">View Counter Test Page</h1>

      <div className="space-y-8">
        <Suspense fallback={<div>Loading view counter...</div>}>
          <ViewCounterWrapper />
        </Suspense>

        <div className="border-t pt-8">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          <div className="bg-gray-100 p-4 rounded-lg space-y-2 text-sm">
            <p>
              <strong>Supabase URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}
            </p>
            <p>
              <strong>Anon Key:</strong> {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing"}
            </p>
            <p>
              <strong>Route:</strong> /test-view-counter
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
