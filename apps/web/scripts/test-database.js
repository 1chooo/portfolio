import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

console.log("Environment check:")
console.log("NEXT_PUBLIC_SUPABASE_URL:", supabaseUrl ? "✅ Set" : "❌ Missing")
console.log("SUPABASE_SERVICE_ROLE_KEY:", supabaseServiceKey ? "✅ Set" : "❌ Missing")

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing required environment variables")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function testDatabase() {
  try {
    console.log("\n🔍 Testing database connection...")

    // Test 1: Check if views table exists
    console.log("1. Checking if views table exists...")
    const { data: tables, error: tablesError } = await supabase
      .from("views")
      .select("count", { count: "exact", head: true })

    if (tablesError) {
      if (tablesError.code === "42P01") {
        console.log("❌ Views table does not exist!")
        console.log("Please run this SQL in your Supabase Dashboard:")
        console.log(`
CREATE TABLE IF NOT EXISTS views (
  id BIGSERIAL PRIMARY KEY,
  route TEXT NOT NULL,
  email TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_views_route ON views(route);
CREATE INDEX IF NOT EXISTS idx_views_created_at ON views(created_at);

ALTER TABLE views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow all operations on views" ON views FOR ALL USING (true);
        `)
        return
      } else {
        throw tablesError
      }
    }

    console.log("✅ Views table exists")

    // Test 2: Insert a test record
    console.log("2. Testing insert operation...")
    const { data: insertData, error: insertError } = await supabase
      .from("views")
      .insert({ route: "/test-database", email: "test@example.com" })
      .select()

    if (insertError) {
      throw insertError
    }

    console.log("✅ Insert successful:", insertData)

    // Test 3: Query the record
    console.log("3. Testing query operation...")
    const { count, error: countError } = await supabase
      .from("views")
      .select("*", { count: "exact", head: true })
      .eq("route", "/test-database")

    if (countError) {
      throw countError
    }

    console.log("✅ Query successful, count:", count)

    // Test 4: Clean up
    console.log("4. Cleaning up test data...")
    const { error: deleteError } = await supabase.from("views").delete().eq("route", "/test-database")

    if (deleteError) {
      throw deleteError
    }

    console.log("✅ Cleanup successful")
    console.log("\n🎉 All tests passed! Your Supabase setup is working correctly.")
  } catch (error) {
    console.error("\n❌ Database test failed:", error)
    console.error("Error details:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    })
  }
}

testDatabase()
