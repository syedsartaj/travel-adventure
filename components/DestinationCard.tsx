'use client'

import { MapPin, Users, Calendar, ArrowRight } from 'lucide-react'

interface Destination {
  id: string
  title: string
  country: string
  flag: string
  description: string
  image: string
  category: string
  visitorsCount: number
  bestTime: string
}

interface DestinationCardProps {
  destination: Destination
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <article className="destination-card aspect-destination group">
      {/* Image */}
      <img
        src={destination.image}
        alt={destination.title}
        className="destination-card-image filter-wanderlust"
      />

      {/* Gradient Overlay */}
      <div className="destination-card-overlay" />

      {/* Content */}
      <div className="destination-card-content">
        {/* Category Badge */}
        <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/30">
            {destination.category}
          </span>
        </div>

        {/* Title with Flag */}
        <div className="flex items-start gap-3 mb-2">
          <span className="flag-emoji text-3xl">{destination.flag}</span>
          <div className="flex-1">
            <h3 className="font-display text-2xl font-bold mb-1 group-hover:text-sky-300 transition-colors">
              {destination.title}
            </h3>
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <MapPin className="w-4 h-4" />
              <span>{destination.country}</span>
            </div>
          </div>
        </div>

        {/* Description - Visible on hover */}
        <p className="text-white/90 text-sm leading-relaxed mb-4 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-300">
          {destination.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-white/80 text-xs mb-4">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{destination.visitorsCount.toLocaleString()}+ visitors</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{destination.bestTime}</span>
          </div>
        </div>

        {/* CTA Button - Visible on hover */}
        <button className="w-full px-6 py-3 bg-white hover:bg-sky-500 text-slate-900 hover:text-white rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
          Explore Destination
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Corner Accent */}
      <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-sky-500 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
        <MapPin className="w-6 h-6 text-white" />
      </div>
    </article>
  )
}
