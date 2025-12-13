import { Compass, MapPin, Instagram, Facebook, Twitter, Youtube, Mail, Phone } from 'lucide-react'

export default function Footer() {
  const popularDestinations = [
    { name: 'Bali, Indonesia', flag: '🇮🇩' },
    { name: 'Paris, France', flag: '🇫🇷' },
    { name: 'Tokyo, Japan', flag: '🇯🇵' },
    { name: 'New York, USA', flag: '🇺🇸' },
    { name: 'Barcelona, Spain', flag: '🇪🇸' },
    { name: 'Dubai, UAE', flag: '🇦🇪' },
  ]

  const travelResources = [
    'Travel Guides',
    'Packing Lists',
    'Budget Tips',
    'Safety Advice',
    'Visa Information',
    'Travel Insurance',
  ]

  const company = [
    'About Us',
    'Our Story',
    'Team',
    'Careers',
    'Press',
    'Contact',
  ]

  const socialLinks = [
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
  ]

  return (
    <footer className="bg-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-orange-500 rounded-full flex items-center justify-center">
                <Compass className="w-7 h-7 text-white" />
              </div>
              <span className="font-display text-2xl font-bold">WANDERLUST</span>
            </div>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Inspiring travelers to explore the world, one adventure at a time. Discover hidden gems and create unforgettable memories.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className={`w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center transition-all duration-300 ${social.color}`}
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Popular Destinations */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-sky-400" />
              Popular Destinations
            </h3>
            <ul className="space-y-3">
              {popularDestinations.map((destination) => (
                <li key={destination.name}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="flag-emoji">{destination.flag}</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      {destination.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Resources */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">
              Travel Resources
            </h3>
            <ul className="space-y-3">
              {travelResources.map((resource) => (
                <li key={resource}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Newsletter */}
          <div>
            <h3 className="font-display text-lg font-bold mb-6">
              Company
            </h3>
            <ul className="space-y-3 mb-8">
              {company.map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:hello@wanderlust.com"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-400" />
                <span>hello@wanderlust.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>+1 (234) 567-890</span>
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-slate-800 pt-12 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl font-bold mb-3">
              Get Travel Inspiration Weekly
            </h3>
            <p className="text-slate-400 mb-6">
              Subscribe to our newsletter for destination guides, travel tips, and exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 rounded-full font-semibold transition-all duration-300 whitespace-nowrap shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>
              &copy; {new Date().getFullYear()} Wanderlust. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-sky-500 via-orange-500 to-sky-500" />
    </footer>
  )
}
