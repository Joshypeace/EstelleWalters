# Deployment Guide

## Overview

This guide explains how to deploy the Estelle Walters website to production on Vercel and prepare it for launch.

## Pre-Deployment Checklist

- [ ] Update domain name in environment variables
- [ ] Configure SEO metadata for all pages
- [ ] Test all forms and interactive features
- [ ] Verify responsive design on mobile devices
- [ ] Check all links are working correctly
- [ ] Update social media links in footer
- [ ] Configure contact form backend (optional)
- [ ] Set up analytics (Google Analytics, etc.)

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

Vercel is the recommended platform for Next.js applications and provides seamless integration with GitHub.

#### Prerequisites

1. Create a Vercel account at https://vercel.com
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

#### Steps

1. **Connect GitHub Repository** (if using Git)
   ```bash
   # Initialize git if not already done
   git init
   git add .
   git commit -m "Initial commit"
   
   # Create repository on GitHub and push
   git remote add origin https://github.com/yourusername/estelle-walters.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   ```bash
   # Login to Vercel
   vercel login
   
   # Deploy
   vercel deploy --prod
   
   # Or use the GitHub integration
   # - Visit https://vercel.com/new
   # - Select GitHub repository
   # - Configure project settings
   # - Click Deploy
   ```

3. **Configure Environment Variables** (if needed in future)
   - Go to Vercel Dashboard > Settings > Environment Variables
   - Add any required environment variables
   - Redeploy if changes made

#### Custom Domain Setup

1. Go to Vercel Dashboard > Settings > Domains
2. Click "Add" and enter your domain
3. Follow instructions to configure DNS:
   - Option A: Update domain nameservers to Vercel's nameservers
   - Option B: Add CNAME records pointing to Vercel

### Option 2: Deploy to Other Platforms

#### Netlify

```bash
npm run build
# Connect to Netlify via dashboard or CLI
netlify deploy --prod
```

#### AWS / Azure / GCP

Requires Node.js hosting and can be configured as needed. See respective platform documentation.

## Production Configuration

### Environment Variables

Create a `.env.production` file or configure in your hosting platform:

```env
NEXT_PUBLIC_SITE_URL=https://estelle.com
NODE_ENV=production
```

### Build & Start

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Performance Optimization

### Current Optimizations

- Next.js automatic code splitting
- Image optimization with `next/image`
- CSS minification with Tailwind
- Tree-shaking of unused code

### Additional Optimizations

1. **Enable Compression**
   - Vercel automatically enables gzip compression

2. **CDN Configuration**
   - Vercel includes global CDN by default

3. **Caching Headers**
   - Static assets cached for 1 year
   - HTML cached for 30 seconds

### Monitoring Performance

- Use Vercel Analytics dashboard
- Monitor Core Web Vitals
- Check Lighthouse scores regularly

## SEO & Analytics

### Google Search Console

1. Verify domain ownership
2. Submit sitemap: `https://estelle.com/sitemap.xml`
3. Monitor search performance

### Google Analytics

Add to `app/layout.tsx`:

```tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout() {
  return (
    <html>
      <body>
        {/* ... */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
```

### Sitemap & Robots

- Sitemap: `/public/sitemap.xml` (already configured)
- Robots: `/public/robots.txt` (already configured)

## Security

### Security Headers

Vercel automatically sets security headers. Custom headers can be configured in `next.config.mjs`:

```js
async headers() {
  return [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff'
        },
        {
          key: 'X-Frame-Options',
          value: 'DENY'
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block'
        }
      ]
    }
  ]
}
```

### HTTPS

- Vercel automatically provides HTTPS with free SSL certificate
- Certificate renewal is automatic

## Database Integration (Future)

When ready to add database functionality:

1. **Set up Neon PostgreSQL**
   - Create account at https://neon.tech
   - Create database
   - Get connection string

2. **Configure in Vercel**
   - Add `DATABASE_URL` to environment variables
   - Restart deployment

3. **Update Code**
   - Implement Drizzle ORM queries
   - Replace mock authentication with Better Auth

## Monitoring & Maintenance

### Regular Tasks

- Monitor error logs in Vercel dashboard
- Check application performance weekly
- Update dependencies monthly
- Review analytics and user behavior

### Backup & Recovery

- GitHub serves as code backup
- Database backups (when implemented)
- Version control all changes

## Rollback Procedure

If issues occur after deployment:

1. **Immediate Rollback (Vercel)**
   - Go to Vercel Dashboard
   - Select deployment
   - Click "Rollback" on a previous working deployment

2. **Git Revert**
   ```bash
   git revert HEAD
   git push
   # Wait for automatic deployment
   ```

## Support & Troubleshooting

### Common Issues

**Build Fails**
- Check logs in Vercel dashboard
- Verify environment variables are set
- Ensure all dependencies are installed

**Slow Performance**
- Check if database queries are optimized
- Review Lighthouse report
- Enable caching headers

**Login Issues**
- Clear browser cache and cookies
- Check localStorage in browser console
- Verify authentication environment variables

### Getting Help

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- GitHub Issues: Create issue in repository

## Continuous Integration & Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## Post-Launch

### Launch Checklist

- [ ] Domain is pointing correctly
- [ ] SSL certificate is active
- [ ] All pages are accessible
- [ ] Contact form is working
- [ ] Admin dashboard is secure
- [ ] Performance metrics are good
- [ ] SEO metadata is correct
- [ ] Analytics are tracking correctly
- [ ] Backups are configured
- [ ] Monitoring is active

### Marketing

- Update social media profiles with new URL
- Submit to search engines
- Announce launch to audience
- Set up email notifications for errors

## Support

For deployment issues or questions:
- Check Vercel documentation
- Contact your development team
- Create GitHub issues for bug reports
