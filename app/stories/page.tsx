import Link from 'next/link';
import { BookOpen, Clock, User, ArrowRight, Calendar } from 'lucide-react';

const travelStories = [
  {
    slug: 'northern-lights-lapland',
    title: 'Chasing Northern Lights in Lapland',
    excerpt: 'A magical winter journey through the Arctic Circle, witnessing the aurora borealis dance across the frozen sky. From husky sledding to ice hotels, discover the wonders of Finnish Lapland.',
    author: 'Emma Peterson',
    date: '2024-12-10',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800&h=500&fit=crop',
    category: 'Adventure',
    featured: true,
  },
  {
    slug: 'street-food-bangkok',
    title: 'Street Food Adventures in Bangkok',
    excerpt: 'Navigating the bustling night markets and discovering the authentic flavors of Thai cuisine one bite at a time. A culinary journey through the streets of Thailand\'s vibrant capital.',
    author: 'Michael Chen',
    date: '2024-12-08',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&h=500&fit=crop',
    category: 'Food & Culture',
    featured: true,
  },
  {
    slug: 'inca-trail-machu-picchu',
    title: 'Hiking the Inca Trail to Machu Picchu',
    excerpt: 'Four days of breathtaking mountain passes and ancient ruins culminating in the sunrise over the Lost City of the Incas. An unforgettable trek through Peru\'s sacred valley.',
    author: 'Sofia Rodriguez',
    date: '2024-12-05',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=500&fit=crop',
    category: 'Hiking',
    featured: true,
  },
  {
    slug: 'safari-serengeti',
    title: 'Safari Dreams in the Serengeti',
    excerpt: 'Witnessing the great migration and encountering Africa\'s magnificent wildlife in their natural habitat. From lions to elephants, every moment was pure magic.',
    author: 'David Thompson',
    date: '2024-12-01',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=500&fit=crop',
    category: 'Wildlife',
    featured: false,
  },
  {
    slug: 'cherry-blossoms-tokyo',
    title: 'Cherry Blossom Season in Tokyo',
    excerpt: 'Experiencing hanami in Japan\'s bustling capital as the city transforms into a sea of pink petals. A guide to the best spots and cultural traditions.',
    author: 'Yuki Tanaka',
    date: '2024-11-28',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=500&fit=crop',
    category: 'Cultural',
    featured: false,
  },
  {
    slug: 'road-trip-iceland',
    title: 'Ring Road: Iceland\'s Epic Road Trip',
    excerpt: 'Circumnavigating Iceland\'s famous Route 1, from dramatic waterfalls to volcanic landscapes and glacier lagoons. The ultimate guide to an Icelandic adventure.',
    author: 'Emma Peterson',
    date: '2024-11-25',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&h=500&fit=crop',
    category: 'Road Trip',
    featured: false,
  },
  {
    slug: 'temples-of-bali',
    title: 'Sacred Temples of Bali',
    excerpt: 'A spiritual journey through Bali\'s most sacred sites, from the sea temple of Tanah Lot to the mountain sanctuary of Besakih. Discover the island\'s rich Hindu heritage.',
    author: 'Maya Wijaya',
    date: '2024-11-20',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=500&fit=crop',
    category: 'Spiritual',
    featured: false,
  },
  {
    slug: 'greek-island-hopping',
    title: 'Island Hopping in the Greek Cyclades',
    excerpt: 'From the blue domes of Santorini to the windmills of Mykonos, exploring the sun-drenched islands of the Aegean Sea. A Mediterranean dream come true.',
    author: 'Elena Papadopoulos',
    date: '2024-11-15',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=500&fit=crop',
    category: 'Island Life',
    featured: false,
  },
];

const categories = ['All', 'Adventure', 'Food & Culture', 'Hiking', 'Wildlife', 'Cultural', 'Road Trip', 'Spiritual', 'Island Life'];

export default function StoriesPage() {
  const featuredStories = travelStories.filter(story => story.featured);
  const recentStories = travelStories.filter(story => !story.featured);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920')] opacity-20 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500/20 text-sky-300 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              <span>Travel Stories</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Adventures & Experiences
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Authentic travel stories from around the world. Personal journeys, insider tips, and unforgettable moments that inspire wanderlust.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6 bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  category === 'All'
                    ? 'bg-sky-500 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">Featured Stories</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredStories.map((story, index) => (
              <Link
                key={story.slug}
                href={`/blog/${story.slug}`}
                className={`group ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <article className="relative h-full overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300">
                  <div className={`relative overflow-hidden ${index === 0 ? 'h-96 lg:h-full' : 'h-64'}`}>
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-sky-500 text-white text-xs font-semibold rounded-full">
                        {story.category}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className={`font-display font-bold mb-2 group-hover:text-sky-300 transition-colors ${index === 0 ? 'text-3xl' : 'text-xl'}`}>
                        {story.title}
                      </h3>
                      <p className={`text-slate-200 mb-4 ${index === 0 ? 'text-base' : 'text-sm line-clamp-2'}`}>
                        {story.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-slate-300">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {story.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {story.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Stories */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display text-3xl font-bold text-slate-900 mb-8">Recent Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentStories.map((story) => (
              <Link key={story.slug} href={`/blog/${story.slug}`} className="group">
                <article className="bg-slate-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300">
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 text-slate-700 text-xs font-semibold rounded-full">
                        {story.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-xl font-bold text-slate-900 mb-2 group-hover:text-sky-600 transition-colors">
                      {story.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-slate-500">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-orange-400 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                          {story.author.charAt(0)}
                        </div>
                        <span>{story.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(story.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-sky-500 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold mb-6">
            Share Your Story
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Have an amazing travel experience to share? We'd love to feature your story on Wanderlust.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-sky-600 rounded-full font-semibold hover:bg-slate-100 transition-colors"
          >
            Get in Touch
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
