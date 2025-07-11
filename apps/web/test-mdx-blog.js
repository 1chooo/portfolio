#!/usr/bin/env node

const { getMdxBlogPosts, getMdxPostSlugs, getMdxBlogCategories } = require('../src/lib/api/mdx-blog.ts');

console.log('Testing MDX Blog API...\n');

try {
  // Test getting post slugs
  const slugs = getMdxPostSlugs();
  console.log('📝 Post slugs:', slugs);
  console.log(`   Found ${slugs.length} posts\n`);

  // Test getting all posts
  const posts = getMdxBlogPosts();
  console.log('📚 All posts:');
  posts.forEach(post => {
    console.log(`   - ${post.title} (${post.category})`);
  });
  console.log(`   Total: ${posts.length} posts\n`);

  // Test getting categories
  const categories = getMdxBlogCategories();
  console.log('🏷️  Categories:', categories);
  console.log(`   Total categories: ${Object.keys(categories).length}\n`);

  console.log('✅ MDX Blog API tests passed!');
} catch (error) {
  console.error('❌ Test failed:', error.message);
}
