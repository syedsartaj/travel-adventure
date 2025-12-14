'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Save, ArrowLeft, Plus, X, MapPin } from 'lucide-react'
import Link from 'next/link'

interface StoryFormData {
  title: string
  slug: string
  excerpt: string
  content: string
  author: {
    name: string
    avatar: string
    bio: string
  }
  destination: string
  coverImage: string
  images: string[]
  category: string
  tags: string[]
  readTime: number
  publishedAt: string
  published: boolean
  featured: boolean
}

interface StoryFormProps {
  initialData?: StoryFormData & { _id?: string }
  isEdit?: boolean
}

const categories = [
  'Adventure', 'Food & Culture', 'Hiking', 'Wildlife', 'Cultural',
  'Road Trip', 'Spiritual', 'Island Life', 'Beach', 'City', 'Mountains'
]

const defaultFormData: StoryFormData = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  author: {
    name: '',
    avatar: '',
    bio: ''
  },
  destination: '',
  coverImage: '',
  images: [],
  category: 'Adventure',
  tags: [],
  readTime: 5,
  publishedAt: new Date().toISOString().split('T')[0],
  published: false,
  featured: false
}

export default function StoryForm({ initialData, isEdit = false }: StoryFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState<StoryFormData>(initialData || defaultFormData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [tagInput, setTagInput] = useState('')
  const [imageInput, setImageInput] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleAuthorChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      author: { ...prev.author, [field]: value }
    }))
  }

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setFormData(prev => ({ ...prev, slug }))
  }

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  const addImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput.trim())) {
      setFormData(prev => ({ ...prev, images: [...prev.images, imageInput.trim()] }))
      setImageInput('')
    }
  }

  const removeImage = (image: string) => {
    setFormData(prev => ({ ...prev, images: prev.images.filter(i => i !== image) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const url = isEdit && initialData?._id
        ? `/api/stories/${initialData._id}`
        : '/api/stories'

      const method = isEdit ? 'PUT' : 'POST'

      const submitData = {
        ...formData,
        readTime: Number(formData.readTime),
        publishedAt: new Date(formData.publishedAt).toISOString()
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })

      const data = await response.json()

      if (data.success) {
        router.push('/admin')
        router.refresh()
      } else {
        setError(data.error || 'Failed to save story')
      }
    } catch (err) {
      setError('An error occurred while saving the story')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="p-2 hover:bg-slate-700 rounded-lg transition-colors text-slate-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {isEdit ? 'Edit Story' : 'New Story'}
          </h1>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-sky-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-sky-600 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          {loading ? 'Saving...' : 'Save Story'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-6 border border-red-800">
          {error}
        </div>
      )}

      <div className="space-y-8">
        {/* Basic Info */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 text-white">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                onBlur={() => !formData.slug && generateSlug()}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Chasing Northern Lights in Lapland"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Slug *
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="chasing-northern-lights-lapland"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="px-4 py-2 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500"
                >
                  Generate
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Excerpt *
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="A brief summary of your story..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Content *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={10}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Write your travel story here... (Markdown supported)"
              />
            </div>
          </div>
        </div>

        {/* Destination & Media */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sky-400" />
            Destination & Media
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Destination *
              </label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Lapland, Finland"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Read Time (minutes)
              </label>
              <input
                type="number"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                min="1"
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Cover Image URL *
              </label>
              <input
                type="url"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            {/* Additional Images */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Additional Images
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img src={image} alt="" className="w-20 h-20 object-cover rounded-lg" />
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="Add image URL..."
                />
                <button
                  type="button"
                  onClick={addImage}
                  className="px-4 py-2 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Author */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 text-white">Author</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Author Name *
              </label>
              <input
                type="text"
                value={formData.author.name}
                onChange={(e) => handleAuthorChange('name', e.target.value)}
                required
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Emma Peterson"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Author Avatar URL
              </label>
              <input
                type="url"
                value={formData.author.avatar}
                onChange={(e) => handleAuthorChange('avatar', e.target.value)}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="https://..."
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Author Bio
              </label>
              <textarea
                value={formData.author.bio}
                onChange={(e) => handleAuthorChange('bio', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="A short bio about the author..."
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 text-white">Tags</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-sky-900 text-sky-300 rounded-full flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Add a tag..."
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-slate-600 text-slate-300 rounded-lg hover:bg-slate-500"
            >
              Add
            </button>
          </div>
        </div>

        {/* Publishing */}
        <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
          <h2 className="text-lg font-semibold mb-4 text-white">Publishing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Publish Date
              </label>
              <input
                type="date"
                name="publishedAt"
                value={formData.publishedAt}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-sky-500 focus:ring-sky-500"
              />
              <label className="text-slate-300">Published</label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-5 h-5 rounded border-slate-600 bg-slate-700 text-orange-500 focus:ring-orange-500"
              />
              <label className="text-slate-300">Featured</label>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
