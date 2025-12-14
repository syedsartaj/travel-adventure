import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { getSmakslyBlogs, formatBlogDate, estimateReadTime } from '@/lib/smaksly-blogs';

// Force dynamic rendering
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  // Fetch blogs from Smaksly database
  const smakslyBlogs = await getSmakslyBlogs()

  // Transform SmakslyBlog to match the component's expected format
  const travelStories = smakslyBlogs.map(blog => ({
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.body.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
    location: blog.category || 'Adventure Destination',
    date: formatBlogDate(blog.publish_date),
    image: blog.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop',
    readTime: estimateReadTime(blog.body)
  }))
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[60vh] bg-gradient-to-br from-sky-500 to-orange-400">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Travel Stories
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
                Adventures from around the world, tips for curious travelers, and stories that inspire wanderlust
              </p>
            </div>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            {travelStories.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {travelStories.map((story) => (
                  <Link
                    key={story.slug}
                    href={`/blog/${story.slug}`}
                    className="group cursor-pointer"
                  >
                    <article className="h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={story.image}
                          alt={story.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-sky-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            {story.location}
                          </span>
                          <span>{story.date}</span>
                        </div>
                        <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-sky-500 transition-colors">
                          {story.title}
                        </h2>
                        <p className="text-gray-600 mb-4 flex-grow">
                          {story.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{story.readTime}</span>
                          <span className="text-sky-500 font-semibold group-hover:gap-2 flex items-center gap-1 transition-all">
                            Read More
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">No Travel Stories Yet</h2>
                <p className="text-xl text-gray-600">Check back soon for amazing travel adventures!</p>
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-sky-500 to-orange-400">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Never Miss an Adventure
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get travel tips, destination guides, and inspiring stories delivered to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-white/50"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
