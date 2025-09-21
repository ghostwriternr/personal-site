# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start local development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Build and preview with Cloudflare Workers locally
- `npm run deploy` - Build and deploy to Cloudflare Pages
- `npm run format` - Format code with Prettier
- `npm run cf-typegen` - Generate Cloudflare Workers types

## Architecture Overview

This is a personal blog/portfolio built with Astro, deployed on Cloudflare Pages. The site features:

### Content Collections
- **Blog posts** (`src/content/blog/`): Technical articles with frontmatter schema requiring title, description, pubDate, and optional updatedDate
- **Poetry** (`src/content/poetry/`): Creative writing with schema requiring title, date, categories, tags, optional excerpt, and image
- Both collections use glob loaders to automatically discover Markdown/MDX files

### Key Directories
- `src/components/` - Reusable Astro components (BaseHead, Sidebar, Topbar, etc.)
- `src/layouts/` - Page layouts (BaseLayout, BlogPost, PoetryPost)
- `src/pages/` - File-based routing with dynamic [...slug] pages for content
- `src/schemas/` - Zod schemas for content validation
- `public/fonts/` - Custom fonts (Argesta, Lufga)

### Technology Stack
- **Framework**: Astro 5.x with SSG
- **Styling**: Tailwind CSS 4.x with typography plugin
- **Content**: MDX support for enhanced Markdown
- **Deployment**: Cloudflare Pages with Workers adapter
- **Type Safety**: TypeScript with content schema validation

### Content Management
Content is managed through Astro's Content Collections API. Blog posts require structured frontmatter while poetry includes rich metadata like categories, tags, and associated images. All content assets are co-located in respective subdirectories.

### Deployment
The site uses Cloudflare's edge deployment with:
- Wrangler for local preview and deployment
- View transitions for smooth navigation
- Prefetch configuration for performance
- RSS feed generation at /rss.xml