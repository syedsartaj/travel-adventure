import HeroSlider from '@/components/HeroSlider'
import DestinationCard from '@/components/DestinationCard'
import TravelStats from '@/components/TravelStats'
import { MapPin, Compass, Camera, Users, ArrowRight, Globe2 } from 'lucide-react'
import { getSmakslyBlogs, formatBlogDate, estimateReadTime } from '@/lib/smaksly-blogs'
import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

// Sample destination data
const featuredDestinations = [
  {
    id: '1',
    title: 'Santorini, Greece',
    country: 'Greece',
    flag: '🇬🇷',
    description: 'White-washed buildings cascade down cliffsides overlooking the deep blue Aegean Sea. Experience breathtaking sunsets and ancient volcanic landscapes.',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
    category: 'Island Paradise',
    visitorsCount: 12500,
    bestTime: 'Apr - Oct',
  },
  {
    id: '2',
    title: 'Kyoto, Japan',
    country: 'Japan',
    flag: '🇯🇵',
    description: 'Ancient temples, traditional geishas, and serene bamboo forests. Discover the perfect blend of tradition and tranquility in this historic city.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    category: 'Cultural Heritage',
    visitorsCount: 15200,
    bestTime: 'Mar - May',
  },
  {
    id: '3',
    title: 'Patagonia, Argentina',
    country: 'Argentina',
    flag: '🇦🇷',
    description: 'Vast glaciers, towering peaks, and pristine wilderness. Trek through one of the world\'s most spectacular natural landscapes.',
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop',
    category: 'Adventure',
    visitorsCount: 8900,
    bestTime: 'Dec - Feb',
  },
  {
    id: '4',
    title: 'Marrakech, Morocco',
    country: 'Morocco',
    flag: '🇲🇦',
    description: 'Vibrant souks, ornate palaces, and aromatic spice markets. Lose yourself in the exotic charm of this North African gem.',
    image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&h=600&fit=crop',
    category: 'Exotic Culture',
    visitorsCount: 11300,
    bestTime: 'Mar - May',
  },
  {
    id: '5',
    title: 'Bali, Indonesia',
    country: 'Indonesia',
    flag: '🇮🇩',
    description: 'Lush rice terraces, sacred temples, and pristine beaches. Find your inner peace in this island of gods and spiritual awakening.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    category: 'Spiritual Retreat',
    visitorsCount: 18700,
    bestTime: 'Apr - Oct',
  },
  {
    id: '6',
    title: 'Iceland',
    country: 'Iceland',
    flag: '🇮🇸',
    description: 'Majestic waterfalls, geothermal hot springs, and the magical Northern Lights. Experience nature\'s raw power and beauty.',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&h=600&fit=crop',
    category: 'Natural Wonders',
    visitorsCount: 9800,
    bestTime: 'Jun - Aug',
  },
]

export default async function Home() {
  // Fetch blogs from Smaksly database
  const smakslyBlogs = await getSmakslyBlogs()

  // Transform SmakslyBlog to match the component's expected format
  const travelStories = smakslyBlogs.slice(0, 3).map(blog => ({
    title: blog.title,
    excerpt: blog.body.substring(0, 150).replace(/<[^>]*>/g, '') + '...',
    author: 'Travel Writer',
    date: formatBlogDate(blog.publish_date),
    readTime: estimateReadTime(blog.body),
    image: blog.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
    slug: blog.slug,
  }))
  return (
    <div className="w-full">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Welcome Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
            <Globe2 className="w-4 h-4" />
            <span>Explore the World with Wanderlust</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-slate-900">
            Your Journey Begins Here
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed mb-8">
            Discover hidden gems, iconic landmarks, and unforgettable experiences across the globe.
            We share authentic travel stories, insider tips, and stunning photography to inspire your next adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2">
              <Compass className="w-5 h-5" />
              Explore Destinations
            </button>
            <button className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-200 rounded-full font-semibold transition-all duration-300 flex items-center gap-2">
              <Camera className="w-5 h-5" />
              View Gallery
            </button>
          </div>
        </div>
      </section>

      {/* Travel Stats */}
      <TravelStats />

      {/* Featured Destinations */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
              <MapPin className="w-4 h-4" />
              <span>Featured Destinations</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Popular Travel Spots
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Handpicked destinations that offer unique experiences, stunning landscapes, and rich cultural heritage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2">
              View All Destinations
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Travel Stories */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-4">
              <Camera className="w-4 h-4" />
              <span>Latest Adventures</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              Recent Travel Stories
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Authentic experiences and personal journeys from travelers around the world
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelStories.length > 0 ? (
              travelStories.map((story, index) => (
                <Link key={index} href={`/blog/${story.slug}`}>
                  <article className="group cursor-pointer">
                    <div className="relative overflow-hidden rounded-2xl mb-4 aspect-[3/2]">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {story.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-orange-400 rounded-full flex items-center justify-center text-white font-semibold">
                            {story.author.charAt(0)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-slate-900">{story.author}</div>
                            <div className="text-xs text-slate-500">{story.date}</div>
                          </div>
                        </div>
                        <div className="text-sm text-slate-500">{story.readTime}</div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-slate-600 text-lg">No travel stories available yet. Check back soon!</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1920&h=1080&fit=crop')] opacity-10 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Explore Our Journey
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Follow our footsteps across continents and discover the world through our eyes
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <MapPin className="w-8 h-8 mx-auto mb-3 text-sky-400" />
              <div className="text-3xl font-bold mb-1">87</div>
              <div className="text-sm text-slate-300">Countries Visited</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Camera className="w-8 h-8 mx-auto mb-3 text-orange-400" />
              <div className="text-3xl font-bold mb-1">15K+</div>
              <div className="text-sm text-slate-300">Photos Captured</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Users className="w-8 h-8 mx-auto mb-3 text-sky-400" />
              <div className="text-3xl font-bold mb-1">250K</div>
              <div className="text-sm text-slate-300">Monthly Readers</div>
            </div>
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <Globe2 className="w-8 h-8 mx-auto mb-3 text-orange-400" />
              <div className="text-3xl font-bold mb-1">450+</div>
              <div className="text-sm text-slate-300">Travel Guides</div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-sky-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Join the Adventure
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Get weekly travel inspiration, destination guides, and exclusive tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-white/50"
            />
            <button className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-semibold transition-all duration-300 whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
          <p className="text-sm text-white/70 mt-4">
            No spam, unsubscribe anytime. Join 50,000+ travel enthusiasts
          </p>
        </div>
      </section>
    </div>
  )
}
