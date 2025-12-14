'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import StoryForm from '@/components/StoryForm'

export default function EditStoryPage() {
  const params = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await fetch(`/api/stories/${params.id}`)
        const data = await response.json()
        if (data.success) {
          // Format the date for the form
          const formattedData = {
            ...data.data,
            publishedAt: data.data.publishedAt
              ? new Date(data.data.publishedAt).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0]
          }
          setStory(formattedData)
        } else {
          setError('Story not found')
        }
      } catch (err) {
        setError('Failed to load story')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchStory()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-slate-400">Loading story...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-red-400">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8 px-4">
      <StoryForm initialData={story} isEdit />
    </div>
  )
}
