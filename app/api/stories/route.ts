import { NextRequest, NextResponse } from 'next/server'
import { getAllStories, createStory, getTravelStories } from '@/lib/db'

// GET all stories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const category = searchParams.get('category')
    const all = searchParams.get('all')

    let stories
    if (all === 'true') {
      stories = await getAllStories()
    } else {
      const filter: any = {}
      if (featured === 'true') filter.featured = true
      if (category) filter.category = category
      stories = await getTravelStories(filter, 100)
    }

    return NextResponse.json({ success: true, data: stories })
  } catch (error) {
    console.error('Error fetching stories:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch stories' },
      { status: 500 }
    )
  }
}

// POST create new story
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const requiredFields = ['title', 'slug', 'excerpt', 'content', 'author', 'destination', 'coverImage', 'category']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    const story = {
      title: body.title,
      slug: body.slug,
      excerpt: body.excerpt,
      content: body.content,
      author: body.author,
      destination: body.destination,
      destinationId: body.destinationId,
      coverImage: body.coverImage,
      images: body.images || [],
      category: body.category,
      tags: body.tags || [],
      readTime: body.readTime || 5,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
      published: body.published ?? true,
      featured: body.featured ?? false
    }

    const result = await createStory(story)

    return NextResponse.json(
      { success: true, data: { insertedId: result.insertedId } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating story:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create story' },
      { status: 500 }
    )
  }
}
