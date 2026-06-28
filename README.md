# Estelle Walters - Premium Personal Brand Website

A luxury, high-end personal brand website and publishing dashboard for Estelle Walters, featuring her three premier businesses: Bilas Studio, Bilas Beauty, and ConnetSuppliers.

## Overview

This project is a full-stack application built with Next.js 16, featuring:

- **Public Website**: Luxury personal brand presence with dark mode editorial aesthetic
- **Admin Dashboard**: Content management system with authentication
- **AI Tools**: Voice-to-blog and social media content generation
- **Business Pages**: Dedicated pages for each of the three businesses
- **Journal System**: Blog articles with full article pages
- **Travel & Lifestyle**: Curated content and experiences

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4 with custom luxury theme
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **State Management**: React Hooks + LocalStorage (mock auth)
- **Icons**: Lucide React

## Project Structure

```
src/
├── app/
│   ├── (public)              # Public pages
│   │   ├── page.tsx          # Homepage
│   │   ├── about/            # About page
│   │   ├── journal/          # Journal listing and articles
│   │   ├── travel/           # Travel & experiences
│   │   └── businesses/       # Business pages
│   ├── admin/                # Admin dashboard (protected)
│   │   ├── login/            # Admin login
│   │   ├── page.tsx          # Dashboard home
│   │   ├── articles/         # Manage articles
│   │   ├── businesses/       # Manage businesses
│   │   ├── ai-tools/         # AI content generation
│   │   └── settings/         # Site settings
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles & theme
├── components/
│   ├── admin/                # Admin-specific components
│   ├── layout/               # Header, footer, navigation
│   ├── sections/             # Page sections (hero, about, etc.)
│   ├── ui/                   # shadcn/ui components
│   └── ...
├── lib/
│   ├── admin-auth.ts         # Mock authentication
│   ├── animations.ts         # Framer Motion variants
│   └── utils.ts              # Utility functions
└── public/
    ├── sitemap.xml           # SEO sitemap
    └── robots.txt            # Search engine instructions
```

## Features

### Public Website

- **Homepage**: Hero section with brand introduction, business overview, featured articles, and CTA
- **About Page**: Personal story, values, timeline, and achievements
- **Business Pages**: 
  - Bilas Studio: Luxury beauty experiences and services
  - Bilas Beauty: Premium product collection
  - ConnetSuppliers: Global B2B trade network
- **Journal**: Blog system with featured articles on luxury beauty, global trade, and wellness
- **Travel**: Curated travel destinations and experiences
- **Responsive Design**: Mobile-first approach with desktop optimization

### Admin Dashboard

- **Authentication**: Mock login system (email: admin@estelle.com, password: demo123)
- **Dashboard**: Overview with key metrics and recent activity
- **Article Management**: Create, edit, delete articles
- **Business Management**: Manage business portfolios and information
- **AI Tools**: 
  - Voice-to-Blog: Transform voice notes into polished articles
  - Social Media: Generate engaging social content
- **Settings**: Configure site information and contact details

### Design System

**Color Palette**:
- Background: #0f0f0f (Deep black)
- Foreground: #fafafa (Crisp white)
- Cards: #1a1a1a (Dark gray)
- Accent: #d4a574 (Warm gold)
- Border: #2a2a2a (Subtle gray)

**Typography**:
- Headings: System font (Geist Sans)
- Body: System font (Geist Sans) with 1.5 line-height
- Monospace: Geist Mono

**Animations**:
- Smooth entrance animations with staggered timing
- Subtle hover effects and transitions
- Framer Motion spring animations for interactive elements

## Getting Started

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/estelle-walters.git
cd estelle-walters

# Install dependencies
pnpm install

# Set up environment variables (optional for full features)
cp .env.example .env.local
```

### Development

```bash
# Start the development server
pnpm dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
pnpm build

# Start production server
pnpm start

# Deploy to Vercel (recommended)
vercel deploy
```

## Admin Access

### Login Credentials (Development)

- **Email**: admin@estelle.com
- **Password**: demo123

### Navigation

Once logged in, you can access:
- Dashboard: Overview and key metrics
- Articles: Manage blog content
- Businesses: Manage business information
- AI Tools: Generate content using AI
- Settings: Configure site settings

## Future Enhancements

### Database Integration
- Implement Neon PostgreSQL with Drizzle ORM
- Replace mock authentication with Better Auth
- Store articles, businesses, and settings in database

### AI Features
- Integrate Vercel AI SDK v6 for real voice-to-text
- Implement actual content generation with Claude or GPT
- Add scheduled content publishing

### Additional Features
- Email newsletter subscription
- Advanced analytics dashboard
- Social media automation
- Content scheduling and workflows
- User comments and engagement

## Environment Variables

### Optional (for production features)

```
# Database
DATABASE_URL=postgresql://...

# Authentication
BETTER_AUTH_SECRET=your-secret-key

# AI Integration
OPENAI_API_KEY=your-api-key
GROQ_API_KEY=your-api-key

# Blob Storage
BLOB_READ_WRITE_TOKEN=your-token
```

## SEO & Performance

- Metadata optimization for all pages
- XML sitemap for search engines
- Open Graph tags for social sharing
- Mobile-responsive design
- Fast loading with Next.js optimization

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

This is a custom project for Estelle Walters. For changes or updates, please contact the development team.

## License

© 2026 Estelle Walters. All rights reserved.

## Support

For technical support or questions about this project, please contact the development team or create an issue on GitHub.
