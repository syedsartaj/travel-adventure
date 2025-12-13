import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Please add your OpenAI API key to .env.local')
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Generate travel story content using AI
export async function generateTravelStory(
  destination: string,
  highlights: string[],
  style: 'adventurous' | 'relaxed' | 'cultural' | 'luxury' = 'adventurous'
): Promise<string> {
  try {
    const prompt = `Write an engaging travel story about ${destination}.

Key highlights to cover:
${highlights.map((h) => `- ${h}`).join('\n')}

Style: ${style}

The story should be:
- Immersive and descriptive
- 800-1000 words
- Include personal anecdotes
- Inspire readers to visit
- Written in first person
- Include practical tips naturally woven into the narrative

Format the response in markdown with proper headings.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are an experienced travel writer known for creating vivid, inspiring travel stories that transport readers to exotic destinations.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    })

    return completion.choices[0].message.content || ''
  } catch (error) {
    console.error('Error generating travel story:', error)
    throw new Error('Failed to generate travel story')
  }
}

// Generate destination guide using AI
export async function generateDestinationGuide(
  destination: string,
  category: 'complete' | 'budget' | 'luxury' | 'family' = 'complete'
): Promise<{
  overview: string
  bestTimeToVisit: string
  highlights: string[]
  activities: string[]
  budgetTips: string[]
  culturalTips: string[]
}> {
  try {
    const prompt = `Create a comprehensive travel guide for ${destination}.

Category: ${category}

Provide the following sections:
1. Overview (2-3 paragraphs)
2. Best time to visit (detailed explanation)
3. Top highlights (5-7 must-see attractions)
4. Recommended activities (5-7 things to do)
5. Budget tips (5 money-saving suggestions)
6. Cultural tips (5 important cultural insights)

Format as JSON with these exact keys: overview, bestTimeToVisit, highlights, activities, budgetTips, culturalTips`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are a travel expert providing detailed, accurate destination guides. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0].message.content || '{}'
    return JSON.parse(content)
  } catch (error) {
    console.error('Error generating destination guide:', error)
    throw new Error('Failed to generate destination guide')
  }
}

// Generate travel tips using AI
export async function generateTravelTips(
  topic: string,
  count: number = 5
): Promise<string[]> {
  try {
    const prompt = `Generate ${count} practical travel tips about "${topic}".

Requirements:
- Each tip should be actionable and specific
- Include insider knowledge
- Keep tips concise (1-2 sentences each)
- Make them useful for travelers

Return as a JSON array of strings.`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are a seasoned traveler sharing valuable, practical travel advice. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.8,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0].message.content || '{"tips": []}'
    const parsed = JSON.parse(content)
    return parsed.tips || []
  } catch (error) {
    console.error('Error generating travel tips:', error)
    throw new Error('Failed to generate travel tips')
  }
}

// Generate social media captions for travel photos
export async function generatePhotoCaption(
  destination: string,
  description: string,
  mood: 'inspiring' | 'fun' | 'serene' | 'adventurous' = 'inspiring'
): Promise<string> {
  try {
    const prompt = `Create an Instagram-worthy caption for a travel photo.

Destination: ${destination}
Photo description: ${description}
Mood: ${mood}

Requirements:
- Engaging and shareable
- Include relevant emojis
- 1-2 sentences
- Inspirational tone
- Include 3-5 relevant hashtags`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are a social media expert specializing in travel content that inspires wanderlust.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.9,
      max_tokens: 150,
    })

    return completion.choices[0].message.content || ''
  } catch (error) {
    console.error('Error generating photo caption:', error)
    throw new Error('Failed to generate photo caption')
  }
}

// Generate itinerary using AI
export async function generateItinerary(
  destination: string,
  days: number,
  interests: string[],
  budget: 'budget' | 'moderate' | 'luxury'
): Promise<{
  overview: string
  dailyPlans: Array<{
    day: number
    title: string
    activities: string[]
    meals: string[]
    accommodation: string
    estimatedCost: string
  }>
}> {
  try {
    const prompt = `Create a ${days}-day travel itinerary for ${destination}.

Traveler interests: ${interests.join(', ')}
Budget level: ${budget}

Provide:
1. Overview of the trip
2. Daily plans with:
   - Day number and title
   - Morning, afternoon, evening activities
   - Meal recommendations
   - Accommodation suggestions
   - Estimated daily cost

Return as JSON with keys: overview, dailyPlans (array of day objects)`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'You are an expert travel planner creating personalized itineraries. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' },
    })

    const content = completion.choices[0].message.content || '{}'
    return JSON.parse(content)
  } catch (error) {
    console.error('Error generating itinerary:', error)
    throw new Error('Failed to generate itinerary')
  }
}

// Moderate user-generated content
export async function moderateContent(content: string): Promise<{
  safe: boolean
  reason?: string
}> {
  try {
    const moderation = await openai.moderations.create({
      input: content,
    })

    const result = moderation.results[0]

    if (result.flagged) {
      const categories = Object.entries(result.categories)
        .filter(([_, flagged]) => flagged)
        .map(([category]) => category)

      return {
        safe: false,
        reason: `Content flagged for: ${categories.join(', ')}`,
      }
    }

    return { safe: true }
  } catch (error) {
    console.error('Error moderating content:', error)
    return { safe: false, reason: 'Moderation check failed' }
  }
}

export default openai
