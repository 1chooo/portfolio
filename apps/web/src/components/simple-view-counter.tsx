"use client"

import { useState, useEffect } from "react"

interface SimpleViewCounterProps {
  route: string
  initialCount: number
  trackView?: boolean
}

export default function SimpleViewCounter({ route, initialCount, trackView = false }: SimpleViewCounterProps) {
  const [count, setCount] = useState(initialCount)
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (trackView) {
      setStatus("loading")

      // Simple fetch to test the API
      fetch("/api/increment-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ route }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setCount((prev) => prev + 1)
            setStatus("success")
            setError(null)
          } else {
            setStatus("error")
            setError(data.error || "Unknown error")
          }
        })
        .catch((err) => {
          setStatus("error")
          setError(err.message)
        })
    }
  }, [route, trackView])

  return (
    <div className="flex items-center gap-2">
      <span className="text-neutral-600 dark:text-neutral-400">{count.toLocaleString()} views</span>

      {status === "loading" && <span className="text-blue-500 text-xs">📊</span>}

      {status === "success" && <span className="text-green-500 text-xs">✅</span>}

      {status === "error" && (
        <span className="text-red-500 text-xs" title={error || "Error"}>
          ❌
        </span>
      )}

      {error && (
        <div className="text-xs text-red-500 max-w-xs truncate" title={error}>
          {error}
        </div>
      )}
    </div>
  )
}
