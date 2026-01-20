# Africa AI Platform - Sitemap & Development Notes

**Version:** 1.0  
**Last Updated:** January 19, 2026  
**Company:** Kheper LLC  
**Contact:** courtneybtaylor@kheperllc.com

---

## Table of Contents

1. [Site Architecture Overview](#site-architecture-overview)
2. [Complete Sitemap](#complete-sitemap)
3. [User Roles & Access Levels](#user-roles--access-levels)
4. [Database Schema](#database-schema)
5. [API Endpoints](#api-endpoints)
6. [Subscription Tiers](#subscription-tiers)
7. [Admin Development Notes](#admin-development-notes)
8. [Environment Variables](#environment-variables)
9. [Integrations](#integrations)
10. [Deployment Checklist](#deployment-checklist)

---

## Site Architecture Overview

```
Africa AI Platform
├── Public Pages (No Auth Required)
├── Protected Pages (Auth Required)
├── Premium Pages (Subscription Required)
└── Admin Pages (Admin Role Required)
```

**Tech Stack:**
- Framework: Next.js 16 (App Router)
- Database: Supabase (PostgreSQL)
- Auth: Supabase Auth
- Styling: Tailwind CSS v4 + shadcn/ui
- AI: Vercel AI SDK (AI Gateway)
- Caching: Upstash Redis
- Search: Upstash Search

---

## Complete Sitemap

### Public Pages (No Authentication)

| Route | Page | Description |
|-------|------|-------------|
| `/` | Homepage | Landing page with hero, features, destinations |
| `/countries` | Countries Explorer | Browse all 54 African countries |
| `/country/[code]` | Country Detail | Individual country information |
| `/cities` | Cities Browser | Browse cities with filters |
| `/city/[id]` | City Detail | Individual city guide |
| `/city/search` | City Search | Advanced city search |
| `/pricing` | Pricing | Subscription plans (Explorer, Voyager, Pioneer) |
| `/blog` | Blog | Articles and travel guides |
| `/blog/[slug]` | Blog Post | Individual blog article |
| `/faq` | FAQ | Frequently asked questions |
| `/company` | About Us | Company information |
| `/contact` | Contact | Contact form and company details |
| `/privacy` | Privacy Policy | Privacy policy |
| `/cookies` | Cookie Policy | Cookie usage policy |
| `/currency` | Currency Converter | Real-time currency conversion |
| `/emergency` | Emergency Info | Emergency contacts by country |
| `/auth` | Sign In/Sign Up | Authentication page |
| `/offline` | Offline | PWA offline fallback page |

### Protected Pages (Requires Authentication)

| Route | Page | Description |
|-------|------|-------------|
| `/dashboard` | User Dashboard | Personal dashboard, favorites, activity |
| `/profile/[id]` | User Profile | Public user profile |
| `/onboarding` | Onboarding | New user setup wizard |
| `/community` | Community Forum | Discussion forum |
| `/community/post/[id]` | Forum Post | Individual forum thread |
| `/referrals` | Referral Program | Earn credits by referring |

### Premium Pages (Requires Subscription)

| Route | Required Tier | Description |
|-------|---------------|-------------|
| `/planner` | Voyager+ | AI Trip Planner |
| `/visa` | Voyager+ | AI Visa Requirements Checker |
| `/checklist` | Voyager+ | Relocation Checklists (AI for Pioneer) |
| `/cost-calculator` | Free (Limited) | Cost of Living Calculator (4 cities free, all for paid) |
| `/health-safety` | Free (Limited) | Health & Safety Guide (AI advice for Pioneer) |
| `/business` | Pioneer | Business Directory |

### Admin Pages (Requires is_admin = true)

| Route | Page | Description |
|-------|------|-------------|
| `/admin` | Admin Dashboard | User management, analytics, moderation |

---

## User Roles & Access Levels

### Role Hierarchy

```
Explorer (Free) < Voyager ($9.99/mo) < Pioneer ($24.99/mo) < Admin
```

### Feature Access Matrix

| Feature | Explorer | Voyager | Pioneer | Admin |
|---------|----------|---------|---------|-------|
| Browse Countries/Cities | Yes | Yes | Yes | Yes |
| Currency Converter | Yes | Yes | Yes | Yes |
| Emergency Info | Yes | Yes | Yes | Yes |
| Community Forum | Yes | Yes | Yes | Yes |
| Save Favorites | 5 max | Unlimited | Unlimited | Unlimited |
| AI Trip Planner | No | Yes | Yes | Yes |
| AI Visa Checker | No | Yes | Yes | Yes |
| Relocation Checklists | Basic | Full | AI Custom | All |
| Cost Calculator Cities | 4 | All | All | All |
| AI Health Advice | No | No | Yes | Yes |
| Business Directory | No | No | Yes | Yes |
| Activity History | No | 1 each | 3 each | Unlimited |
| Referral Program | No | Yes | Yes | Yes |
| Admin Dashboard | No | No | No | Yes |

---

## Database Schema

### Tables Overview

| Table | Purpose | RLS |
|-------|---------|-----|
| `profiles` | User profiles, subscription info, admin flag | Yes |
| `favorites` | Saved countries, cities, businesses | Yes |
| `saved_trips` | AI-generated trip plans | Yes |
| `user_activities` | Recent activity history (tier-limited) | Yes |
| `forum_posts` | Community forum posts | Yes |
| `forum_comments` | Comments on forum posts | Yes |
| `forum_likes` | Post likes | Yes |
| `businesses` | Business directory listings | Yes |
| `referrals` | Referral tracking | Yes |
| `notifications` | User notifications | Yes |

### Key Tables Detail

#### profiles
```sql
- id: uuid (PK, references auth.users)
- email: text
- full_name: text
- avatar_url: text
- bio: text
- subscription_tier: text ('explorer', 'voyager', 'pioneer')
- subscription_ends_at: timestamp
- is_admin: boolean (default: false)
- onboarding_completed: boolean
- interests: text[]
- travel_goals: text[]
- favorite_countries: text[]
- referral_code: varchar
- referral_credits: integer
- referred_by: uuid
- social_links: jsonb
- created_at, updated_at: timestamp
```

#### user_activities
```sql
- id: uuid (PK)
- user_id: uuid (FK -> profiles)
- activity_type: text ('trip_plan', 'visa_check', 'city_guide')
- title: text
- detail: text
- data: jsonb
- created_at: timestamp
```

**Activity Limits by Tier:**
- Voyager: 1 of each type retained
- Pioneer: 3 of each type retained
- Admin: Unlimited

---

## API Endpoints

### AI Endpoints (Rate Limited)

| Endpoint | Method | Rate Limit | Purpose |
|----------|--------|------------|---------|
| `/api/chat` | POST | 20 req/min | AI chat assistant |
| `/api/health-advice` | POST | 5 req/min | Personalized health advice |

### Server Actions (in `/app/actions/`)

| Action | Purpose | Tier Required |
|--------|---------|---------------|
| `generateTripPlan` | AI trip planning | Voyager+ |
| `checkVisaRequirements` | AI visa info | Voyager+ |
| `generateCustomChecklist` | AI custom checklist | Pioneer |

---

## Subscription Tiers

### Explorer (Free)
- Basic country/city browsing
- 5 favorites limit
- Limited cost calculator (4 cities)
- Community forum access
- Basic checklists

### Voyager ($9.99/month)
- Everything in Explorer
- AI Trip Planner
- AI Visa Checker
- Full cost calculator (all cities)
- Full checklists library
- Activity history (1 each)
- Referral program access

### Pioneer ($24.99/month)
- Everything in Voyager
- AI Custom Checklist Generator
- AI Personalized Health Advice
- Business Directory access
- Activity history (3 each)
- Priority support
- Relocation consultant access

---

## Admin Development Notes

### Making a User Admin

Run this SQL in Supabase:
```sql
UPDATE profiles 
SET is_admin = true 
WHERE email = 'user@example.com';
```

Or use the script: `scripts/make-admin.sql`

### Admin Capabilities

1. **User Management**
   - View all registered users
   - Change subscription tiers
   - View user activity

2. **Content Moderation**
   - Review forum posts
   - Approve/reject businesses
   - Remove inappropriate content

3. **Analytics Access**
   - User signups
   - Subscription conversions
   - Feature usage stats

### Admin Bypass

Admins automatically bypass:
- Subscription gates (all features accessible)
- Rate limits (for testing)
- Activity history limits

This is controlled in `components/subscription-gate.tsx`:
```typescript
const hasAccess = () => {
  if (isAdmin) return true; // Admin bypass
  // ... subscription checks
};
```

---

## Environment Variables

### Required for Production

| Variable | Source | Purpose |
|----------|--------|---------|
| `SUPABASE_URL` | Supabase | Database URL |
| `SUPABASE_ANON_KEY` | Supabase | Public API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase | Server-side key |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase | Client-side URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase | Client-side key |
| `KV_REST_API_URL` | Upstash | Redis URL |
| `KV_REST_API_TOKEN` | Upstash | Redis token |
| `RESEND_API_KEY` | Resend | Email API key |

### Auto-Configured (Vercel AI Gateway)

The following AI providers work automatically via Vercel AI Gateway:
- OpenAI (gpt-5-mini, gpt-5)
- Anthropic (claude-sonnet-4.5)
- Google (gemini-2.0-flash)

---

## Integrations

### Active Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| Supabase | Database + Auth | Connected |
| Upstash Redis | Rate limiting, caching | Connected |
| Upstash Search | Full-text search | Connected |
| Vercel AI Gateway | AI model access | Connected |
| Resend | Transactional emails | Connected |

### Pending Integrations

| Service | Purpose | Requirements |
|---------|---------|--------------|
| Stripe | Payments | API keys needed |
| Google Maps | Interactive maps | API key needed |

---

## Deployment Checklist

### Pre-Deployment

- [x] All pages rendering without errors
- [x] Database migrations run
- [x] RLS policies configured
- [x] Admin user created
- [x] Environment variables set
- [x] Images generated/configured
- [x] Privacy & Cookie policies added
- [x] Contact page with company info

### Post-Deployment

- [ ] Test authentication flow
- [ ] Test subscription upgrade flow
- [ ] Verify AI features working
- [ ] Test admin dashboard access
- [ ] Monitor error logs
- [ ] Set up Stripe for payments
- [ ] Configure custom domain
- [ ] Set up analytics (Vercel Analytics)

### Known Issues / Future Improvements

1. **Stripe Integration** - Needs API keys for live payments
2. **Interactive Map** - Using simple map, can upgrade to full SVG
3. **Email Templates** - Basic templates, can enhance design
4. **PWA Support** - Service worker has preview limitations

---

## Contact & Support

**Company:** Kheper LLC  
**Address:** 2904 E 49th St, Kansas City, MO 64130-2706  
**Phone:** +1 (816) 527-6799  
**Email:** courtneybtaylor@kheperllc.com

---

*This document is for internal development use. Last generated: January 19, 2026*
