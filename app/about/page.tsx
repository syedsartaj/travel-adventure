import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';

export default function AboutPage() {
  const travelStats = [
    { number: '67', label: 'Countries Visited' },
    { number: '5', label: 'Continents Explored' },
    { number: '200+', label: 'Blog Posts Written' },
    { number: '10', label: 'Years Traveling' }
  ];

  const bucketList = [
    { destination: 'Antarctica', status: 'planned', continent: 'Antarctica' },
    { destination: 'Bhutan', status: 'planned', continent: 'Asia' },
    { destination: 'Madagascar', status: 'wishlist', continent: 'Africa' },
    { destination: 'Faroe Islands', status: 'planned', continent: 'Europe' },
    { destination: 'Galapagos Islands', status: 'wishlist', continent: 'Americas' },
    { destination: 'Trans-Siberian Railway', status: 'planned', continent: 'Asia' },
    { destination: 'Northern Lights in Finland', status: 'completed', continent: 'Europe' },
    { destination: 'Machu Picchu', status: 'completed', continent: 'Americas' },
    { destination: 'Safari in Tanzania', status: 'completed', continent: 'Africa' },
    { destination: 'Great Barrier Reef', status: 'completed', continent: 'Oceania' }
  ];

  const travelPhilosophy = [
    {
      title: 'Slow Travel',
      description: 'I believe in spending quality time in each destination, immersing myself in local culture rather than rushing from place to place.',
      icon: '🐌'
    },
    {
      title: 'Sustainable Tourism',
      description: 'Every journey should leave a positive impact. I support local businesses, minimize my environmental footprint, and respect local cultures.',
      icon: '🌱'
    },
    {
      title: 'Connection Over Collection',
      description: 'Travel is about the people you meet and the experiences you share, not just the stamps in your passport.',
      icon: '❤️'
    },
    {
      title: 'Embrace the Unexpected',
      description: 'The best stories come from unplanned moments. I leave room for spontaneity and welcome the unknown.',
      icon: '✨'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[70vh]">
          <Image
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=2000&h=1200&fit=crop"
            alt="Traveler on mountain peak"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl mx-auto text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                About the Wanderer
              </h1>
              <p className="text-xl md:text-2xl text-white/90">
                Exploring the world one adventure at a time
              </p>
            </div>
          </div>
        </section>

        {/* Bio Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[500px] rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop"
                  alt="Portrait"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6 text-gray-900">
                  Hi, I'm Alex
                </h2>
                <div className="space-y-4 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Ten years ago, I quit my corporate job, sold most of my possessions, and bought a one-way ticket to Thailand. That decision changed my life forever.
                  </p>
                  <p>
                    What started as a six-month sabbatical turned into a decade-long journey across 67 countries. I've slept in desert camps under starlit skies, trekked through remote mountain villages, dove with sharks, and shared meals with families who spoke languages I couldn't understand but whose warmth transcended all barriers.
                  </p>
                  <p>
                    Through this blog, I share the stories, tips, and insights I've gathered along the way. My goal is to inspire you to step out of your comfort zone, embrace the unknown, and discover that the world is far more welcoming than you might think.
                  </p>
                  <p>
                    When I'm not on the road, you'll find me planning the next adventure, learning a new language, or experimenting with recipes from my travels in my tiny apartment kitchen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Travel Stats */}
        <section className="py-20 bg-gradient-to-br from-sky-500 to-orange-400">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center text-white mb-16">
              Travel by Numbers
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {travelStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-xl text-white/90">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Travel Philosophy */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
              My Travel Philosophy
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {travelPhilosophy.map((item, index) => (
                <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bucket List */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
              Ultimate Travel Bucket List
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Adventures completed, planned, and dreamed about
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bucketList.map((item, index) => (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-2 ${
                    item.status === 'completed'
                      ? 'bg-green-50 border-green-500'
                      : item.status === 'planned'
                      ? 'bg-sky-50 border-sky-500'
                      : 'bg-orange-50 border-orange-500'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {item.destination}
                    </h3>
                    {item.status === 'completed' && (
                      <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-600">{item.continent}</span>
                    <span className="text-gray-400">•</span>
                    <span className={`font-semibold ${
                      item.status === 'completed'
                        ? 'text-green-600'
                        : item.status === 'planned'
                        ? 'text-sky-600'
                        : 'text-orange-600'
                    }`}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-sky-500 to-orange-400">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Let's Connect
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Have a travel question? Want to collaborate? I'd love to hear from you!
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-sky-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
