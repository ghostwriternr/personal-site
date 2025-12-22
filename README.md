# Naresh R's Personal Website

> Personal portfolio and blog of Naresh R - Building the future of AI agents and developer tools

[![Live Site](https://img.shields.io/badge/live-ghostwriternr.me-blue)](https://ghostwriternr.me)
[![Built with Astro](https://img.shields.io/badge/built%20with-Astro-FF5D01)](https://astro.build)
[![Deployed on Cloudflare](https://img.shields.io/badge/deployed%20on-Cloudflare%20Pages-F38020)](https://pages.cloudflare.com)

## About

Welcome to my digital home on the internet! This is where I share my thoughts on technology, AI agents, developer tools, and life through technical writing and poetry.

**Naresh R** is currently building the future of AI agents at [Cloudflare](https://cloudflare.com), where he works on the agents team. Previously, he co-founded and served as CTO of [CodeStory](https://codestory.ai) (YC S23), an AI-powered code editor that helps developers write and understand code faster. Based in London, Naresh is passionate about creating developer tools that augment human capabilities and exploring the intersection of AI and software engineering.

This site serves as both a professional portfolio and a creative outlet, featuring:
- **Technical blog posts** on AI agents, distributed systems, and developer tools
- **Poetry and creative writing** exploring life, technology, and human experiences
- **Professional timeline** showcasing work at Cloudflare, CodeStory, Intuit, and Setu
- **Reading list** of books that have shaped my thinking

## Features

- 🚀 Clean, modern design with responsive layout
- ⚡ Blazing fast performance with Astro static site generation
- 🌓 Dark/Light theme toggle with system preference detection
- 📝 Blog section for technical writing
- ✍️ Poetry collection
- 📱 Fully responsive design
- 🔍 SEO-optimized with sitemap and RSS feed
- 🎨 Custom typography with Argesta and Lufga fonts
- 🖼️ Automatic image optimization with pre-commit hooks
- 📖 Reading list integration

## Tech Stack

- **Framework**: [Astro](https://astro.build) 5.x - Modern static site framework
- **Styling**: [Tailwind CSS](https://tailwindcss.com) 4.x with Typography plugin
- **Content**: MDX support for enhanced Markdown with [Expressive Code](https://expressive-code.com/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/) with Workers adapter
- **Type Safety**: TypeScript with content schema validation
- **Developer Tools**:
  - Prettier for code formatting
  - Husky for Git hooks
  - lint-staged for automated image compression
  - Wrangler for Cloudflare deployment

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- (Optional) ImageMagick, pngquant, and jpegoptim for image compression

### Installation

```bash
# Clone the repository
git clone https://github.com/ghostwriternr/personal-site.git
cd personal-site

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The site will be available at `http://localhost:4321` with hot module reloading.

### Build & Preview

```bash
# Build for production
npm run build

# Preview production build with Cloudflare Workers locally
npm run preview
```

The built site will be in the `./dist/` directory.

## Available Commands

| Command                  | Description                                      |
| :----------------------- | :----------------------------------------------- |
| `npm install`            | Install dependencies                             |
| `npm run dev`            | Start local dev server at `localhost:4321`       |
| `npm run build`          | Build production site to `./dist/`               |
| `npm run preview`        | Build and preview with Cloudflare Workers        |
| `npm run deploy`         | Build and deploy to Cloudflare Pages             |
| `npm run format`         | Format code with Prettier                        |
| `npm run compress-images`| Manually compress all images in src/content/     |
| `npm run cf-typegen`     | Generate Cloudflare Workers types                |

## Project Structure

```text
├── public/
│   └── fonts/          # Custom Argesta and Lufga fonts
├── src/
│   ├── assets/         # Image assets
│   ├── components/     # Reusable Astro components
│   ├── content/        # Content collections (blog & poetry)
│   ├── icons/          # Social media icons
│   ├── layouts/        # Page layouts
│   ├── lib/            # Utility libraries (theme management)
│   ├── pages/          # File-based routing
│   ├── schemas/        # Zod schemas for content validation
│   └── styles/         # Global styles and typography
├── astro.config.mjs    # Astro configuration
├── package.json        # Project dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Content Management

The site uses Astro's Content Collections API for managing content:

- **Blog Posts** (`src/content/blog/`): Technical articles and writing
- **Poetry** (`src/content/poetry/`): Creative writing and poetry

All content is written in Markdown/MDX with frontmatter validation using Zod schemas.

## Image Optimization

The project includes automatic image compression:

- **Pre-commit hooks** automatically compress new/modified images
- Target: <100KB final WebP size
- Powered by ImageMagick, pngquant, and jpegoptim
- Manual compression: `npm run compress-images`

## Deployment

The site is automatically deployed to [ghostwriternr.me](https://ghostwriternr.me) using Cloudflare Pages with continuous deployment from the main branch.

### Manual Deployment

```bash
# Deploy to Cloudflare Pages
npm run deploy
```

This builds the site and deploys it using Wrangler, Cloudflare's CLI tool.

## Design Philosophy

This site embodies several key principles:

- **Performance First**: Static site generation with edge deployment for blazing-fast load times
- **Content-Driven**: Markdown/MDX content with strong type safety through Zod schemas
- **Accessibility**: Semantic HTML, proper heading hierarchy, and responsive design
- **Progressive Enhancement**: Works without JavaScript, enhanced with it
- **Developer Experience**: Fast local development, type safety, and automated workflows

## Key Features Explained

### Automatic Image Optimization

The project uses Husky pre-commit hooks to automatically compress images:
- Images are resized to max 1000px width
- Compressed to <100KB target size
- Converted to optimized WebP format during build
- Run manually with `npm run compress-images`

### Theme System

Three-mode theme toggle (Light/Dark/Auto) with:
- System preference detection
- LocalStorage persistence
- Smooth transitions (250ms)
- No flash of unstyled content (FOUC)

### Content Collections

Astro's Content Collections provide:
- Type-safe frontmatter with Zod validation
- Automatic slug generation
- Co-located assets with content
- MDX support for interactive content

## Contributing

This is a personal site, but if you spot any bugs or have suggestions, feel free to open an issue on GitHub.

## License

© 2025 Naresh R. All rights reserved.

The code is available for reference and learning purposes. Please don't copy the content or design wholesale.

---

Built with ❤️ using [Astro](https://astro.build), deployed on [Cloudflare Pages](https://pages.cloudflare.com)
