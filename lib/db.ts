import { MongoClient, Db, Collection } from 'mongodb'

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

const uri = process.env.MONGODB_URI
const options = {}

let client: MongoClient
let clientPromise: Promise<MongoClient>

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable to preserve the client across module reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, create a new client
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Database Models and Types

export interface Destination {
  _id?: string
  title: string
  country: string
  countryCode: string
  flag: string
  description: string
  longDescription: string
  images: string[]
  featuredImage: string
  category: string
  continent: string
  coordinates: {
    latitude: number
    longitude: number
  }
  visitorsCount: number
  rating: number
  reviewsCount: number
  bestTimeToVisit: {
    months: string[]
    description: string
  }
  budget: {
    level: 'budget' | 'moderate' | 'luxury'
    dailyAverage: number
    currency: string
  }
  highlights: string[]
  activities: string[]
  transportation: string[]
  climate: string
  language: string
  currency: string
  timezone: string
  visaRequired: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
  published: boolean
  slug: string
}

export interface TravelStory {
  _id?: string
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
  destinationId?: string
  coverImage: string
  images: string[]
  category: string
  tags: string[]
  readTime: number
  publishedAt: Date
  createdAt: Date
  updatedAt: Date
  published: boolean
  featured: boolean
  views: number
  likes: number
  comments: Comment[]
}

export interface Comment {
  _id?: string
  author: {
    name: string
    email: string
    avatar?: string
  }
  content: string
  createdAt: Date
  approved: boolean
}

export interface NewsletterSubscriber {
  _id?: string
  email: string
  name?: string
  subscribedAt: Date
  active: boolean
  preferences: {
    destinations: string[]
    categories: string[]
  }
}

export interface TravelTip {
  _id?: string
  title: string
  category: string
  content: string
  destination?: string
  tags: string[]
  createdAt: Date
  helpful: number
}

// Database Helper Functions

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db('wanderlust')
}

export async function getDestinations(filter = {}, limit = 10): Promise<Destination[]> {
  const db = await getDatabase()
  const destinations = db.collection<Destination>('destinations')
  return await destinations
    .find({ published: true, ...filter })
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray()
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  const db = await getDatabase()
  const destinations = db.collection<Destination>('destinations')
  return await destinations.findOne({ slug, published: true })
}

export async function getFeaturedDestinations(limit = 6): Promise<Destination[]> {
  const db = await getDatabase()
  const destinations = db.collection<Destination>('destinations')
  return await destinations
    .find({ published: true })
    .sort({ rating: -1, visitorsCount: -1 })
    .limit(limit)
    .toArray()
}

export async function getTravelStories(filter = {}, limit = 10): Promise<TravelStory[]> {
  const db = await getDatabase()
  const stories = db.collection<TravelStory>('stories')
  return await stories
    .find({ published: true, ...filter })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .toArray()
}

export async function getStoryBySlug(slug: string): Promise<TravelStory | null> {
  const db = await getDatabase()
  const stories = db.collection<TravelStory>('stories')

  // Increment view count
  await stories.updateOne({ slug }, { $inc: { views: 1 } })

  return await stories.findOne({ slug, published: true })
}

export async function getFeaturedStories(limit = 3): Promise<TravelStory[]> {
  const db = await getDatabase()
  const stories = db.collection<TravelStory>('stories')
  return await stories
    .find({ published: true, featured: true })
    .sort({ publishedAt: -1 })
    .limit(limit)
    .toArray()
}

export async function subscribeToNewsletter(
  email: string,
  name?: string
): Promise<{ success: boolean; message: string }> {
  try {
    const db = await getDatabase()
    const subscribers = db.collection<NewsletterSubscriber>('newsletter_subscribers')

    const existing = await subscribers.findOne({ email })

    if (existing) {
      if (existing.active) {
        return { success: false, message: 'Already subscribed' }
      }

      // Reactivate subscription
      await subscribers.updateOne(
        { email },
        { $set: { active: true, subscribedAt: new Date() } }
      )
      return { success: true, message: 'Subscription reactivated' }
    }

    // New subscription
    await subscribers.insertOne({
      email,
      name,
      subscribedAt: new Date(),
      active: true,
      preferences: {
        destinations: [],
        categories: [],
      },
    })

    return { success: true, message: 'Successfully subscribed' }
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return { success: false, message: 'Subscription failed' }
  }
}

export async function addComment(
  storySlug: string,
  comment: Omit<Comment, '_id' | 'createdAt' | 'approved'>
): Promise<{ success: boolean; message: string }> {
  try {
    const db = await getDatabase()
    const stories = db.collection<TravelStory>('stories')

    const newComment: Comment = {
      ...comment,
      createdAt: new Date(),
      approved: false, // Requires moderation
    }

    await stories.updateOne(
      { slug: storySlug },
      { $push: { comments: newComment } }
    )

    return { success: true, message: 'Comment submitted for approval' }
  } catch (error) {
    console.error('Comment submission error:', error)
    return { success: false, message: 'Comment submission failed' }
  }
}

export async function searchDestinations(query: string): Promise<Destination[]> {
  const db = await getDatabase()
  const destinations = db.collection<Destination>('destinations')

  return await destinations
    .find({
      published: true,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { country: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } },
      ],
    })
    .limit(20)
    .toArray()
}

export default clientPromise
