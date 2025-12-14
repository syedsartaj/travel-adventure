import { NextRequest, NextResponse } from 'next/server'
import { getStoryById, updateStory, deleteStory } from '@/lib/db'

// GET single story by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const story = await getStoryById(params.id)

    if (!story) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true, data: story })
  } catch (error) {
    console.error('Error fetching story:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch story' },
      { status: 500 }
    )
  }
}

// PUT update story
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    const existingStory = await getStoryById(params.id)
    if (!existingStory) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      )
    }

    // Convert date strings to Date objects if needed
    if (body.publishedAt && typeof body.publishedAt === 'string') {
      body.publishedAt = new Date(body.publishedAt)
    }

    const result = await updateStory(params.id, body)

    return NextResponse.json({
      success: true,
      data: { modifiedCount: result.modifiedCount }
    })
  } catch (error) {
    console.error('Error updating story:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update story' },
      { status: 500 }
    )
  }
}

// DELETE story
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const existingStory = await getStoryById(params.id)
    if (!existingStory) {
      return NextResponse.json(
        { success: false, error: 'Story not found' },
        { status: 404 }
      )
    }

    const result = await deleteStory(params.id)

    return NextResponse.json({
      success: true,
      data: { deletedCount: result.deletedCount }
    })
  } catch (error) {
    console.error('Error deleting story:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to delete story' },
      { status: 500 }
    )
  }
}
