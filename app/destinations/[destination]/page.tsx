import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

const destinationData: Record<string, any> = {
  europe: {
    name: 'Europe',
    heroImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=2000&h=1200&fit=crop',
    description: 'A continent where medieval castles meet cutting-edge design, where you can breakfast in Paris, lunch in Brussels, and dinner in Amsterdam. Europe offers an unparalleled diversity of cultures, languages, and experiences within relatively compact borders.',
    countries: [
      { name: 'France', cities: ['Paris', 'Lyon', 'Nice'], bestTime: 'April-June, Sept-Oct' },
      { name: 'Italy', cities: ['Rome', 'Florence', 'Venice'], bestTime: 'April-June, Sept-Oct' },
      { name: 'Spain', cities: ['Barcelona', 'Madrid', 'Seville'], bestTime: 'March-May, Sept-Nov' },
      { name: 'Greece', cities: ['Athens', 'Santorini', 'Crete'], bestTime: 'April-June, Sept-Oct' },
      { name: 'United Kingdom', cities: ['London', 'Edinburgh', 'Oxford'], bestTime: 'May-Sept' },
      { name: 'Germany', cities: ['Berlin', 'Munich', 'Hamburg'], bestTime: 'May-Sept' }
    ],
    bestTimeToVisit: {
      peak: 'June - August',
      shoulder: 'April - May, September - October',
      offSeason: 'November - March',
      recommendation: 'Visit during shoulder season for pleasant weather, fewer crowds, and better prices. Spring (April-May) offers blooming flowers and mild temperatures, while fall (September-October) provides harvest festivals and beautiful foliage.'
    },
    budgetGuide: {
      budget: {
        daily: '$50-80',
        accommodation: 'Hostels ($20-40), Budget hotels',
        food: 'Supermarkets, street food, lunch specials',
        transport: 'Budget airlines, buses, walk'
      },
      midRange: {
        daily: '$100-200',
        accommodation: '3-star hotels ($60-100), Airbnb',
        food: 'Local restaurants, cafes',
        transport: 'Regional trains, short flights'
      },
      luxury: {
        daily: '$250+',
        accommodation: '4-5 star hotels ($150+), Boutique',
        food: 'Fine dining, Michelin restaurants',
        transport: 'High-speed trains, private transfers'
      }
    },
    topExperiences: [
      {
        title: 'Interrail Adventure',
        description: 'Travel across Europe by train with an Interrail pass, exploring multiple countries with ultimate flexibility.',
        image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&h=600&fit=crop'
      },
      {
        title: 'Mediterranean Island Hopping',
        description: 'Ferry between Greek islands or explore Croatia\'s Dalmatian coast by boat.',
        image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop'
      },
      {
        title: 'Alpine Hiking',
        description: 'Trek through the Swiss Alps, Dolomites, or French Pyrenees for breathtaking mountain scenery.',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
      }
    ],
    practicalTips: [
      'Schengen visa allows travel between 27 European countries',
      'Rail passes are cost-effective for multi-country trips',
      'Free walking tours available in most major cities',
      'Museums often have free admission days',
      'Shoulder season offers best value and fewer crowds',
      'Learn basic phrases in local languages',
      'Book accommodation in advance during peak season',
      'Many attractions require online reservations'
    ],
    gettingAround: {
      train: 'Europe has the world\'s best rail network. Eurail or Interrail passes offer unlimited travel.',
      flight: 'Budget airlines like Ryanair and EasyJet connect major cities cheaply.',
      bus: 'FlixBus and similar services offer very affordable intercity travel.',
      car: 'Rental cars are great for countryside exploration but expensive in cities.'
    }
  },
  asia: {
    name: 'Asia',
    heroImage: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=2000&h=1200&fit=crop',
    description: 'From the ancient temples of Angkor Wat to the neon-lit streets of Tokyo, Asia offers incredible diversity, rich traditions, mouth-watering cuisine, and some of the world\'s most budget-friendly travel experiences.',
    countries: [
      { name: 'Japan', cities: ['Tokyo', 'Kyoto', 'Osaka'], bestTime: 'March-May, Sept-Nov' },
      { name: 'Thailand', cities: ['Bangkok', 'Chiang Mai', 'Phuket'], bestTime: 'Nov-Feb' },
      { name: 'Vietnam', cities: ['Hanoi', 'Ho Chi Minh City', 'Hoi An'], bestTime: 'Feb-April' },
      { name: 'Indonesia', cities: ['Bali', 'Jakarta', 'Yogyakarta'], bestTime: 'April-Oct' },
      { name: 'India', cities: ['Delhi', 'Mumbai', 'Jaipur'], bestTime: 'Oct-March' },
      { name: 'South Korea', cities: ['Seoul', 'Busan', 'Jeju'], bestTime: 'April-June, Sept-Nov' }
    ],
    bestTimeToVisit: {
      peak: 'November - March',
      shoulder: 'April - May, September - October',
      offSeason: 'June - August (monsoon in many areas)',
      recommendation: 'Best time varies by region. Southeast Asia is ideal November-March (dry season), while Japan and Korea shine during spring cherry blossoms (late March-April) and fall foliage (October-November).'
    },
    budgetGuide: {
      budget: {
        daily: '$25-50',
        accommodation: 'Hostels ($8-20), Guesthouses',
        food: 'Street food, local markets ($5-10/day)',
        transport: 'Local buses, trains, tuk-tuks'
      },
      midRange: {
        daily: '$60-120',
        accommodation: 'Mid-range hotels ($30-60), Nice Airbnb',
        food: 'Local restaurants, some western food',
        transport: 'Domestic flights, AC buses, Grab/taxi'
      },
      luxury: {
        daily: '$150+',
        accommodation: 'Resorts ($100+), 5-star hotels',
        food: 'Fine dining, hotel restaurants',
        transport: 'Private drivers, first-class trains'
      }
    },
    topExperiences: [
      {
        title: 'Temple Exploration',
        description: 'Visit ancient temples in Kyoto, Angkor Wat in Cambodia, or Borobudur in Indonesia.',
        image: 'https://images.unsplash.com/photo-1563622008-e2ef42ea3e23?w=800&h=600&fit=crop'
      },
      {
        title: 'Street Food Adventure',
        description: 'Explore night markets in Taiwan, Bangkok street stalls, or Tokyo\'s izakayas.',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop'
      },
      {
        title: 'Island Paradise',
        description: 'Relax on pristine beaches in Thailand, Philippines, or Indonesia.',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop'
      }
    ],
    practicalTips: [
      'Southeast Asia is extremely budget-friendly',
      'Always carry cash - many places don\'t accept cards',
      'Dress modestly when visiting temples',
      'Remove shoes before entering homes and temples',
      'Bargaining is expected in markets',
      'Download offline maps and translation apps',
      'Stay hydrated and use sunscreen',
      'Travel insurance is essential'
    ],
    gettingAround: {
      flight: 'Budget airlines like AirAsia connect most major cities cheaply.',
      bus: 'Sleeper buses are popular for overnight journeys in Southeast Asia.',
      train: 'Japan has bullet trains; other countries have varying rail quality.',
      motorbike: 'Rent scooters in Southeast Asia for ultimate flexibility (get proper license).'
    }
  },
  americas: {
    name: 'Americas',
    heroImage: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=2000&h=1200&fit=crop',
    description: 'Spanning from Arctic tundra to Antarctic ice, the Americas offer incredible natural diversity - rainforests, deserts, mountains, and coastlines. Experience vibrant cultures from indigenous traditions to modern metropolises.',
    countries: [
      { name: 'USA', cities: ['New York', 'San Francisco', 'New Orleans'], bestTime: 'April-June, Sept-Oct' },
      { name: 'Canada', cities: ['Vancouver', 'Toronto', 'Montreal'], bestTime: 'May-Oct' },
      { name: 'Mexico', cities: ['Mexico City', 'Oaxaca', 'Tulum'], bestTime: 'Dec-April' },
      { name: 'Peru', cities: ['Lima', 'Cusco', 'Arequipa'], bestTime: 'May-Sept' },
      { name: 'Chile', cities: ['Santiago', 'Valparaiso', 'Patagonia'], bestTime: 'Nov-March' },
      { name: 'Argentina', cities: ['Buenos Aires', 'Mendoza', 'Bariloche'], bestTime: 'March-May, Sept-Nov' }
    ],
    bestTimeToVisit: {
      peak: 'June - August (North), December - February (South)',
      shoulder: 'April - May, September - October',
      offSeason: 'Varies by region',
      recommendation: 'Remember seasons are reversed in South America. Visit Patagonia November-March, while Central America is best November-April (dry season). North America is ideal in summer, but spring and fall offer fewer crowds.'
    },
    budgetGuide: {
      budget: {
        daily: '$40-70',
        accommodation: 'Hostels ($15-35), Budget motels',
        food: 'Supermarkets, food trucks, local eateries',
        transport: 'Public buses, shared shuttles'
      },
      midRange: {
        daily: '$100-180',
        accommodation: 'Mid-range hotels ($50-100), Airbnb',
        food: 'Casual restaurants, local specialties',
        transport: 'Rental cars, domestic flights, trains'
      },
      luxury: {
        daily: '$250+',
        accommodation: 'Boutique hotels ($150+), Resorts',
        food: 'Fine dining, acclaimed restaurants',
        transport: 'Private guides, scenic train journeys'
      }
    },
    topExperiences: [
      {
        title: 'Machu Picchu Trek',
        description: 'Hike the Inca Trail or take the train to this iconic ancient citadel in the Peruvian Andes.',
        image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop'
      },
      {
        title: 'Patagonia Adventure',
        description: 'Explore glaciers, mountains, and pristine wilderness in Chilean and Argentine Patagonia.',
        image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800&h=600&fit=crop'
      },
      {
        title: 'Amazon Rainforest',
        description: 'Experience incredible biodiversity in the world\'s largest rainforest in Brazil, Peru, or Ecuador.',
        image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop'
      }
    ],
    practicalTips: [
      'Distances are vast - budget time for travel between destinations',
      'Consider travel insurance that covers adventure activities',
      'Learn Spanish for Central and South America',
      'Altitude sickness is real - acclimatize in high-elevation areas',
      'Book Machu Picchu and Galapagos trips months in advance',
      'US national parks require advance reservations now',
      'Tap water quality varies - use filtration or bottled water',
      'Tipping is customary in North America (15-20%)'
    ],
    gettingAround: {
      flight: 'Essential for covering long distances. Book domestic flights early for best prices.',
      bus: 'Excellent long-distance bus networks in South America with sleeper options.',
      car: 'Road trips are popular in North America. International license may be required.',
      train: 'Limited in most areas except scenic routes like Canadian Rockies or Amtrak.'
    }
  },
  africa: {
    name: 'Africa',
    heroImage: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=2000&h=1200&fit=crop',
    description: 'Home to the world\'s most spectacular wildlife, ancient civilizations, vast deserts, and warm, welcoming people. Africa offers adventures that will change your perspective on life and nature.',
    countries: [
      { name: 'South Africa', cities: ['Cape Town', 'Johannesburg', 'Durban'], bestTime: 'May-Sept' },
      { name: 'Kenya', cities: ['Nairobi', 'Mombasa', 'Masai Mara'], bestTime: 'July-Oct' },
      { name: 'Tanzania', cities: ['Dar es Salaam', 'Zanzibar', 'Arusha'], bestTime: 'June-Oct' },
      { name: 'Morocco', cities: ['Marrakech', 'Fes', 'Chefchaouen'], bestTime: 'March-May, Sept-Nov' },
      { name: 'Egypt', cities: ['Cairo', 'Luxor', 'Aswan'], bestTime: 'Oct-April' },
      { name: 'Botswana', cities: ['Gaborone', 'Maun', 'Kasane'], bestTime: 'May-Oct' }
    ],
    bestTimeToVisit: {
      peak: 'June - October',
      shoulder: 'March - May, November',
      offSeason: 'December - February (rainy season in many areas)',
      recommendation: 'For safari, visit during dry season (June-October) when animals gather at water sources. Each region has different weather patterns - research your specific destinations. Avoid rainy season for wildlife viewing but enjoy lush landscapes and lower prices.'
    },
    budgetGuide: {
      budget: {
        daily: '$50-90',
        accommodation: 'Hostels ($15-30), Budget lodges',
        food: 'Local markets, street food, self-catering',
        transport: 'Public buses, shared taxis, budget safari'
      },
      midRange: {
        daily: '$150-300',
        accommodation: 'Mid-range lodges ($80-150), Guesthouses',
        food: 'Local restaurants, lodge meals',
        transport: 'Organized tours, domestic flights'
      },
      luxury: {
        daily: '$500+',
        accommodation: 'Luxury safari camps ($300+), 5-star hotels',
        food: 'All-inclusive safari lodges, fine dining',
        transport: 'Private safari vehicles, charter flights'
      }
    },
    topExperiences: [
      {
        title: 'Safari Adventure',
        description: 'Witness the Great Migration in Serengeti, track gorillas in Rwanda, or explore Kruger National Park.',
        image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?w=800&h=600&fit=crop'
      },
      {
        title: 'Sahara Desert',
        description: 'Camp under the stars in Morocco\'s vast sand dunes and experience Berber hospitality.',
        image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop'
      },
      {
        title: 'Victoria Falls',
        description: 'Experience one of the world\'s largest waterfalls on the Zambia-Zimbabwe border.',
        image: 'https://images.unsplash.com/photo-1621414050345-53db43f7e7ab?w=800&h=600&fit=crop'
      }
    ],
    practicalTips: [
      'Yellow fever vaccination required for many countries',
      'Anti-malaria medication recommended for safari areas',
      'Book safaris through reputable operators',
      'Bring binoculars for wildlife viewing',
      'Modest dress required in North African countries',
      'Cash is king - ATMs can be unreliable',
      'Travel insurance essential, especially for safari',
      'Respect wildlife - maintain safe distances'
    ],
    gettingAround: {
      flight: 'Essential for covering large distances between countries and regions.',
      safari: 'Organized tours with 4x4 vehicles are standard for game drives.',
      bus: 'Long-distance buses connect major cities but can be uncomfortable.',
      train: 'Limited rail networks except in South Africa and North Africa.'
    }
  },
  oceania: {
    name: 'Oceania',
    heroImage: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=2000&h=1200&fit=crop',
    description: 'From the Great Barrier Reef to New Zealand\'s dramatic fjords, Oceania offers pristine natural beauty, unique wildlife found nowhere else on Earth, and laid-back island cultures.',
    countries: [
      { name: 'Australia', cities: ['Sydney', 'Melbourne', 'Brisbane'], bestTime: 'Sept-Nov, March-May' },
      { name: 'New Zealand', cities: ['Auckland', 'Queenstown', 'Wellington'], bestTime: 'Dec-Feb, Sept-Nov' },
      { name: 'Fiji', cities: ['Nadi', 'Suva', 'Coral Coast'], bestTime: 'July-Sept' }
    ],
    bestTimeToVisit: {
      peak: 'December - February (summer)',
      shoulder: 'March - May, September - November',
      offSeason: 'June - August (winter, but still mild)',
      recommendation: 'Summer (Dec-Feb) is peak season with warm weather perfect for beaches and outdoor activities. Shoulder seasons offer pleasant temperatures and fewer crowds. Winter (June-Aug) is ideal for Great Barrier Reef diving and Queensland, as well as skiing in New Zealand.'
    },
    budgetGuide: {
      budget: {
        daily: '$60-100',
        accommodation: 'Hostels ($25-40), Campgrounds',
        food: 'Supermarkets, food courts, BBQ',
        transport: 'Buses, campervan, carpooling'
      },
      midRange: {
        daily: '$150-250',
        accommodation: 'Hotels ($80-150), Airbnb, Motels',
        food: 'Casual dining, cafes, pubs',
        transport: 'Rental cars, domestic flights'
      },
      luxury: {
        daily: '$350+',
        accommodation: 'Luxury lodges ($200+), 5-star hotels',
        food: 'Fine dining, acclaimed restaurants',
        transport: 'Private guides, scenic flights'
      }
    },
    topExperiences: [
      {
        title: 'Great Barrier Reef',
        description: 'Dive or snorkel the world\'s largest coral reef system, home to incredible marine biodiversity.',
        image: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?w=800&h=600&fit=crop'
      },
      {
        title: 'Milford Sound',
        description: 'Cruise through New Zealand\'s most stunning fjord, surrounded by waterfalls and mountains.',
        image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?w=800&h=600&fit=crop'
      },
      {
        title: 'Outback Adventure',
        description: 'Explore Australia\'s red center, visiting Uluru and experiencing Aboriginal culture.',
        image: 'https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=600&fit=crop'
      }
    ],
    practicalTips: [
      'Australia and New Zealand are expensive - budget accordingly',
      'Book working holiday visa for extended stays if eligible',
      'Sun protection essential - UV levels are very high',
      'Wildlife encounters possible but maintain safe distances',
      'Campervan travel is popular and cost-effective',
      'Book Great Barrier Reef trips in advance',
      'Winter sports season in NZ is June-October',
      'Tipping not required but appreciated for excellent service'
    ],
    gettingAround: {
      flight: 'Domestic flights connect major cities. Book early for best prices.',
      campervan: 'Popular option for exploring at your own pace with accommodation included.',
      car: 'Essential for exploring remote areas. Remember to drive on the left.',
      bus: 'Good network of intercity buses, including overnight options.'
    }
  }
};

