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

  useEffect(() => {
    if (trackView) {
      startTransition(async () => {
        try {
          await incrementViewCount(route, email)
          // Optionally update the count locally
          setCount((prev) => prev + 1)
        } catch (error) {
          console.error("Failed to track view:", error)
        }
      })
    }
  }, [route, trackView, email])

  return (
    <p className="text-neutral-600 dark:text-neutral-400">
      {count.toLocaleString("en-US")} views
      {isPending && <span className="ml-1 opacity-50">...</span>}
    </p>
  )
}
