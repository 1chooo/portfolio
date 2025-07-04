"use server"

import { createServerClient } from "@/lib/supabase/server"
import { headers } from "next/headers"
import { revalidatePath } from "next/cache"

interface GeoData {
  country?: string
  city?: string
  region?: string
}

async function getGeoData(ip: string | null): Promise<GeoData> {
  if (!ip) return {}

  try {
    // You can integrate with a geo IP service here
    // For now, returning empty object
    return {}
  } catch (error) {
    console.error("Failed to get geo data:", error)
    return {}
  }
}

export async function incrementViewCount(route: string, email?: string) {
  try {
    console.log("Incrementing view count for route:", route)

    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Missing Supabase environment variables")
    }

    const supabase = createServerClient()
    const headersList = await headers()
    const ip = headersList.get("x-forwarded-for") || headersList.get("x-real-ip")

    console.log("Getting geo data for IP:", ip)
    const geoData = await getGeoData(ip)

    console.log("Inserting view record...")
    const { data, error } = await supabase
      .from("views")
      .insert({
        route,
        email: email || null,
        ...geoData,
      })
      .select()

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Database error: ${error.message}`)
    }

    console.log("View count incremented successfully:", data)

    // Revalidate the page to show updated count
    revalidatePath(route)

    return { success: true, data }
  } catch (error) {
    console.error("Failed to increment view count:", error)
    // Don't throw the error, just log it and return a failure response
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}

export async function getViewCount(route: string): Promise<number> {
  try {
    console.log("Getting view count for route:", route)

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing Supabase environment variables")
      return 0
    }

    const supabase = createServerClient()

    const { count, error } = await supabase.from("views").select("*", { count: "exact", head: true }).eq("route", route)

    if (error) {
      console.error("Error getting view count:", error)
      return 0
    }

    console.log("View count for", route, ":", count)
    return count || 0
  } catch (error) {
    console.error("Failed to get view count:", error)
    return 0
  }
}

export async function getTotalViews(): Promise<number> {
  try {
    const supabase = createServerClient()

    const { count, error } = await supabase.from("views").select("*", { count: "exact", head: true })

    if (error) {
      console.error("Error getting total views:", error)
      return 0
    }

    return count || 0
  } catch (error) {
    console.error("Failed to get total views:", error)
    return 0
  }
}

export async function getPopularPosts(limit = 10) {
  try {
    const supabase = createServerClient()

    const { data, error } = await supabase
      .from("views")
      .select("route")
      .not("route", "is", null)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error getting popular posts:", error)
      return []
    }

    // Count views per route
    const routeCounts = data.reduce((acc: Record<string, number>, view) => {
      acc[view.route] = (acc[view.route] || 0) + 1
      return acc
    }, {})

    // Sort by count and return top posts
    return Object.entries(routeCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([route, count]) => ({ route, count }))
  } catch (error) {
    console.error("Failed to get popular posts:", error)
    return []
  }
}
