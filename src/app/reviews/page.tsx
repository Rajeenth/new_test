import Link from 'next/link';
import { DataStore } from '@/lib/dataStore';

export default function ReviewsPage() {
  const reviews = DataStore.getReviews();

  return (
    <>
      <section className="bg-dark text-white py-5 text-center position-relative overflow-hidden">
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 opacity-30"
          style={{
            backgroundImage: "url('/images/placeholders/coconut2.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        ></div>
        <div className="container position-relative py-3">
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-2 fw-bold">FARMER REVIEWS</span>
          <h1 className="display-4 fw-bold">Customer Experiences</h1>
          <p className="lead mx-auto" style={{ maxWidth: '650px' }}>
            Verified feedback from agricultural buyers, home growers, and farm owners across South India.
          </p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <div className="row g-4">
            {reviews.map(r => (
              <div key={r.id} className="col-md-6">
                <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                      <h5 className="fw-bold text-dark mb-0">{r.customerName}</h5>
                      <small className="text-muted"><i className="bi bi-geo-alt me-1"></i> {r.location}</small>
                    </div>
                    {r.verified && (
                      <span className="badge bg-success-subtle text-success border border-success">
                        <i className="bi bi-patch-check-fill me-1"></i> Verified
                      </span>
                    )}
                  </div>

                  <div className="mb-3 text-warning">
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                    <i className="bi bi-star-fill"></i>
                  </div>

                  <p className="card-text text-secondary mb-3">"{r.comment}"</p>

                  <div className="pt-3 border-top d-flex justify-content-between text-muted small">
                    <span>Batch: <strong>{r.batchCode}</strong></span>
                    <span>Order: <strong>{r.quantity} Saplings</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link href="/batches" className="btn btn-success btn-lg fw-bold px-4">
              Book Your Saplings Now <i className="bi bi-arrow-right me-1"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
