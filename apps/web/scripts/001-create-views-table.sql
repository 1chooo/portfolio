-- Create views table for tracking blog post views
CREATE TABLE IF NOT EXISTS views (
  id BIGSERIAL PRIMARY KEY,
  route TEXT NOT NULL,
  email TEXT,
  country TEXT,
  city TEXT,
  region TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_views_route ON views(route);
CREATE INDEX IF NOT EXISTS idx_views_created_at ON views(created_at);

-- Enable Row Level Security
ALTER TABLE views ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (adjust based on your needs)
CREATE POLICY "Allow all operations on views" ON views
  FOR ALL USING (true);

-- Insert a test record to verify everything works
INSERT INTO views (route, email) VALUES ('/test', 'test@example.com');

-- Check if the table was created successfully
SELECT * FROM views WHERE route = '/test';
