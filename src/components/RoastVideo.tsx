import { Coffee } from 'lucide-react';

/**
 * Vertical "reel" video section (9:16, shot on phone).
 * Muted + looped so it autoplays everywhere; the source has no audio track.
 */
export default function RoastVideo() {
  return (
    <section className="bg-coffee-900 text-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Vertical 9:16 reel */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-[300px] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10">
              <video
                src="/video/grano-tostado.mp4"
                poster="/products/grano-tostado-medio.jpg"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Text */}
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 bg-gold-500/15 text-gold-400 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Coffee className="w-4 h-4" />
              From the roastery
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 leading-tight">
              See our roast come to life
            </h2>
            <p className="text-coffee-200 leading-relaxed mb-6">
              A real batch of our specialty Colombian beans, roasted to a balanced medium
              profile — caramel, chocolate and red-fruit sweetness. From the highlands of
              Huila to your roastery, this is the coffee we export to the world.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 text-sm">
                84+ SCA specialty
              </span>
              <span className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 text-sm">
                Fully washed · 1,500+ MASL
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
