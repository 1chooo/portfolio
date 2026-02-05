-- Create the page_views table
CREATE TABLE IF NOT EXISTS page_views (
  id SERIAL PRIMARY KEY,
  page VARCHAR(255) NOT NULL UNIQUE,
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial record for profile page
INSERT INTO page_views (page, views) 
VALUES ('/blog/test-post', 0) 
ON CONFLICT (page) DO NOTHING;

-- Create an index on the page column for faster queries
CREATE INDEX IF NOT EXISTS idx_page_views_page ON page_views(page);
