import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log("Supabase URL:", supabaseUrl)
console.log("Service Key exists:", !!supabaseServiceKey)

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testConnection() {
  try {
    // Test basic connection
    const { data, error } = await supabase.from("views").select("count", { count: "exact", head: true })

    if (error && error.code === "42P01") {
      console.log("Views table does not exist yet - this is expected")
      console.log("Please run the SQL script in Supabase Dashboard first")
    } else if (error) {
      console.error("Connection error:", error)
    } else {
      console.log("Connection successful! Current view count:", data)
    }
  } catch (error) {
    console.error("Test failed:", error)
  }
}

testConnection()
