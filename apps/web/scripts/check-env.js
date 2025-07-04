// Check environment variables
console.log("🔍 Checking environment variables...")

const requiredVars = ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY", "SUPABASE_SERVICE_ROLE_KEY"]

let allGood = true

requiredVars.forEach((varName) => {
  const value = process.env[varName]
  if (value) {
    console.log(`✅ ${varName}: ${value.substring(0, 20)}...`)
  } else {
    console.log(`❌ ${varName}: Missing`)
    allGood = false
  }
})

if (allGood) {
  console.log("\n🎉 All required environment variables are set!")
} else {
  console.log("\n❌ Some environment variables are missing. Please check your .env file.")
}

// Test Supabase connection
import { createClient } from "@supabase/supabase-js"

if (allGood) {
  console.log("\n🔍 Testing Supabase connection...")

  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

  try {
    const { data, error } = await supabase.from("views").select("count", { count: "exact", head: true })

    if (error) {
      if (error.code === "42P01") {
        console.log("⚠️  Views table doesn't exist yet. Please create it first.")
      } else {
        console.log("❌ Supabase connection error:", error.message)
      }
    } else {
      console.log("✅ Supabase connection successful!")
      console.log("Current views count:", data)
    }
  } catch (err) {
    console.log("❌ Connection test failed:", err.message)
  }
}
