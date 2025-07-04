import { createClient } from "@supabase/supabase-js"

// 使用你的環境變數
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
  try {
    console.log("Testing Supabase connection...")

    // 測試基本連接
    const { data, error } = await supabase.from("views").select("count", { count: "exact", head: true })

    if (error) {
      console.error("Error:", error.message)
      if (error.code === "42P01") {
        console.log("❌ Views table doesn't exist. Please run the SQL script in Supabase Dashboard first.")
      }
    } else {
      console.log("✅ Connection successful!")
      console.log("Current views count:", data)

      // 測試插入一條記錄
      const { data: insertData, error: insertError } = await supabase
        .from("views")
        .insert({ route: "/test-connection" })
        .select()

      if (insertError) {
        console.error("Insert error:", insertError.message)
      } else {
        console.log("✅ Test insert successful:", insertData)

        // 清理測試記錄
        await supabase.from("views").delete().eq("route", "/test-connection")
        console.log("✅ Test record cleaned up")
      }
    }
  } catch (error) {
    console.error("Connection test failed:", error.message)
  }
}

testConnection()