export default function DestinationPage({ params }: { params: { destination: string } }) {
  const destination = destinationData[params.destination];

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
            <Link href="/destinations" className="text-sky-500 hover:underline">
              Return to Destinations
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[80vh] w-full">
          <Image
            src={destination.heroImage}
            alt={destination.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="max-w-6xl mx-auto text-white">
              <h1 className="text-5xl md:text-7xl font-bold mb-4">
                {destination.name}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl">
                {destination.description}
              </p>
            </div>
          </div>
        </div>

        {/* Countries Grid */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-gray-900">Popular Countries</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {destination.countries.map((country: any, index: number) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{country.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-sky-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <div className="text-gray-600">
                        {country.cities.join(', ')}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-600">{country.bestTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Best Time to Visit */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-gray-900">When to Visit</h2>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-green-50 border-2 border-green-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-green-900">Peak Season</h3>
                <p className="text-2xl font-bold text-green-600 mb-2">{destination.bestTimeToVisit.peak}</p>
                <p className="text-gray-700">Best weather, most crowded, highest prices</p>
              </div>
              <div className="bg-sky-50 border-2 border-sky-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-sky-900">Shoulder Season</h3>
                <p className="text-2xl font-bold text-sky-600 mb-2">{destination.bestTimeToVisit.shoulder}</p>
                <p className="text-gray-700">Good weather, fewer crowds, better value</p>
              </div>
              <div className="bg-orange-50 border-2 border-orange-500 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2 text-orange-900">Off Season</h3>
                <p className="text-2xl font-bold text-orange-600 mb-2">{destination.bestTimeToVisit.offSeason}</p>
                <p className="text-gray-700">Variable weather, fewest tourists, cheapest</p>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Recommendation</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {destination.bestTimeToVisit.recommendation}
              </p>
            </div>
          </div>
        </section>

        {/* Budget Guide */}
        <section className="py-20 px-4 bg-gradient-to-br from-sky-50 to-orange-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-gray-900 text-center">Budget Planning</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(destination.budgetGuide).map(([level, details]: [string, any]) => (
                <div key={level} className="bg-white p-8 rounded-lg shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 capitalize">
                    {level.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <div className="text-3xl font-bold text-sky-500 mb-6">
                    {details.daily}
                    <span className="text-lg text-gray-600">/day</span>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Accommodation</div>
                      <div className="text-gray-600">{details.accommodation}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Food</div>
                      <div className="text-gray-600">{details.food}</div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 mb-1">Transport</div>
                      <div className="text-gray-600">{details.transport}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Top Experiences */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-gray-900">Must-Do Experiences</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {destination.topExperiences.map((experience: any, index: number) => (
                <div key={index} className="group">
                  <div className="relative h-64 rounded-lg overflow-hidden mb-4 shadow-lg">
                    <Image
                      src={experience.image}
                      alt={experience.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{experience.title}</h3>
                  <p className="text-gray-700">{experience.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Getting Around */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-gray-900">Getting Around</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {Object.entries(destination.gettingAround).map(([method, description]: [string, any]) => (
                <div key={method} className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-xl font-bold mb-3 text-gray-900 capitalize flex items-center gap-2">
                    {method === 'flight' && '✈️'}
                    {method === 'train' && '🚂'}
                    {method === 'bus' && '🚌'}
                    {method === 'car' && '🚗'}
                    {method === 'safari' && '🚙'}
                    {method === 'campervan' && '🚐'}
                    {method === 'motorbike' && '🏍️'}
                    {method}
                  </h3>
                  <p className="text-gray-700">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Tips */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-gray-900">Practical Tips</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {destination.practicalTips.map((tip: string, index: number) => (
                <div key={index} className="flex gap-3 p-4 bg-white rounded-lg shadow">
                  <div className="text-sky-500 mt-1">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-sky-500 to-orange-400">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Explore {destination.name}?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Check out my travel stories and detailed guides from around {destination.name}
            </p>
            <Link
              href="/blog"
              className="inline-block px-8 py-4 bg-white text-sky-600 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Read Travel Stories
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
