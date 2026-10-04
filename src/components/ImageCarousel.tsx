'use client';

import { useState } from 'react';

interface ImageCarouselProps {
  images: string[];
  title: string;
  carouselId?: string;
}

export default function ImageCarousel({ images, title, carouselId = 'batchCarousel' }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="bg-light text-center py-5 rounded-4 text-muted">
        <i className="bi bi-image fs-1 d-block mb-2"></i>
        No images available
      </div>
    );
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel-container position-relative rounded-4 overflow-hidden shadow-sm bg-dark">
      {/* Main Slide Display */}
      <div className="position-relative" style={{ minHeight: '350px', maxHeight: '450px' }}>
        <img 
          src={images[activeIndex]} 
          alt={`${title} - photo ${activeIndex + 1}`} 
          className="w-100 h-100 object-fit-contain bg-black"
          style={{ maxHeight: '450px', transition: 'all 0.3s ease' }}
        />

        {/* Badges Overlay */}
        <div className="position-absolute top-0 start-0 m-3 z-2">
          <span className="badge bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill shadow-sm">
            <i className="bi bi-camera-fill me-1 text-warning"></i> Photo {activeIndex + 1} of {images.length}
          </span>
        </div>

        {/* Carousel Navigation Arrows (shown if multiple images) */}
        {images.length > 1 && (
          <>
            <button 
              className="btn btn-dark btn-sm rounded-circle position-absolute top-50 start-0 translate-middle-y ms-3 z-2 shadow opacity-75 hover-opacity-100"
              onClick={prevSlide}
              aria-label="Previous photo"
              style={{ width: '42px', height: '42px' }}
            >
              <i className="bi bi-chevron-left fs-5"></i>
            </button>
            <button 
              className="btn btn-dark btn-sm rounded-circle position-absolute top-50 end-0 translate-middle-y me-3 z-2 shadow opacity-75 hover-opacity-100"
              onClick={nextSlide}
              aria-label="Next photo"
              style={{ width: '42px', height: '42px' }}
            >
              <i className="bi bi-chevron-right fs-5"></i>
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Navigation Row */}
      {images.length > 1 && (
        <div className="bg-dark p-3 border-top border-secondary">
          <div className="d-flex gap-2 overflow-x-auto justify-content-center">
            {images.map((img, idx) => (
              <button 
                key={idx}
                className={`btn p-0 border-2 rounded-3 overflow-hidden ${idx === activeIndex ? 'border-success scale-105' : 'border-transparent opacity-60'}`}
                onClick={() => setActiveIndex(idx)}
                style={{ width: '70px', height: '55px', transition: 'all 0.2s ease' }}
              >
                <img 
                  src={img} 
                  alt={`Thumbnail ${idx + 1}`} 
                  className="w-100 h-100 object-fit-cover" 
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
