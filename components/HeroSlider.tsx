'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'

const heroSlides = [
  {
    id: 1,
    title: 'Discover the Northern Lights',
    subtitle: 'Iceland',
    description: 'Witness nature\'s most spectacular light show dancing across the Arctic sky',
    image: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=1920&h=1080&fit=crop',
    location: 'Reykjavik, Iceland',
  },
  {
    id: 2,
    title: 'Explore Ancient Temples',
    subtitle: 'Cambodia',
    description: 'Step back in time at the majestic temples of Angkor Wat',
    image: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=1920&h=1080&fit=crop',
    location: 'Siem Reap, Cambodia',
  },
  {
    id: 3,
    title: 'Safari Adventures Await',
    subtitle: 'Tanzania',
    description: 'Experience the great migration and witness Africa\'s incredible wildlife',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&h=1080&fit=crop',
    location: 'Serengeti, Tanzania',
  },
  {
    id: 4,
    title: 'Mountain Paradise',
    subtitle: 'Switzerland',
    description: 'Breathe in the alpine air surrounded by snow-capped peaks',
    image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1920&h=1080&fit=crop',
    location: 'Zermatt, Switzerland',
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover filter-wanderlust"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 hero-gradient" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-4xl mx-auto px-6 text-center text-white">
              {/* Location Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 border border-white/30 animate-slide-down">
                <MapPin className="w-4 h-4" />
                <span>{slide.location}</span>
              </div>

              {/* Subtitle */}
              <div className="text-sky-300 text-lg md:text-xl font-semibold mb-4 tracking-wider uppercase animate-fade-in">
                {slide.subtitle}
              </div>

              {/* Title */}
              <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 hero-text-shadow animate-slide-up">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in">
                {slide.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                <button className="px-8 py-4 bg-white hover:bg-sky-500 text-slate-900 hover:text-white rounded-full font-semibold transition-all duration-300 shadow-2xl hover:shadow-sky-500/50 hover:scale-105">
                  Explore This Destination
                </button>
                <button className="px-8 py-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white rounded-full font-semibold transition-all duration-300 border-2 border-white/50 hover:border-white">
                  View All Adventures
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/30 hover:scale-110 z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all duration-300 border border-white/30 hover:scale-110 z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:block">
        <div className="flex flex-col items-center gap-2 text-white/80 animate-bounce">
          <span className="text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-white/80 rounded-full" />
          </div>
        </div>
      </div>

      {/* Side Social Links */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-10">
        {['IG', 'FB', 'TW'].map((social) => (
          <a
            key={social}
            href="#"
            className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-300 border border-white/30 hover:scale-110"
          >
            {social}
          </a>
        ))}
      </div>
    </section>
  )
}
