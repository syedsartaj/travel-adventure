'use client';

import { useState } from 'react';
import { Camera, MapPin, X, ChevronLeft, ChevronRight, Grid, LayoutGrid } from 'lucide-react';

const galleryImages = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
    title: 'Santorini Sunset',
    location: 'Santorini, Greece',
    category: 'Islands',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
    title: 'Bamboo Forest',
    location: 'Kyoto, Japan',
    category: 'Nature',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1579033461380-adb47c3eb938?w=800&h=600&fit=crop',
    title: 'Northern Lights',
    location: 'Lapland, Finland',
    category: 'Nature',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=800&h=600&fit=crop',
    title: 'Patagonia Mountains',
    location: 'Patagonia, Argentina',
    category: 'Mountains',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=800&h=600&fit=crop',
    title: 'Marrakech Market',
    location: 'Marrakech, Morocco',
    category: 'Culture',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop',
    title: 'Bali Rice Terraces',
    location: 'Ubud, Bali',
    category: 'Nature',
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&h=600&fit=crop',
    title: 'Iceland Waterfall',
    location: 'Seljalandsfoss, Iceland',
    category: 'Nature',
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&h=600&fit=crop',
    title: 'Bangkok Temple',
    location: 'Bangkok, Thailand',
    category: 'Culture',
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop',
    title: 'Machu Picchu',
    location: 'Cusco, Peru',
    category: 'Historical',
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&h=600&fit=crop',
    title: 'Safari Sunset',
    location: 'Serengeti, Tanzania',
    category: 'Wildlife',
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
    title: 'Tropical Beach',
    location: 'Maldives',
    category: 'Islands',
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800&h=600&fit=crop',
    title: 'World Map',
    location: 'Planning Adventures',
    category: 'Travel',
  },
  {
    id: 13,
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop',
    title: 'Mountain Vista',
    location: 'Swiss Alps',
    category: 'Mountains',
  },
  {
    id: 14,
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop',
    title: 'Paradise Beach',
    location: 'Seychelles',
    category: 'Islands',
  },
  {
    id: 15,
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop',
    title: 'Lake Reflection',
    location: 'Banff, Canada',
    category: 'Nature',
  },
  {
    id: 16,
    src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop',
    title: 'Eiffel Tower',
    location: 'Paris, France',
    category: 'Cities',
  },
];

const categories = ['All', 'Nature', 'Islands', 'Mountains', 'Culture', 'Cities', 'Wildlife', 'Historical'];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);
  const [gridSize, setGridSize] = useState<'small' | 'large'>('large');

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === selectedCategory);

  const currentIndex = selectedImage ? filteredImages.findIndex(img => img.id === selectedImage.id) : -1;

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(filteredImages[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920')] opacity-10 bg-cover bg-center" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-300 rounded-full text-sm font-medium mb-6">
              <Camera className="w-4 h-4" />
              <span>Photo Gallery</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Travel Photography
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              A visual journey through the world's most breathtaking destinations. Each photo tells a story of adventure and discovery.
            </p>
          </div>
        </div>
      </section>

      {/* Filter & Controls */}
      <section className="py-6 px-6 bg-slate-800 border-b border-slate-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setGridSize('large')}
                className={`p-2 rounded-lg transition-colors ${
                  gridSize === 'large' ? 'bg-sky-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setGridSize('small')}
                className={`p-2 rounded-lg transition-colors ${
                  gridSize === 'small' ? 'bg-sky-500 text-white' : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className={`grid gap-4 ${
            gridSize === 'large'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${
                  gridSize === 'large' && index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
              >
                <div className={`relative ${gridSize === 'large' ? (index % 5 === 0 ? 'aspect-square' : 'aspect-[4/3]') : 'aspect-square'}`}>
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-300">
                      <MapPin className="w-4 h-4" />
                      {image.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-sky-400 mb-2">15K+</div>
              <div className="text-slate-400">Photos Captured</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-400 mb-2">87</div>
              <div className="text-slate-400">Countries Visited</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-sky-400 mb-2">250+</div>
              <div className="text-slate-400">Destinations</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-orange-400 mb-2">5</div>
              <div className="text-slate-400">Continents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-8 h-8" />
          </button>

          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
              className="absolute left-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          {currentIndex < filteredImages.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          <div className="max-w-5xl max-h-[80vh] mx-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src.replace('w=800', 'w=1600').replace('h=600', 'h=1200')}
              alt={selectedImage.title}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
              <div className="flex items-center justify-center gap-2 text-slate-300 mt-2">
                <MapPin className="w-4 h-4" />
                {selectedImage.location}
              </div>
              <div className="text-sm text-slate-500 mt-2">
                {currentIndex + 1} / {filteredImages.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
