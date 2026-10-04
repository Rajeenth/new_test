import Link from 'next/link';
import { DataStore } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export default function Home() {
  const batches = DataStore.getBatches();
  const currentBatch = batches[0];
  const motherPalms = DataStore.getParentPalms();
  const reviews = DataStore.getReviews();

  return (
    <>
      {/* Hero Section with Local Folder Background */}
      <section className="position-relative bg-dark text-white py-5 text-center overflow-hidden">
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 opacity-30"
          style={{
            backgroundImage: "url('/images/placeholders/coconut.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        ></div>

        <div className="container position-relative py-5">
          <span className="badge bg-success px-3 py-2 fs-6 rounded-pill mb-3 text-uppercase tracking-wider">
            <i className="bi bi-shield-check me-1"></i> Authentic Eathamozhy Heritage
          </span>
          <h1 className="display-3 fw-bold mb-3 text-light">From Our Farm to Your Farm</h1>
          <p className="lead text-light mb-4 mx-auto" style={{ maxWidth: '750px' }}>
            Traditional Eathamozhy coconut saplings, carefully raised in our own farm. See actual batch availability, verified Mother Tree origin, and book directly online.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link href="/batches" className="btn btn-success btn-lg px-4 fw-bold shadow">
              <i className="bi bi-grid-fill me-2"></i> View Available Batches
            </Link>
            <Link href="/farm" className="btn btn-outline-light btn-lg px-4 fw-bold">
              <i className="bi bi-geo-alt me-2"></i> Explore Our Farm
            </Link>
          </div>

          <div className="row justify-content-center mt-5 g-3">
            <div className="col-6 col-md-3">
              <div className="bg-dark bg-opacity-75 border border-secondary rounded-3 p-3">
                <i className="bi bi-tree text-success fs-3 d-block mb-1"></i>
                <small className="fw-bold d-block">100% Farm-Raised</small>
                <span className="text-secondary extra-small">No middleman sourcing</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-dark bg-opacity-75 border border-secondary rounded-3 p-3">
                <i className="bi bi-truck text-warning fs-3 d-block mb-1"></i>
                <small className="fw-bold d-block">Pan-India Delivery</small>
                <span className="text-secondary extra-small">Protective crate packing</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-dark bg-opacity-75 border border-secondary rounded-3 p-3">
                <i className="bi bi-bar-chart-line text-info fs-3 d-block mb-1"></i>
                <small className="fw-bold d-block">Live Batch Stock</small>
                <span className="text-secondary extra-small">Dynamic real-time inventory</span>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="bg-dark bg-opacity-75 border border-secondary rounded-3 p-3">
                <i className="bi bi-search text-success fs-3 d-block mb-1"></i>
                <small className="fw-bold d-block">Parent Palm Traceability</small>
                <span className="text-secondary extra-small">Know mother tree origin</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Availability Card Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden mt-n5 position-relative" style={{ marginTop: '-4rem', zIndex: 10 }}>
            <div className="card-header bg-success text-white py-3 px-4 d-flex justify-content-between align-items-center">
              <div>
                <span className="badge bg-warning text-dark me-2">LIVE STOCK</span>
                <span className="fw-bold">Saplings Available Now</span>
              </div>
              <span className="badge bg-light text-success fw-bold">{currentBatch?.batchCode}</span>
            </div>

            <div className="card-body p-4">
              <div className="row align-items-center g-4">
                <div className="col-md-5">
                  <div className="rounded-3 overflow-hidden shadow-sm" style={{ maxHeight: '240px' }}>
                    <img 
                      src={currentBatch?.images[0]} 
                      alt={currentBatch?.name} 
                      className="img-fluid w-100 object-fit-cover"
                    />
                  </div>
                </div>

                <div className="col-md-7">
                  <h3 className="fw-bold text-dark mb-1">{currentBatch?.name}</h3>
                  <p className="text-muted small mb-3">
                    Age: <strong>{currentBatch?.age}</strong> | Height: <strong>{currentBatch?.height}</strong> | Mother Tree: <Link href={`/parent-palm/${currentBatch?.parentPalmCode}`} className="text-success fw-bold">{currentBatch?.parentPalmCode}</Link>
                  </p>

                  <div className="row text-center bg-light p-3 rounded-3 mb-3 border">
                    <div className="col-4 border-end">
                      <small className="text-muted d-block text-uppercase">Total</small>
                      <span className="fs-5 fw-bold text-dark">{currentBatch?.totalQuantity}</span>
                    </div>
                    <div className="col-4 border-end">
                      <small className="text-muted d-block text-uppercase">Booked / Sold</small>
                      <span className="fs-5 fw-bold text-primary">{currentBatch?.bookedQuantity}</span>
                    </div>
                    <div className="col-4">
                      <small className="text-muted d-block text-uppercase">Available</small>
                      <span className="fs-5 fw-bold text-success">{currentBatch?.availableQuantity}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between small fw-bold mb-1">
                      <span>Booking Progress</span>
                      <span className="text-success">{currentBatch?.bookedPercentage}% Booked</span>
                    </div>
                    <div className="progress" style={{ height: '12px' }}>
                      <div 
                        className="progress-bar bg-success progress-bar-striped progress-bar-animated" 
                        role="progressbar" 
                        style={{ width: `${currentBatch?.bookedPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <span className="fs-3 fw-bold text-success">₹{currentBatch?.price}</span>
                      <span className="text-muted small"> / sapling</span>
                    </div>
                    <div className="d-flex gap-2">
                      <Link href={`/batches/${currentBatch?.batchCode}`} className="btn btn-outline-secondary">
                        View Details
                      </Link>
                      <Link href={`/book/${currentBatch?.batchCode}`} className="btn btn-success fw-bold px-4">
                        <i className="bi bi-cart-plus me-1"></i> Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traceability Spotlight: Know Your Parent Palm */}
      <section className="py-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-success-subtle text-success border border-success px-3 py-2 rounded-pill fw-bold mb-2">
              <i className="bi bi-shield-lock-fill me-1"></i> PARENT PALM TRACEABILITY
            </span>
            <h2 className="fw-bold text-dark">Know Your Mother Palm</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '650px' }}>
              We don't sell anonymous saplings. Every batch is harvested from verified parent palms monitored on our farm for decades.
            </p>
          </div>

          <div className="row g-4">
            {motherPalms.map(palm => (
              <div key={palm.id} className="col-md-6">
                <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                  <div className="row g-0 h-100">
                    <div className="col-md-5">
                      <img 
                        src={palm.images[0]} 
                        alt={palm.name} 
                        className="h-100 w-100 object-fit-cover"
                        style={{ minHeight: '220px' }}
                      />
                    </div>
                    <div className="col-md-7">
                      <div className="card-body d-flex flex-column justify-content-between h-100">
                        <div>
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <span className="badge bg-dark">{palm.code}</span>
                            <span className="badge bg-warning text-dark"><i className="bi bi-calendar3 me-1"></i> {palm.age} Years Old</span>
                          </div>
                          <h5 className="fw-bold text-dark mb-1">{palm.name}</h5>
                          <p className="text-muted small mb-2"><i className="bi bi-geo-alt me-1"></i> {palm.location}</p>
                          <p className="card-text small text-secondary line-clamp-3">
                            {palm.yieldHistory}
                          </p>
                        </div>

                        <div className="pt-3 border-top mt-2">
                          <Link href={`/parent-palm/${palm.code}`} className="btn btn-sm btn-outline-success fw-bold w-100">
                            View Parent Palm Details <i className="bi bi-arrow-right ms-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Buy From Us Section */}
      <section className="py-5 bg-light">
        <div className="container py-3">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">Why Buy From Us?</h2>
            <p className="text-muted">Direct from our farm with full authenticity and care</p>
          </div>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100 rounded-4">
                <div className="bg-success-subtle text-success rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                  <i className="bi bi-tree fs-2"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Own Farm</h5>
                <p className="text-secondary small mb-0">Saplings are carefully raised in our own traditional grove with organic care.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100 rounded-4">
                <div className="bg-warning-subtle text-warning rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                  <i className="bi bi-bar-chart-steps fs-2"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Transparent Availability</h5>
                <p className="text-secondary small mb-0">Customers see exact batch numbers and live booking stock in real-time.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100 rounded-4">
                <div className="bg-info-subtle text-info rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                  <i className="bi bi-camera fs-2"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Actual Batch Photos</h5>
                <p className="text-secondary small mb-0">We display real photographs of the exact sapling batch offered.</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card border-0 shadow-sm text-center p-4 h-100 rounded-4">
                <div className="bg-success-subtle text-success rounded-circle d-inline-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px' }}>
                  <i className="bi bi-whatsapp fs-2"></i>
                </div>
                <h5 className="fw-bold text-dark mb-2">Direct Communication</h5>
                <p className="text-secondary small mb-0">Receive instant WhatsApp booking & courier dispatch notifications.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Reviews Teaser */}
      <section className="py-5 bg-white border-top">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <span className="text-warning"><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i><i className="bi bi-star-fill"></i></span>
              <h2 className="fw-bold text-dark mb-0">Farmer Feedback</h2>
            </div>
            <Link href="/reviews" className="btn btn-outline-success fw-bold">Read All Reviews</Link>
          </div>

          <div className="row g-4">
            {reviews.map(r => (
              <div key={r.id} className="col-md-6">
                <div className="card border-0 bg-light p-4 rounded-4 shadow-sm h-100">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <h6 className="fw-bold mb-0 text-dark">{r.customerName}</h6>
                      <small className="text-muted">{r.location}</small>
                    </div>
                    {r.verified && (
                      <span className="badge bg-success-subtle text-success border border-success">
                        <i className="bi bi-check-circle-fill me-1"></i> Verified Purchase
                      </span>
                    )}
                  </div>
                  <p className="text-secondary small mb-2">"{r.comment}"</p>
                  <small className="text-muted fw-bold">Batch: {r.batchCode} | Qty: {r.quantity} Saplings</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
