import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

const destinations = [
  {
    slug: 'europe',
    name: 'Europe',
    description: 'Ancient cities, medieval castles, and diverse cultures across a historic continent',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1200&h=800&fit=crop',
    countriesCount: 23,
    highlights: ['Historic architecture', 'World-class cuisine', 'Art and culture', 'Efficient rail travel']
  },
  {
    slug: 'asia',
    name: 'Asia',
    description: 'Spiritual temples, bustling megacities, and breathtaking natural wonders',
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&h=800&fit=crop',
    countriesCount: 18,
    highlights: ['Ancient traditions', 'Incredible food scenes', 'Budget-friendly', 'Diverse landscapes']
  },
  {
    slug: 'americas',
    name: 'Americas',
    description: 'From Arctic tundra to Amazon rainforest, a continent of extremes',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=1200&h=800&fit=crop',
    countriesCount: 15,
    highlights: ['Natural wonders', 'Vibrant cultures', 'Adventure sports', 'Wildlife encounters']
  },
  {
    slug: 'africa',
    name: 'Africa',
    description: 'Safari adventures, ancient civilizations, and untamed wilderness',
    image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop',
    countriesCount: 8,
    highlights: ['Wildlife safaris', 'Desert landscapes', 'Rich history', 'Warm hospitality']
  },
  {
    slug: 'oceania',
    name: 'Oceania',
    description: 'Pristine beaches, unique wildlife, and island paradise escapes',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=1200&h=800&fit=crop',
    countriesCount: 3,
    highlights: ['Great Barrier Reef', 'Maori culture', 'Remote islands', 'Adventure activities']
  }
];

const travelTips = [
  {
    icon: '🎒',
    title: 'Pack Light',
    description: 'One carry-on is all you need for most trips'
  },
  {
    icon: '💰',
    title: 'Budget Wisely',
    description: 'Use local transportation and eat where locals eat'
  },
  {
    icon: '🗺️',
    title: 'Plan Flexibly',
    description: 'Leave room for spontaneous adventures'
  },
  {
    icon: '📱',
    title: 'Stay Connected',
    description: 'Get local SIM cards or international data plans'
  }
];

export default function DestinationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[70vh] bg-gradient-to-br from-sky-500 to-orange-400">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Explore the World
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
                Comprehensive travel guides, insider tips, and practical advice for your next adventure across five continents
              </p>
            </div>
          </div>
        </section>

        {/* Destinations Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">
                Choose Your Destination
              </h2>
              <p className="text-xl text-gray-600">
                Click on a continent to discover detailed guides, best times to visit, and budget tips
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/destinations/${destination.slug}`}
                  className="group cursor-pointer"
                >
                  <article className="h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={destination.image}
                        alt={destination.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                        {destination.countriesCount} Countries
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <h2 className="text-3xl font-bold mb-3 text-gray-900 group-hover:text-sky-500 transition-colors">
                        {destination.name}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {destination.description}
                      </p>
                      <div className="mt-auto">
                        <h3 className="text-sm font-semibold text-gray-900 mb-3">Highlights:</h3>
                        <div className="flex flex-wrap gap-2">
                          {destination.highlights.map((highlight, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm"
                            >
                              {highlight}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="mt-6 flex items-center gap-2 text-sky-500 font-semibold group-hover:gap-3 transition-all">
                        Explore {destination.name}
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Travel Tips */}
        <section className="py-20 bg-gradient-to-br from-sky-50 to-orange-50 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
              Essential Travel Tips
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {travelTips.map((tip, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow"
                >
                  <div className="text-5xl mb-4">{tip.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {tip.title}
                  </h3>
                  <p className="text-gray-600">
                    {tip.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-sky-500 to-orange-400">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
              <div>
                <div className="text-5xl font-bold mb-2">67</div>
                <div className="text-lg text-white/90">Countries Covered</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">200+</div>
                <div className="text-lg text-white/90">Detailed Guides</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">5</div>
                <div className="text-lg text-white/90">Continents</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-lg text-white/90">Travel Tips</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-gray-900">
              Can't Decide Where to Go?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Check out my blog for travel stories and inspiration from around the world
            </p>
            <Link
              href="/blog"
              className="inline-block px-8 py-4 bg-gradient-to-r from-sky-500 to-orange-400 text-white rounded-lg font-semibold text-lg hover:from-sky-600 hover:to-orange-500 transition-all transform hover:scale-105"
            >
              Read Travel Stories
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
