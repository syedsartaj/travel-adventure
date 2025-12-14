'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Edit, Trash2, Search, Globe, Eye, MapPin, BookOpen } from 'lucide-react'

interface Story {
  _id: string
  title: string
  slug: string
  excerpt: string
  category: string
  coverImage: string
  destination: string
  readTime: number
  published: boolean
  featured: boolean
  views: number
  createdAt: string
}

export default function AdminDashboard() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'stories' | 'destinations'>('stories')

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      const response = await fetch('/api/stories?all=true')
      const data = await response.json()
      if (data.success) {
        setStories(data.data)
      }
    } catch (error) {
      console.error('Error fetching stories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this story?')) return

    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()
      if (data.success) {
        setStories(stories.filter(s => s._id !== id))
      }
    } catch (error) {
      console.error('Error deleting story:', error)
    }
  }

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.destination.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const stats = {
    total: stories.length,
    published: stories.filter(s => s.published).length,
    featured: stories.filter(s => s.featured).length,
    totalViews: stories.reduce((sum, s) => sum + (s.views || 0), 0)
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-sky-400" />
              <h1 className="text-2xl font-bold text-white">Wanderlust Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-slate-300 hover:text-white flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Site
              </Link>
              <Link
                href="/admin/stories/new"
                className="bg-sky-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-sky-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Story
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
            <p className="text-sm text-slate-400">Total Stories</p>
            <p className="text-2xl font-bold text-white">{stats.total}</p>
          </div>
          <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
            <p className="text-sm text-slate-400">Published</p>
            <p className="text-2xl font-bold text-green-400">{stats.published}</p>
          </div>
          <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
            <p className="text-sm text-slate-400">Featured</p>
            <p className="text-2xl font-bold text-orange-400">{stats.featured}</p>
          </div>
          <div className="bg-slate-800 rounded-lg shadow-lg p-4 border border-slate-700">
            <p className="text-sm text-slate-400">Total Views</p>
            <p className="text-2xl font-bold text-sky-400">{stats.totalViews.toLocaleString()}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab('stories')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'stories'
                ? 'bg-sky-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            Stories
          </button>
          <button
            onClick={() => setActiveTab('destinations')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'destinations'
                ? 'bg-sky-500 text-white'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Destinations
          </button>
        </div>

        {/* Search */}
        <div className="bg-slate-800 rounded-lg shadow-lg mb-6 border border-slate-700">
          <div className="p-4 border-b border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          {/* Stories Table */}
          {loading ? (
            <div className="p-8 text-center text-slate-400">Loading stories...</div>
          ) : filteredStories.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-slate-400 mb-4">No stories found</p>
              <Link
                href="/admin/stories/new"
                className="text-sky-400 hover:text-sky-300"
              >
                Create your first story
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-750">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Story
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Views
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredStories.map((story) => (
                    <tr key={story._id} className="hover:bg-slate-750">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img
                            src={story.coverImage}
                            alt={story.title}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {story.title}
                            </div>
                            <div className="text-sm text-slate-400">
                              {story.readTime} min read
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-slate-300">
                          <MapPin className="w-4 h-4 mr-1 text-sky-400" />
                          {story.destination}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-slate-700 text-slate-300">
                          {story.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full inline-block w-fit ${
                            story.published ? 'bg-green-900 text-green-300' : 'bg-yellow-900 text-yellow-300'
                          }`}>
                            {story.published ? 'Published' : 'Draft'}
                          </span>
                          {story.featured && (
                            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-orange-900 text-orange-300 inline-block w-fit">
                              Featured
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                        {(story.views || 0).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link
                          href={`/admin/stories/${story._id}`}
                          className="text-sky-400 hover:text-sky-300 mr-4"
                        >
                          <Edit className="w-4 h-4 inline" />
                        </Link>
                        <button
                          onClick={() => handleDelete(story._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
