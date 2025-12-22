# Naresh R's Personal Website

Personal website and portfolio of Naresh R ([ghostwriternr.me](https://ghostwriternr.me)) - Software engineer, builder, and technology enthusiast based in London.

## About

Naresh is a software engineer at Cloudflare working on the agents team. Previously co-founded CodeStory (YC S23). This site serves as his digital presence and portfolio, featuring technical writing, poetry, and professional experience.

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

## Prerequisites

- Node.js 18+ and npm

## Setup Instructions

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

The site will be available at `http://localhost:4321`.

### Build

```bash
# Build for production
npm run build
```

The built site will be in the `./dist/` directory.

### Preview Production Build

```bash
# Build and preview with Cloudflare Workers locally
npm run preview
```

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

The site is deployed at [ghostwriternr.me](https://ghostwriternr.me) using Cloudflare Pages.

To deploy:

```bash
npm run deploy
```

## License

All rights reserved.

---

Built with [Astro](https://astro.build) 🚀
