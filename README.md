# Wanderlust - Travel Adventure Blog

An immersive, full-width travel blog built with Next.js 14, featuring stunning hero sliders, destination showcases, and AI-powered travel content generation.

## Features

### Design & UX
- **Full-Screen Hero Slider** - Captivating image carousel with smooth transitions
- **Transparent Navigation** - Elegant header that adapts on scroll
- **Destination Cards** - Interactive cards with country flags and hover effects
- **Travel Statistics** - Animated counters showing journey milestones
- **Responsive Design** - Optimized for all devices from mobile to desktop
- **Immersive Imagery** - Full-width layouts with gradient overlays

### Technical Features
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom travel-themed design system
- **MongoDB** integration for destinations and stories
- **OpenAI Integration** for AI-generated travel content
- **Framer Motion** for smooth animations
- **Lucide React** icons for consistent iconography

### Travel Content
- Destination guides with detailed information
- Travel stories and personal experiences
- Country flags and location data
- Best time to visit recommendations
- Budget information and travel tips
- Interactive map visualizations

## Color Palette

### Ocean Blue (Primary)
- Light: `#e0f2fe` (sky-100)
- Base: `#0ea5e9` (sky-500)
- Dark: `#0369a1` (sky-700)

### Sunset Orange (Accent)
- Light: `#fed7aa` (orange-200)
- Base: `#fb923c` (orange-400)
- Dark: `#ea580c` (orange-600)

### Dark Overlay
- Base: `#0f172a` (slate-900)
- Transparent: `rgba(15, 23, 42, 0.8)`

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- MongoDB instance (local or Atlas)
- OpenAI API key (for AI features)

### Installation

1. **Clone and install dependencies**
   ```bash
   cd travel-adventure
   npm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your credentials:
   ```env
   MONGODB_URI=mongodb://localhost:27017/wanderlust
   OPENAI_API_KEY=sk-your-api-key
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
travel-adventure/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Homepage with hero, destinations, stories
│   └── globals.css         # Global styles and custom CSS
├── components/
│   ├── Header.tsx          # Transparent navigation bar
│   ├── Footer.tsx          # Footer with destinations and newsletter
│   ├── HeroSlider.tsx      # Full-screen image slider
│   ├── DestinationCard.tsx # Destination showcase cards
│   └── TravelStats.tsx     # Animated statistics counters
├── lib/
│   ├── db.ts               # MongoDB configuration and helpers
│   └── openai.ts           # OpenAI integration for AI content
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## Key Components

### HeroSlider
Full-screen image carousel with automatic rotation and manual controls:
- Auto-play functionality (5-second intervals)
- Manual navigation arrows
- Dot indicators
- Smooth fade transitions
- Gradient overlays for text readability

### DestinationCard
Interactive destination showcase with:
- Country flags
- Category badges
- Visitor statistics
- Best time to visit
- Hover animations revealing full description
- CTA buttons

### TravelStats
Animated statistics with:
- Intersection Observer for scroll-triggered animations
- Counter animations from 0 to target value
- Gradient backgrounds
- Icon integration

## Database Schema

### Destination Model
```typescript
{
  title: string
  country: string
  flag: string
  description: string
  images: string[]
  category: string
  coordinates: { latitude, longitude }
  visitorsCount: number
  rating: number
  bestTimeToVisit: { months, description }
  budget: { level, dailyAverage, currency }
  highlights: string[]
  activities: string[]
}
```

### Travel Story Model
```typescript
{
  title: string
  content: string
  author: { name, avatar, bio }
  destination: string
  coverImage: string
  publishedAt: Date
  views: number
  likes: number
  comments: Comment[]
}
```

## AI Features

The blog includes OpenAI integration for:

1. **Travel Story Generation** - Create engaging narratives about destinations
2. **Destination Guides** - Generate comprehensive travel guides
3. **Travel Tips** - AI-powered practical advice
4. **Photo Captions** - Instagram-worthy captions for travel photos
5. **Itinerary Planning** - Custom trip itineraries based on preferences
6. **Content Moderation** - Automated user content screening

## Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  ocean: { /* your blues */ },
  sunset: { /* your oranges */ }
}
```

### Fonts
The template uses:
- **Inter** - Clean, modern sans-serif for body text
- **Playfair Display** - Elegant serif for headings

Change fonts in `app/layout.tsx`:
```typescript
const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'] })
```

### Hero Images
Update hero slides in `components/HeroSlider.tsx`:
```typescript
const heroSlides = [
  {
    title: 'Your Title',
    image: 'your-image-url',
    location: 'Your Location'
  }
]
```

## Performance Optimization

- **Image Optimization** - Next.js Image component with WebP/AVIF
- **Code Splitting** - Automatic route-based code splitting
- **CSS Optimization** - Tailwind CSS purging in production
- **Font Optimization** - Google Fonts with display: swap
- **Lazy Loading** - Images and components load on-demand

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel
```

### Docker
```bash
docker build -t travel-adventure .
docker run -p 3000:3000 travel-adventure
```

### Environment Variables for Production
Ensure these are set in your hosting platform:
- `MONGODB_URI`
- `OPENAI_API_KEY`
- `NEXTAUTH_SECRET`
- `NEXT_PUBLIC_SITE_URL`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - feel free to use this template for personal or commercial projects.

## Support

For questions or issues:
- Open an issue on GitHub
- Email: support@wanderlust.travel
- Twitter: @wanderlust

## Credits

- **Images** - Unsplash (https://unsplash.com)
- **Icons** - Lucide React (https://lucide.dev)
- **Fonts** - Google Fonts
- **Framework** - Next.js by Vercel

---

**Built with wanderlust and code**

Happy travels and happy coding!
