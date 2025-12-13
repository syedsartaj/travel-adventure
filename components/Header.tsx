'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Compass, MapPin, Camera, BookOpen, Mail, Search } from 'lucide-react'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Destinations', href: '/destinations', icon: MapPin },
    { name: 'Stories', href: '/stories', icon: BookOpen },
    { name: 'Gallery', href: '/gallery', icon: Camera },
    { name: 'About', href: '/about', icon: Compass },
    { name: 'Contact', href: '/contact', icon: Mail },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isScrolled
                ? 'bg-gradient-to-br from-sky-500 to-orange-500'
                : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Compass className="w-6 h-6 text-white transform group-hover:rotate-180 transition-transform duration-500" />
            </div>
            <span className={`font-display text-2xl font-bold tracking-tight transition-colors ${
              isScrolled ? 'text-slate-900' : 'text-white hero-text-shadow'
            }`}>
              WANDERLUST
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-2 font-medium transition-all duration-300 group ${
                    isScrolled
                      ? 'text-slate-700 hover:text-sky-600'
                      : 'text-white hover:text-sky-300 hero-text-shadow'
                  }`}
                >
                  <Icon className="w-4 h-4 transform group-hover:scale-110 transition-transform" />
                  <span>{item.name}</span>
                </a>
              )
            })}

            {/* Search Icon */}
            <button
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled
                  ? 'hover:bg-slate-100 text-slate-700'
                  : 'hover:bg-white/20 text-white'
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* CTA Button */}
            <button className="px-6 py-2.5 bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Start Exploring
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              isScrolled
                ? 'text-slate-900 hover:bg-slate-100'
                : 'text-white hover:bg-white/20'
            }`}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 py-6 bg-white rounded-2xl shadow-2xl animate-slide-down">
            <div className="flex flex-col gap-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-6 py-3 text-slate-700 hover:bg-sky-50 hover:text-sky-600 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                )
              })}

              <div className="px-6 py-3">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-sky-500 to-orange-500 hover:from-sky-600 hover:to-orange-600 text-white rounded-full font-semibold transition-all duration-300 shadow-lg">
                  Start Exploring
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
