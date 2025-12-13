'use client'

import { useEffect, useState } from 'react'
import { MapPin, Globe2, Camera, Award } from 'lucide-react'

interface Stat {
  id: string
  label: string
  value: number
  suffix: string
  icon: React.ElementType
  color: string
}

const stats: Stat[] = [
  {
    id: '1',
    label: 'Countries Explored',
    value: 87,
    suffix: '+',
    icon: MapPin,
    color: 'from-sky-500 to-blue-600',
  },
  {
    id: '2',
    label: 'Continents Covered',
    value: 6,
    suffix: '/7',
    icon: Globe2,
    color: 'from-orange-500 to-red-600',
  },
  {
    id: '3',
    label: 'Photos Captured',
    value: 15000,
    suffix: '+',
    icon: Camera,
    color: 'from-sky-500 to-cyan-600',
  },
  {
    id: '4',
    label: 'Travel Awards',
    value: 24,
    suffix: '+',
    icon: Award,
    color: 'from-orange-500 to-yellow-600',
  },
]

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }, [end, duration])

  return <span>{count.toLocaleString()}</span>
}

export default function TravelStats() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById('travel-stats')
    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [])

  return (
    <section
      id="travel-stats"
      className="py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]" />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Our Journey in Numbers
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Sharing our adventures and inspiring travelers worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.id}
                className="relative group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Card Background with Gradient Border */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500 via-orange-500 to-sky-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />

                <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 text-center hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Counter */}
                  <div className="mb-2">
                    <span className="font-display text-5xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                      {isVisible ? <AnimatedCounter end={stat.value} /> : '0'}
                    </span>
                    <span className="text-3xl font-bold text-slate-400">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <div className="text-slate-300 font-medium">
                    {stat.label}
                  </div>

                  {/* Decorative Line */}
                  <div className="mt-4 h-1 w-12 mx-auto bg-gradient-to-r from-transparent via-sky-500 to-transparent rounded-full" />
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <p className="text-slate-400 text-lg mb-6">
            Join over <span className="text-white font-bold">250,000</span> monthly readers exploring the world with us
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sky-400 font-semibold">4.9/5</span>
              <span className="text-slate-300 ml-2">Average Rating</span>
            </div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-orange-400 font-semibold">98%</span>
              <span className="text-slate-300 ml-2">Would Recommend</span>
            </div>
            <div className="px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sky-400 font-semibold">500+</span>
              <span className="text-slate-300 ml-2">Travel Stories</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
