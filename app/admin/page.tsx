'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Search, Compass, Globe, Eye, X, Save, Image as ImageIcon } from 'lucide-react'

interface Author {
  name: string
  avatar: string
  bio: string
}

interface Story {
  _id?: string
  title: string
  excerpt: string
  content: string
  destination: string
  country: string
  continent: string
  category: 'adventure' | 'beach' | 'city' | 'mountain' | 'cultural' | 'road-trip'
  featuredImage: string
  images: string[]
  author: Author
  readTime: number
  published: boolean
  tags: string[]
  createdAt?: string
  updatedAt?: string
}

interface Toast {
  id: number
  message: string
  type: 'success' | 'error'
}

const INITIAL_FORM_STATE: Story = {
  title: '',
  excerpt: '',
  content: '',
  destination: '',
  country: '',
  continent: '',
  category: 'adventure',
  featuredImage: '',
  images: [],
  author: {
    name: '',
    avatar: '',
    bio: ''
  },
  readTime: 5,
  published: false,
  tags: []
}

export default function AdminDashboard() {
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingStory, setEditingStory] = useState<Story | null>(null)
  const [formData, setFormData] = useState<Story>(INITIAL_FORM_STATE)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [tagInput, setTagInput] = useState('')
  const [imageInput, setImageInput] = useState('')

  useEffect(() => {
    fetchStories()
  }, [])

  const fetchStories = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/stories?all=true')
      const data = await response.json()
      if (data.success) {
        setStories(data.data)
      } else {
        showToast('Failed to fetch stories', 'error')
      }
    } catch (error) {
      console.error('Error fetching stories:', error)
      showToast('Error loading stories', 'error')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 4000)
  }

  const handleCreateNew = () => {
    setEditingStory(null)
    setFormData(INITIAL_FORM_STATE)
    setShowForm(true)
  }

  const handleEdit = (story: Story) => {
    setEditingStory(story)
    setFormData(story)
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingStory(null)
    setFormData(INITIAL_FORM_STATE)
    setTagInput('')
    setImageInput('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (name.startsWith('author.')) {
      const authorField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        author: {
          ...prev.author,
          [authorField]: value
        }
      }))
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseInt(value) || 0 }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }))
      setTagInput('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const handleAddImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageInput.trim()]
      }))
      setImageInput('')
    }
  }

  const handleRemoveImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img !== imageToRemove)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const url = editingStory ? `/api/stories/${editingStory._id}` : '/api/stories'
      const method = editingStory ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data.success) {
        showToast(
          editingStory ? 'Story updated successfully' : 'Story created successfully',
          'success'
        )
        await fetchStories()
        handleCloseForm()
      } else {
        showToast(data.error || 'Operation failed', 'error')
      }
    } catch (error) {
      console.error('Error saving story:', error)
      showToast('Error saving story', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return

    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: 'DELETE'
      })
      const data = await response.json()

      if (data.success) {
        showToast('Story deleted successfully', 'success')
        await fetchStories()
      } else {
        showToast(data.error || 'Failed to delete story', 'error')
      }
    } catch (error) {
      console.error('Error deleting story:', error)
      showToast('Error deleting story', 'error')
    }
  }

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const stats = {
    total: stories.length,
    published: stories.filter(s => s.published).length,
    draft: stories.filter(s => !s.published).length
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`px-4 py-3 rounded-lg shadow-lg border flex items-center gap-3 animate-slide-in ${
              toast.type === 'success'
                ? 'bg-green-900 border-green-700 text-green-100'
                : 'bg-red-900 border-red-700 text-red-100'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              className="hover:opacity-70"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-slate-800 shadow-lg border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Compass className="w-8 h-8 text-sky-400" />
              <h1 className="text-2xl font-bold text-white">Travel Stories Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="/"
                className="text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
              >
                <Eye className="w-4 h-4" />
                View Site
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Actions Section */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleCreateNew}
              className="bg-sky-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-sky-600 transition-colors font-medium shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Create Post
            </button>
            <button
              onClick={() => showToast('Edit Blog feature coming soon', 'success')}
              className="bg-slate-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-slate-600 transition-colors font-medium shadow-lg"
            >
              <Edit className="w-5 h-5" />
              Edit Blog
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete the entire blog? This action cannot be undone.')) {
                  showToast('Delete Blog feature coming soon', 'error')
                }
              }}
              className="bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors font-medium shadow-lg"
            >
              <Trash2 className="w-5 h-5" />
              Delete Blog
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Total Stories</p>
                <p className="text-3xl font-bold text-white">{stats.total}</p>
              </div>
              <Globe className="w-12 h-12 text-sky-400 opacity-50" />
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Published</p>
                <p className="text-3xl font-bold text-green-400">{stats.published}</p>
              </div>
              <Eye className="w-12 h-12 text-green-400 opacity-50" />
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400 mb-1">Drafts</p>
                <p className="text-3xl font-bold text-orange-400">{stats.draft}</p>
              </div>
              <Edit className="w-12 h-12 text-orange-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Inline Create/Edit Form */}
        {showForm && (
          <div className="bg-slate-800 rounded-lg shadow-lg mb-8 border border-sky-500 animate-slide-down">
            <div className="p-6 border-b border-slate-700 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Save className="w-5 h-5 text-sky-400" />
                {editingStory ? 'Edit Story' : 'Create New Story'}
              </h2>
              <button
                onClick={handleCloseForm}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter story title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Destination *
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="e.g., Santorini"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="e.g., Greece"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Continent *
                  </label>
                  <input
                    type="text"
                    name="continent"
                    value={formData.continent}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="e.g., Europe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  >
                    <option value="adventure">Adventure</option>
                    <option value="beach">Beach</option>
                    <option value="city">City</option>
                    <option value="mountain">Mountain</option>
                    <option value="cultural">Cultural</option>
                    <option value="road-trip">Road Trip</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Read Time (minutes) *
                  </label>
                  <input
                    type="number"
                    name="readTime"
                    value={formData.readTime}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="5"
                  />
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Excerpt *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={2}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Brief description of the story"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Content *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={8}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Write your travel story here..."
                />
              </div>

              {/* Featured Image */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Featured Image URL *
                </label>
                <input
                  type="url"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Gallery Images */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Gallery Images
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddImage())}
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter image URL and press Add"
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    <ImageIcon className="w-4 h-4" />
                  </button>
                </div>
                {formData.images.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="bg-slate-700 px-3 py-1 rounded-lg text-sm text-slate-300 flex items-center gap-2"
                      >
                        <span className="max-w-xs truncate">{image}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(image)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Author Information */}
              <div className="border-t border-slate-700 pt-6">
                <h3 className="text-lg font-semibold text-white mb-4">Author Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      name="author.name"
                      value={formData.author.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Author Avatar URL *
                    </label>
                    <input
                      type="url"
                      name="author.avatar"
                      value={formData.author.avatar}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="https://example.com/avatar.jpg"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Author Bio *
                    </label>
                    <input
                      type="text"
                      name="author.bio"
                      value={formData.author.bio}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      placeholder="Travel enthusiast"
                    />
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter tag and press Add"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="bg-sky-900 px-3 py-1 rounded-lg text-sm text-sky-300 flex items-center gap-2"
                      >
                        <span>#{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-sky-400 hover:text-sky-300"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Published Status */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="published"
                  name="published"
                  checked={formData.published}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-sky-500 bg-slate-700 border-slate-600 rounded focus:ring-sky-500"
                />
                <label htmlFor="published" className="text-sm font-medium text-slate-300">
                  Publish this story
                </label>
              </div>

              {/* Form Actions */}
              <div className="flex gap-4 pt-4 border-t border-slate-700">
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {submitting ? 'Saving...' : editingStory ? 'Update Story' : 'Create Story'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Search & List View */}
        <div className="bg-slate-800 rounded-lg shadow-lg border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search stories by title, destination, country, category, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>
          </div>

          {/* Stories List */}
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
              <p className="text-slate-400 mt-4">Loading stories...</p>
            </div>
          ) : filteredStories.length === 0 ? (
            <div className="p-12 text-center">
              <Compass className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 mb-4">
                {searchQuery ? 'No stories found matching your search' : 'No stories yet'}
              </p>
              {!searchQuery && (
                <button
                  onClick={handleCreateNew}
                  className="text-sky-400 hover:text-sky-300 font-medium"
                >
                  Create your first story
                </button>
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {filteredStories.map((story) => (
                <div
                  key={story._id}
                  className="p-6 hover:bg-slate-750 transition-colors"
                >
                  <div className="flex gap-6">
                    {/* Featured Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={story.featuredImage}
                        alt={story.title}
                        className="w-32 h-32 object-cover rounded-lg border border-slate-600"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1">{story.title}</h3>
                          <p className="text-sm text-slate-400 mb-2">{story.excerpt}</p>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEdit(story)}
                            className="p-2 text-sky-400 hover:text-sky-300 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(story._id!, story.title)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-slate-700 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm">
                        <span className="flex items-center text-slate-400">
                          <Globe className="w-3 h-3 mr-1 text-sky-400" />
                          {story.destination}, {story.country}
                        </span>
                        <span className="flex items-center text-slate-400">
                          <Compass className="w-3 h-3 mr-1 text-sky-400" />
                          {story.continent}
                        </span>
                        <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded-full text-xs font-medium">
                          {story.category}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          story.published
                            ? 'bg-green-900 text-green-300'
                            : 'bg-orange-900 text-orange-300'
                        }`}>
                          {story.published ? 'Published' : 'Draft'}
                        </span>
                        <span className="text-slate-400">{story.readTime} min read</span>
                      </div>

                      {story.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {story.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs text-sky-400 bg-sky-900/30 px-2 py-1 rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2 mt-3 text-sm text-slate-400">
                        <img
                          src={story.author.avatar}
                          alt={story.author.name}
                          className="w-6 h-6 rounded-full"
                        />
                        <span>{story.author.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }

        .bg-slate-750 {
          background-color: rgb(30, 41, 59);
        }
      `}</style>
    </div>
  )
}
