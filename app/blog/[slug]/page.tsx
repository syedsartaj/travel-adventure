import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

// This would typically come from a database or CMS
const getStoryBySlug = (slug: string) => {
  const stories: Record<string, any> = {
    'discovering-kyoto-temples': {
      title: 'Discovering the Hidden Temples of Kyoto',
      location: 'Kyoto, Japan',
      date: 'March 2024',
      tripDuration: '7 Days',
      heroImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=2000&h=1200&fit=crop',
      content: `
        <p>Kyoto, the ancient capital of Japan, holds over 2,000 temples and shrines within its boundaries. But beyond the famous Golden Pavilion and Fushimi Inari, there exists a world of hidden sanctuaries that few tourists ever discover.</p>

        <h2>Day 1-2: Arriving in the Ancient Capital</h2>
        <p>My journey began in the Higashiyama district, where narrow lanes wind between traditional machiya houses. The early morning mist created an ethereal atmosphere as I walked towards my first discovery: Honen-in Temple.</p>

        <h2>The Magic of Honen-in</h2>
        <p>Tucked away beneath a canopy of maple trees, Honen-in Temple remains blissfully quiet even during peak season. The thatched gate, moss-covered grounds, and sand garden create a meditative space that embodies the essence of wabi-sabi.</p>

        <h2>Days 3-4: Tea Ceremonies and Zen Gardens</h2>
        <p>I spent my middle days learning the art of tea ceremony at a small school near Ginkaku-ji. The precision, grace, and mindfulness of each movement taught me more about Japanese culture than any guidebook could.</p>

        <h2>Days 5-7: Off the Beaten Path</h2>
        <p>The final days took me to Ohara, a rural area north of the city. Here, temples like Sanzen-in and Jakko-in offer peaceful gardens and the sound of mountain streams, a world away from the tourist crowds.</p>
      `,
      gallery: [
        'https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=600&fit=crop'
      ],
      itinerary: [
        { day: 'Day 1', activities: 'Arrival in Kyoto, Explore Higashiyama, Visit Honen-in Temple' },
        { day: 'Day 2', activities: 'Philosopher\'s Path walk, Ginkaku-ji, Hidden cafes' },
        { day: 'Day 3', activities: 'Tea ceremony lesson, Nanzen-ji Temple, Keage Incline' },
        { day: 'Day 4', activities: 'Arashiyama Bamboo Grove, Tenryu-ji, Monkey Park' },
        { day: 'Day 5', activities: 'Day trip to Ohara, Sanzen-in Temple' },
        { day: 'Day 6', activities: 'Fushimi Sake district, Fushimi Inari early morning' },
        { day: 'Day 7', activities: 'Nishiki Market, Last temple visits, Departure' }
      ],
      tips: [
        'Visit temples early morning (before 8 AM) to avoid crowds',
        'Rent a bicycle - Kyoto is very bike-friendly',
        'Buy a Kyoto bus pass for unlimited travel',
        'Learn basic Japanese phrases - locals appreciate the effort',
        'Stay in a traditional ryokan for the full experience',
        'Try kaiseki (traditional multi-course) dining at least once',
        'Visit during autumn or spring for the best weather and scenery'
      ],
      budget: {
        accommodation: '$80-150/night (ryokan or boutique hotel)',
        food: '$30-60/day',
        transportation: '$10/day (bus pass)',
        activities: '$20-40/day (temple entries)',
        total: 'Approximately $1,000-1,500 for 7 days'
      }
    }
  };

  return stories[slug] || null;
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(params.slug);

  if (!story) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Story Not Found</h1>
            <Link href="/blog" className="text-sky-500 hover:underline">
              Return to Travel Stories
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Image */}
        <div className="relative h-[80vh] w-full">
          <Image
            src={story.heroImage}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-4xl mx-auto text-white">
              <div className="flex flex-wrap gap-4 mb-4 text-sm">
                <span className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {story.location}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {story.date}
                </span>
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  {story.tripDuration}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {story.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <article className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div
              className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6"
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
          </div>
        </article>

        {/* Photo Gallery */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Photo Gallery</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {story.gallery.map((image: string, index: number) => (
                <div key={index} className="relative h-80 overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={image}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Itinerary */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Trip Itinerary</h2>
            <div className="space-y-4">
              {story.itinerary.map((item: any, index: number) => (
                <div key={index} className="flex gap-6 p-6 bg-white rounded-lg shadow-md border-l-4 border-sky-500">
                  <div className="font-bold text-sky-500 min-w-[80px]">
                    {item.day}
                  </div>
                  <div className="text-gray-700">
                    {item.activities}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Travel Tips */}
        <section className="py-16 bg-gradient-to-br from-sky-50 to-orange-50 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8">Travel Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {story.tips.map((tip: string, index: number) => (
                <div key={index} className="flex gap-3 p-4 bg-white rounded-lg shadow">
                  <div className="text-orange-500 mt-1">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 bg-white rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Budget Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-700">Accommodation:</span>
                  <span className="font-semibold">{story.budget.accommodation}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-700">Food:</span>
                  <span className="font-semibold">{story.budget.food}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-700">Transportation:</span>
                  <span className="font-semibold">{story.budget.transportation}</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-700">Activities:</span>
                  <span className="font-semibold">{story.budget.activities}</span>
                </div>
                <div className="flex justify-between pt-4 text-lg">
                  <span className="font-bold">Total Estimate:</span>
                  <span className="font-bold text-sky-500">{story.budget.total}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Back to Blog */}
        <section className="py-16 px-4 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 text-white rounded-lg font-semibold hover:bg-sky-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to All Stories
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
