import { useEffect, useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

interface ImageLightboxProps {
  src: string | null;
  alt?: string;
  caption?: string;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, caption, onClose }: ImageLightboxProps) {
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [src, onClose]);

  useEffect(() => {
    if (!src) setZoomed(false);
  }, [src]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-coffee-900/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2.5 rounded-full transition-colors z-10"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Zoom toggle */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setZoomed((z) => !z);
        }}
        aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
        className="absolute top-4 right-16 sm:top-6 sm:right-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2.5 rounded-full transition-colors z-10"
      >
        {zoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
      </button>

      {/* Image */}
      <div
        className="relative max-w-6xl w-full h-full flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`relative overflow-auto rounded-2xl shadow-2xl bg-coffee-900/40 ${
            zoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={() => setZoomed((z) => !z)}
          style={{ maxHeight: 'calc(100vh - 6rem)' }}
        >
          <img
            src={src}
            alt={alt || ''}
            className={`block transition-transform duration-300 ${
              zoomed ? 'scale-[2] origin-center' : 'scale-100'
            }`}
            style={{
              maxWidth: zoomed ? 'none' : '100%',
              maxHeight: zoomed ? 'none' : 'calc(100vh - 6rem)',
              objectFit: 'contain',
            }}
            draggable={false}
          />
        </div>
        {caption && (
          <p className="mt-4 text-center text-sm text-coffee-100 max-w-2xl">{caption}</p>
        )}
      </div>
    </div>
  );
}
