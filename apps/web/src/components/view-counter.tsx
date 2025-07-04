"use client"

import { incrementViewCount } from "@/lib/actions"
import { useEffect, useState, useTransition } from "react"

interface ViewCounterProps {
  route: string
  initialCount: number
  trackView?: boolean
  email?: string
}

export default function ViewCounter({ route, initialCount, trackView = false, email }: ViewCounterProps) {
  const [count, setCount] = useState(initialCount)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (trackView) {
      startTransition(async () => {
        try {
          console.log("Tracking view for route:", route)
          const result = await incrementViewCount(route, email)

          if (result.success) {
            // Optionally update the count locally
            setCount((prev) => prev + 1)
            setError(null)
          } else {
            console.error("Failed to track view:", result.error)
            setError(result.error || "Failed to track view")
          }
        } catch (error) {
          console.error("Failed to track view:", error)
          setError(error instanceof Error ? error.message : "Failed to track view")
        }
      })
    }
  }, [route, trackView, email])

  return (
    <div className="flex items-center gap-2">
      <p className="text-neutral-600 dark:text-neutral-400">
        {count.toLocaleString("en-US")} views
        {isPending && <span className="ml-1 opacity-50">...</span>}
      </p>
      {error && (
        <span className="text-red-500 text-xs" title={error}>
          ⚠️
        </span>
      )}
    </div>
  )
}
