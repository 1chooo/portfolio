import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function setupDatabase() {
  console.log("Setting up database...")

  try {
    // Create views table
    const { error: tableError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS views (
          id BIGSERIAL PRIMARY KEY,
          route TEXT NOT NULL,
          email TEXT,
          country TEXT,
          city TEXT,
          region TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `,
    })

    if (tableError) {
      console.error("Error creating table:", tableError)
      return
    }

    // Create indexes
    const { error: indexError } = await supabase.rpc("exec_sql", {
      sql: `
        CREATE INDEX IF NOT EXISTS idx_views_route ON views(route);
        CREATE INDEX IF NOT EXISTS idx_views_created_at ON views(created_at);
      `,
    })

    if (indexError) {
      console.error("Error creating indexes:", indexError)
      return
    }

    // Enable RLS
    const { error: rlsError } = await supabase.rpc("exec_sql", {
      sql: `
        ALTER TABLE views ENABLE ROW LEVEL SECURITY;
        CREATE POLICY IF NOT EXISTS "Allow all operations on views" ON views
          FOR ALL USING (true);
      `,
    })

    if (rlsError) {
      console.error("Error setting up RLS:", rlsError)
      return
    }

    console.log("Database setup completed successfully!")

    // Test the setup by inserting a test record
    const { data, error: insertError } = await supabase
      .from("views")
      .insert({ route: "/test", email: "test@example.com" })
      .select()

    if (insertError) {
      console.error("Error testing insert:", insertError)
    } else {
      console.log("Test insert successful:", data)

      // Clean up test record
      await supabase.from("views").delete().eq("route", "/test")
      console.log("Test record cleaned up")
    }
  } catch (error) {
    console.error("Setup failed:", error)
  }
}

setupDatabase()
