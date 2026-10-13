'use client';

import { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  title: string;
  carouselId?: string;
  height?: string;
  showThumbnails?: boolean;
  objectFit?: 'cover' | 'contain';
}

export default function ImageCarousel({ 
  images, 
  title, 
  carouselId = 'batchCarousel',
  height = '320px',
  showThumbnails = true,
  objectFit = 'cover'
}: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div 
        className="bg-light text-center rounded-4 text-muted d-flex flex-column align-items-center justify-content-center w-100"
        style={{ height }}
      >
        <i className="bi bi-image fs-1 d-block mb-1 text-secondary opacity-50"></i>
        <small className="fw-semibold">No images uploaded</small>
      </div>
    );
  }

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container position-relative rounded-4 overflow-hidden shadow-sm bg-dark w-100">
      
      {/* Main Slide Display with STRICT UNIFORM FIXED HEIGHT */}
      <div 
        className="position-relative w-100 overflow-hidden bg-dark"
        style={{ 
          height, 
          minHeight: height, 
          maxHeight: height 
        }}
      >
        <img 
          src={images[activeIndex]} 
          alt={`${title} - photo ${activeIndex + 1}`} 
          className="w-100 h-100"
          onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }}
          style={{ 
            height: '100%', 
            width: '100%', 
            objectFit: objectFit,
            objectPosition: 'center',
            display: 'block',
            transition: 'opacity 0.2s ease-in-out'
          }}
        />

        {/* Counter Overlay Badge */}
        <div className="position-absolute top-0 start-0 m-3 z-2">
          <span className="badge bg-dark bg-opacity-75 text-white px-2 py-1 rounded-pill extra-small shadow-sm">
            <i className="bi bi-camera-fill me-1 text-warning"></i> {activeIndex + 1} / {images.length}
          </span>
        </div>

        {/* Carousel Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              type="button"
              className="btn btn-dark btn-sm rounded-circle position-absolute top-50 start-0 translate-middle-y ms-2 z-2 shadow bg-opacity-75 hover-opacity-100 border-0 d-flex align-items-center justify-content-center p-0"
              onClick={prevSlide}
              aria-label="Previous photo"
              style={{ width: '34px', height: '34px' }}
            >
              <i className="bi bi-chevron-left fs-6 text-white"></i>
            </button>
            <button 
              type="button"
              className="btn btn-dark btn-sm rounded-circle position-absolute top-50 end-0 translate-middle-y me-2 z-2 shadow bg-opacity-75 hover-opacity-100 border-0 d-flex align-items-center justify-content-center p-0"
              onClick={nextSlide}
              aria-label="Next photo"
              style={{ width: '34px', height: '34px' }}
            >
              <i className="bi bi-chevron-right fs-6 text-white"></i>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Navigation Row (Only displayed when showThumbnails is true and >1 image) */}
      {showThumbnails && images.length > 1 && (
        <div className="bg-dark p-2 border-top border-secondary border-opacity-50">
          <div className="d-flex gap-2 overflow-x-auto justify-content-center">
            {images.map((img, idx) => (
              <button 
                key={idx}
                type="button"
                className={`btn p-0 border-2 rounded-2 overflow-hidden flex-shrink-0 ${
                  idx === activeIndex ? 'border-success' : 'border-transparent opacity-60'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(idx);
                }}
                style={{ width: '64px', height: '48px', transition: 'all 0.2s ease' }}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-100 h-100"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/images/placeholder.png'; }}
                  style={{ objectFit: 'cover', display: 'block' }} 
                />
              </button>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
