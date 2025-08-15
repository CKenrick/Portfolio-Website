# Blog Setup Guide

This portfolio now includes a separate Next.js blog application that integrates seamlessly with the main portfolio site.

## 🏗️ Architecture

```
Portfolio-Website/
├── src/               # Main React portfolio
├── blog/              # Next.js blog application
│   ├── src/
│   │   ├── app/       # Next.js app router
│   │   ├── components/# Blog components
│   │   ├── lib/       # Blog utilities
│   │   ├── posts/     # Markdown blog posts
│   │   └── types/     # TypeScript types
│   └── out/           # Blog build output
└── build/             # Combined build output
    └── blog/          # Blog deployed here
```

## 🚀 Getting Started

### Development

1. **Start the portfolio** (from root directory):
   ```bash
   npm start
   ```

2. **Start the blog** (from root directory):
   ```bash
   npm run blog:dev
   ```
   
   Or directly from blog directory:
   ```bash
   cd blog
   npm run dev
   ```

### Building for Production

#### Build Everything Together
```bash
npm run build:with-blog
```

This command:
1. Builds the main portfolio
2. Builds the blog as a static site
3. Copies the blog to `/blog` in the portfolio build
4. Creates the combined deployment package

#### Build Separately
```bash
# Build just the portfolio
npm run build

# Build just the blog
npm run blog:build
```

## 📝 Writing Blog Posts

### Creating a New Post

1. Create a new `.md` file in `blog/src/posts/`
2. Add frontmatter metadata:

```markdown
---
title: "Your Post Title"
description: "Brief description for SEO and excerpts"
date: "2024-01-15"
tags: ["React", "TypeScript", "Web Development"]
author: "Chris Kenrick"
readTime: "5 min read"
---

# Your Post Content

Write your markdown content here...
```

### Post Metadata Fields

- **title**: Post title (required)
- **description**: SEO description and excerpt (required)
- **date**: Publication date in YYYY-MM-DD format (required)
- **tags**: Array of tags for categorization (required)
- **author**: Author name (required)
- **readTime**: Estimated reading time (optional, auto-calculated if not provided)

### Markdown Features

The blog supports:
- ✅ Standard Markdown syntax
- ✅ Syntax highlighting for code blocks
- ✅ Automatic table of contents
- ✅ Responsive images
- ✅ SEO optimization

## 🎨 Styling

The blog inherits the same design system as the portfolio:
- Tailwind CSS for styling
- Dark/light mode support
- Consistent color scheme and typography
- Responsive design

## 🔧 Configuration

### Next.js Configuration

The blog is configured for static export in `blog/next.config.ts`:
- Static export enabled
- Base path set to `/blog`
- Images optimized for static hosting

### Navigation

The blog navigation is automatically added to the portfolio header. Users can:
- Navigate from portfolio to blog
- Navigate back to portfolio from blog
- Browse posts by tags
- Search functionality (can be added later)

## 📦 Deployment

### Option 1: Combined Deployment (Recommended)

1. Run the combined build:
   ```bash
   npm run build:with-blog
   ```

2. Deploy the entire `build/` directory to your hosting provider
3. The blog will be accessible at `https://yourdomain.com/blog`

### Option 2: Separate Deployments

1. Deploy portfolio and blog to different hosts
2. Update navigation links in both applications
3. Consider SEO implications of separate domains

## 🌟 Features

### Current Features
- ✅ Markdown blog posts with frontmatter
- ✅ Syntax highlighting
- ✅ Tag-based categorization
- ✅ Responsive design
- ✅ SEO optimization
- ✅ Fast static generation

### Potential Enhancements
- 🔄 RSS feed generation
- 🔄 Full-text search
- 🔄 Comment system integration
- 🔄 Social sharing buttons
- 🔄 Reading progress indicator
- 🔄 Related posts suggestions

## 🚨 Important Notes

1. **Static Generation**: The blog uses Next.js static generation for optimal performance
2. **Build Order**: Always build the portfolio first, then the blog for combined deployments
3. **Asset Paths**: Blog assets are properly configured for the `/blog` base path
4. **SEO**: Each blog post generates its own meta tags and OpenGraph data

## 🤝 Contributing

To add new blog posts:
1. Create markdown files in `blog/src/posts/`
2. Follow the frontmatter format
3. Test locally with `npm run blog:dev`
4. Build and deploy with `npm run build:with-blog`

## 📞 Support

For issues or questions about the blog setup, check:
1. Next.js documentation for app router
2. Tailwind CSS documentation for styling
3. Markdown syntax guides for content formatting

---

The blog is now ready to use! Start by creating your first post in `blog/src/posts/` and running the development server to see it in action.