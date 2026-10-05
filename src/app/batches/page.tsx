'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ImageCarousel from '@/components/ImageCarousel';

export default function BatchesPage() {
  const [batches, setBatches] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch('/api/batches')
      .then(res => res.json())
      .then(data => {
        setBatches(data);
        setLoading(false);
      });
  }, []);

  const filteredBatches = batches.filter(b => {
    if (filter === 'ALL') return true;
    return b.status === filter;
  });

  return (
    <>
      <section className="bg-dark text-white py-5 text-center position-relative overflow-hidden">
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 opacity-30"
          style={{
            backgroundImage: "url('/images/placeholders/coconut.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        ></div>
        <div className="container position-relative py-3">
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-2 fw-bold">TRANSPARENT INVENTORY</span>
          <h1 className="display-4 fw-bold">Available Batches</h1>
          <p className="lead mx-auto" style={{ maxWidth: '650px' }}>
            View live batch inventory numbers, age, height, and verified Mother Palm parentage.
          </p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          
          {/* Status Filter Bar */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            <button 
              className={`btn ${filter === 'ALL' ? 'btn-success fw-bold' : 'btn-outline-secondary'}`}
              onClick={() => setFilter('ALL')}
            >
              All Batches ({batches.length})
            </button>
            <button 
              className={`btn ${filter === 'AVAILABLE' ? 'btn-success fw-bold' : 'btn-outline-secondary'}`}
              onClick={() => setFilter('AVAILABLE')}
            >
              Available
            </button>
            <button 
              className={`btn ${filter === 'LIMITED' ? 'btn-warning fw-bold text-dark' : 'btn-outline-secondary'}`}
              onClick={() => setFilter('LIMITED')}
            >
              Limited
            </button>
            <button 
              className={`btn ${filter === 'COMING_SOON' ? 'btn-info fw-bold text-dark' : 'btn-outline-secondary'}`}
              onClick={() => setFilter('COMING_SOON')}
            >
              Coming Soon
            </button>
            <button 
              className={`btn ${filter === 'SOLD_OUT' ? 'btn-danger fw-bold' : 'btn-outline-secondary'}`}
              onClick={() => setFilter('SOLD_OUT')}
            >
              Sold Out
            </button>
          </div>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row g-4">
              {filteredBatches.map(b => (
                <div key={b.id} className="col-md-4">
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden position-relative">
                    
                    {/* Status Badge */}
                    <div className="position-absolute top-0 end-0 m-3 z-1">
                      {b.status === 'AVAILABLE' && <span className="badge bg-success px-3 py-2">AVAILABLE</span>}
                      {b.status === 'LIMITED' && <span className="badge bg-warning text-dark px-3 py-2">LIMITED STOCK</span>}
                      {b.status === 'COMING_SOON' && <span className="badge bg-info text-dark px-3 py-2">COMING SOON</span>}
                      {b.status === 'SOLD_OUT' && <span className="badge bg-danger px-3 py-2">SOLD OUT</span>}
                    </div>

                    <div className="overflow-hidden" style={{ minHeight: '220px' }}>
                      <ImageCarousel images={b.images} title={b.name} carouselId={`batch-card-${b.batchCode}`} />
                    </div>

                    <div className="card-body p-4 d-flex flex-column justify-content-between">
                      <div>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="badge bg-dark">{b.batchCode}</span>
                          <span className="text-muted small">Mother Palm: <strong className="text-success">{b.parentPalmCode}</strong></span>
                        </div>
                        <h5 className="fw-bold text-dark mb-2">{b.name}</h5>

                        <div className="bg-light p-2 rounded mb-3 small text-secondary">
                          <div>Age: <strong>{b.age}</strong></div>
                          <div>Height: <strong>{b.height}</strong></div>
                        </div>

                        {/* Stats & Progress */}
                        <div className="row text-center border-top border-bottom py-2 mb-3 g-0">
                          <div className="col-4 border-end">
                            <small className="text-muted d-block extra-small">TOTAL</small>
                            <span className="fw-bold text-dark">{b.totalQuantity}</span>
                          </div>
                          <div className="col-4 border-end">
                            <small className="text-muted d-block extra-small">BOOKED</small>
                            <span className="fw-bold text-primary">{b.bookedQuantity}</span>
                          </div>
                          <div className="col-4">
                            <small className="text-muted d-block extra-small">AVAILABLE</small>
                            <span className="fw-bold text-success">{b.availableQuantity}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="progress" style={{ height: '8px' }}>
                            <div 
                              className="progress-bar bg-success" 
                              style={{ width: `${b.bookedPercentage}%` }}
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between text-muted extra-small mt-1">
                            <span>{b.bookedPercentage}% booked</span>
                            <span>{b.availableQuantity} left</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                        <div>
                          <span className="fs-4 fw-bold text-success">₹{b.price}</span>
                          <small className="text-muted"> / sapling</small>
                        </div>
                        <div className="d-flex gap-2">
                          <Link href={`/batches/${b.batchCode}`} className="btn btn-sm btn-outline-secondary">
                            Details
                          </Link>
                          {b.status !== 'SOLD_OUT' && (
                            <Link href={`/book/${b.batchCode}`} className="btn btn-sm btn-success fw-bold">
                              Book Now
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
