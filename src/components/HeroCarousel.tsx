import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Mountain, Award, Truck } from 'lucide-react';
import { Language } from '../types';
import { t } from '../i18n';

interface HeroCarouselProps {
  lang: Language;
  onExplore: () => void;
}

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1600&h=800&fit=crop',
    overlay: 'from-coffee-900/80 to-coffee-900/40',
  },
  {
    image: 'https://images.unsplash.com/photo-1542181961-9590d0c79dab?w=1600&h=800&fit=crop',
    overlay: 'from-coffee-900/70 to-coffee-900/40',
  },
  {
    image: 'https://images.unsplash.com/photo-1442550528053-c431ecb55509?w=1600&h=800&fit=crop',
    overlay: 'from-coffee-900/70 to-coffee-900/40',
  },
  {
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1600&h=800&fit=crop',
    overlay: 'from-coffee-900/75 to-coffee-900/40',
  },
];

export default function HeroCarousel({ lang, onExplore }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % HERO_SLIDES.length);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
      {HERO_SLIDES.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt="Colombian Coffee"
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlay}`} />
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 bg-gold-500/90 text-coffee-900 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              <Mountain className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              {t(lang, 'hero_badge')}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t(lang, 'hero_title')}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-coffee-100 mb-6 sm:mb-8 leading-relaxed pr-4 sm:pr-0">
              {t(lang, 'hero_subtitle')}
            </p>
            <button
              onClick={onExplore}
              className="bg-gold-500 hover:bg-gold-400 text-coffee-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all hover:shadow-xl hover:scale-105"
            >
              {t(lang, 'hero_cta')}
            </button>

            {/* Feature badges */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mt-6 sm:mt-10">
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                <span className="text-xs sm:text-sm text-white font-medium">SCA 84+</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <Mountain className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                <span className="text-xs sm:text-sm text-white font-medium">1,500+ MASL</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-gold-400" />
                <span className="text-xs sm:text-sm text-white font-medium">{t(lang, 'footer_export_markets')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Arrows - hidden on mobile (use dots instead) */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? 'bg-gold-400 w-8' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
