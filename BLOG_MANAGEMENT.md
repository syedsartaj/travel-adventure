# Blog Management System

This document explains how to manage travel stories and destinations in the Travel Adventure Blog.

## Overview

The blog management system provides full CRUD (Create, Read, Update, Delete) functionality for:
- **Travel Stories** - Blog posts about travel experiences
- **Destinations** - Location guides and information

Access via:
- **Admin Dashboard**: Visual interface at `/admin`
- **REST API**: Programmatic access at `/api/stories` and `/api/destinations`

## Getting Started

### 1. Set Up MongoDB

1. Create a free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster
3. Get your connection string

### 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/wanderlust
```

### 3. Access the Admin Dashboard

Navigate to `http://localhost:3000/admin` (or your deployed URL + `/admin`)

## Admin Dashboard Features

### Dashboard (`/admin`)
- View all stories in a table
- Filter by category, status, and search
- See statistics (total, published, featured, views)
- Quick access to edit/delete stories

### Create Story (`/admin/stories/new`)
- Add new travel stories with full details
- Rich content editor
- Image gallery management
- Tag management
- Publishing controls (draft/published, featured)

### Edit Story (`/admin/stories/[id]`)
- Modify existing stories
- All fields are pre-populated
- Changes save to database instantly

## API Endpoints

### Stories API

#### GET /api/stories
Fetch all stories or filter.

```bash
# Get all stories
curl http://localhost:3000/api/stories

# Get all stories (including unpublished)
curl http://localhost:3000/api/stories?all=true

# Get featured stories
curl http://localhost:3000/api/stories?featured=true

# Filter by category
curl http://localhost:3000/api/stories?category=Adventure
```

#### POST /api/stories
Create a new story.

```bash
curl -X POST http://localhost:3000/api/stories \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Northern Lights in Lapland",
    "slug": "northern-lights-lapland",
    "excerpt": "A magical winter journey...",
    "content": "Full story content here...",
    "author": {
      "name": "Emma Peterson",
      "avatar": "https://...",
      "bio": "Travel writer and photographer"
    },
    "destination": "Lapland, Finland",
    "coverImage": "https://...",
    "images": ["https://..."],
    "category": "Adventure",
    "tags": ["aurora", "winter", "finland"],
    "readTime": 8,
    "published": true,
    "featured": true
  }'
```

#### GET /api/stories/[id]
Get a single story by ID.

```bash
curl http://localhost:3000/api/stories/507f1f77bcf86cd799439011
```

#### PUT /api/stories/[id]
Update an existing story.

```bash
curl -X PUT http://localhost:3000/api/stories/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title",
    "featured": true
  }'
```

#### DELETE /api/stories/[id]
Delete a story.

```bash
curl -X DELETE http://localhost:3000/api/stories/507f1f77bcf86cd799439011
```

## Data Schemas

### Travel Story Schema

```typescript
interface TravelStory {
  _id: string               // Auto-generated
  title: string             // Required
  slug: string              // Required - URL-friendly identifier
  excerpt: string           // Required - Short summary
  content: string           // Required - Full story content
  author: {
    name: string            // Required
    avatar: string          // Optional
    bio: string             // Optional
  }
  destination: string       // Required - e.g., "Lapland, Finland"
  destinationId?: string    // Optional - Reference to destination
  coverImage: string        // Required - Main image URL
  images: string[]          // Optional - Additional images
  category: string          // Required - e.g., "Adventure", "Cultural"
  tags: string[]            // Optional - for search/filtering
  readTime: number          // Reading time in minutes
  publishedAt: Date         // When the story was/will be published
  createdAt: Date           // Auto-generated
  updatedAt: Date           // Auto-updated
  published: boolean        // Whether visible on site
  featured: boolean         // Show in featured section
  views: number             // View counter
  likes: number             // Like counter
  comments: Comment[]       // User comments
}
```

### Categories

Available story categories:
- Adventure
- Food & Culture
- Hiking
- Wildlife
- Cultural
- Road Trip
- Spiritual
- Island Life
- Beach
- City
- Mountains

## Deployment on Vercel

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variable in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB connection string
4. Deploy

The admin dashboard and API will work automatically after deployment.

## Security Considerations

For production, consider adding:
- Authentication for the admin dashboard
- Rate limiting on API endpoints
- Input validation and sanitization

Example with NextAuth.js:
```typescript
// In your admin pages, add authentication check
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const session = await getServerSession()
  if (!session) redirect('/login')
  // ... rest of component
}
```

## Troubleshooting

### "Please add your MongoDB URI to .env.local"
Ensure you have created `.env.local` with a valid MongoDB connection string.

### "Failed to fetch stories"
- Check if MongoDB Atlas allows connections from your IP
- Verify the connection string is correct
- Ensure the database user has read/write permissions

### Stories not showing on the main site
The main site may use static data. To use database stories, modify the pages to fetch from the API.
