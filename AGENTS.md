# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Development Commands

- `npm run dev` - Start local development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Build and preview with Cloudflare Workers locally
- `npm run deploy` - Build and deploy to Cloudflare Pages
- `npm run format` - Format code with Prettier
- `npm run cf-typegen` - Generate Cloudflare Workers types
- `npm run compress-images` - Manually compress all images in src/content/

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

- **Framework**: Astro 5.x with SSR (`output: "server"`)
- **Styling**: Tailwind CSS 4.x with typography plugin
- **Content**: MDX support for enhanced Markdown
- **Deployment**: Cloudflare Pages with Workers adapter
- **Type Safety**: TypeScript with content schema validation

### Content Management

Content is managed through Astro's Content Collections API. Blog posts require structured frontmatter while poetry includes rich metadata like categories, tags, and associated images. All content assets are co-located in respective subdirectories.

### Single Source of Truth (`src/content/site.ts`)

Site-wide content is centralized in `src/content/site.ts` to avoid duplication:

- **`site`**: Title, description, URL
- **`bio`**: Short bio (homepage), extended bio (about page), work summary (LLMs)
- **`socialLinks`**: All social media links with icons
- **`workExperience`**: Job history with roles, companies, periods, descriptions
- **`notFound`**: 404 page content (title, subtitle, poem)

This data is used by both HTML pages and LLM-friendly markdown endpoints. To update bio, work history, or social links, edit this single file.

### Content Formatters (`src/lib/content-formatters.ts`)

Helper functions that convert site data to markdown for LLM responses:

- `generateLlmsTxt()` - Site overview for `/llms.txt`
- `generateAboutMarkdown()` - About page content
- `generatePostsIndexMarkdown()` - Blog index
- `generatePoetryIndexMarkdown()` - Poetry index
- `generate404Markdown()` - 404 page

### Design System

The site uses a consistent design system with:

- **Typography Scale**: Semantic classes (`text-display-*`, `text-heading-*`, `text-body-*`, `text-caption-*`) using Major Third ratio for harmonious proportions
- **Dark Mode**: Three-mode theme toggle (Light/Dark/Auto) with system preference detection and localStorage persistence
- **Animations**: Consistent animation system with 300ms transitions for interactions, 500ms fade-in animations for content, and 250ms theme transitions

### Deployment

The site uses Cloudflare's edge deployment with:

- Wrangler for local preview and deployment
- View transitions for smooth navigation
- Prefetch configuration for performance
- RSS feed generation at /rss.xml

### LLM-Friendly Content Negotiation

The site supports content negotiation via the `Accept` header for LLM access (`src/middleware.ts`):

**How it works:**

- Requests with `Accept: text/markdown` or `Accept: text/plain` (preferred over `text/html`) receive markdown
- Browser requests (preferring `text/html`) receive normal HTML pages

**Supported routes:**

| Route             | Markdown Response                  |
| ----------------- | ---------------------------------- |
| `/`               | Site overview (llms.txt)           |
| `/about`          | Bio + work experience              |
| `/posts/`         | Blog post index                    |
| `/posts/[slug]/`  | Raw post markdown with frontmatter |
| `/poetry/`        | Poetry index                       |
| `/poetry/[slug]/` | Raw poem markdown with frontmatter |
| `/llms.txt`       | Direct llms.txt endpoint           |
| Any invalid route | 404 with poetic message            |

**Testing:**

```bash
# Get markdown from any route
curl -H "Accept: text/markdown" https://ghostwriternr.me/
curl -H "Accept: text/markdown" https://ghostwriternr.me/posts/grpc/

# Direct llms.txt endpoint
curl https://ghostwriternr.me/llms.txt
```

### Image Optimization

The site implements aggressive image optimization for web performance:

**Automatic Compression:**

- **Husky + lint-staged**: Automatically compresses new/modified images when committing
- **Target**: <100KB final WebP size after Astro's optimization
- **Dependencies**: ImageMagick, pngquant, jpegoptim

**Compression Standards:**

- **JPEGs**: Quality 50, max 1000px width, progressive encoding
- **PNGs**: Quality 40-60 with pngquant, max 1000px width
- **Output**: Astro converts to optimized WebP during build

**Manual Commands:**

- `npm run compress-images` - Compress all images in src/content/
- `scripts/compress-images.sh [file1] [file2]` - Compress specific files
- Files under 100KB are automatically skipped

**Adding New Images:**

1. Add image files to appropriate src/content/ subdirectory
2. Git will automatically compress on commit via Husky + lint-staged
3. Or run `npm run compress-images` manually before committing

**Setup for New Clones:**

- Husky hooks are automatically installed via `npm install` (prepare script)
- No additional setup required for collaborators
