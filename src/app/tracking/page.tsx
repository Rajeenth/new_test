'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function TrackingContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';
  const initialMobile = searchParams.get('mobile') || '';

  const [bookingId, setBookingId] = useState(initialId);
  const [mobile, setMobile] = useState(initialMobile);
  const [booking, setBooking] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTracking = async (id: string, mob: string) => {
    if (!id) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/bookings/${encodeURIComponent(id)}?mobile=${encodeURIComponent(mob)}`);
      if (res.ok) {
        const data = await res.json();
        setBooking(data);
      } else {
        setBooking(null);
        setError('No booking found matching that Booking ID and Mobile number.');
      }
    } catch (err) {
      setError('Error fetching tracking info.');
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  useEffect(() => {
    if (initialId) {
      fetchTracking(initialId, initialMobile);
    }
  }, [initialId, initialMobile]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTracking(bookingId, mobile);
  };

  const steps = ['Confirmed', 'Preparing', 'Packed', 'Dispatched', 'Delivered'];
  const currentStepIndex = booking ? steps.indexOf(booking.bookingStatus) : -1;

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
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-2 fw-bold">REAL-TIME STATUS</span>
          <h1 className="fw-bold mb-0 text-light">Track Your Sapling Booking</h1>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container" style={{ maxWidth: '800px' }}>
          
          {/* Search Card */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-white">
            <form onSubmit={handleSearch} className="row g-3 align-items-end">
              <div className="col-md-5">
                <label className="form-label small fw-bold text-dark">Booking ID *</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. EM-0926-A-1047"
                  value={bookingId}
                  onChange={e => setBookingId(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-5">
                <label className="form-label small fw-bold text-dark">Mobile Number (Optional)</label>
                <input 
                  type="tel" 
                  className="form-control" 
                  placeholder="10-digit mobile number"
                  value={mobile}
                  onChange={e => setMobile(e.target.value)}
                />
              </div>

              <div className="col-md-2">
                <button type="submit" className="btn btn-success fw-bold w-100" disabled={loading}>
                  {loading ? 'Searching...' : 'Track'}
                </button>
              </div>
            </form>
          </div>

          {error && (
            <div className="alert alert-danger rounded-4 p-4 text-center mb-4">
              <i className="bi bi-exclamation-triangle-fill fs-4 d-block mb-2"></i>
              {error}
            </div>
          )}

          {booking && (
            <div className="card border-0 shadow-lg rounded-4 p-4 bg-white">
              <div className="d-flex flex-wrap justify-content-between align-items-center border-bottom pb-3 mb-4">
                <div>
                  <small className="text-muted text-uppercase d-block">Booking ID</small>
                  <h3 className="fw-bold text-success mb-0">{booking.bookingId}</h3>
                </div>
                <div>
                  <span className="badge bg-success fs-6 me-2">PAID</span>
                  <span className="badge bg-dark fs-6">{booking.bookingStatus}</span>
                </div>
              </div>

              {/* Status Timeline Bar */}
              <div className="py-3 mb-4">
                <h6 className="fw-bold text-dark mb-4 text-center">Fulfillment Timeline</h6>
                
                <div className="position-relative mx-3">
                  <div className="progress" style={{ height: '6px' }}>
                    <div 
                      className="progress-bar bg-success" 
                      style={{ width: `${Math.max(0, (currentStepIndex / (steps.length - 1)) * 100)}%` }}
                    ></div>
                  </div>

                  <div className="d-flex justify-content-between position-relative mt-n3" style={{ marginTop: '-20px' }}>
                    {steps.map((st, idx) => {
                      const isDone = idx <= currentStepIndex;
                      return (
                        <div key={st} className="text-center">
                          <div 
                            className={`rounded-circle d-inline-flex align-items-center justify-content-center border border-2 ${isDone ? 'bg-success text-white border-success' : 'bg-white text-muted border-secondary'}`} 
                            style={{ width: '32px', height: '32px', fontSize: '0.8rem' }}
                          >
                            {isDone ? <i className="bi bi-check-lg"></i> : idx + 1}
                          </div>
                          <small className={`d-block mt-2 font-semibold ${isDone ? 'text-success fw-bold' : 'text-muted'}`}>
                            {st}
                          </small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Order Info & Courier Dispatch Details */}
              <div className="row g-3 bg-light p-3 rounded-4 border">
                <div className="col-md-6">
                  <small className="text-muted d-block">Batch Code:</small>
                  <strong className="text-dark">{booking.batchCode}</strong>
                </div>

                <div className="col-md-6">
                  <small className="text-muted d-block">Quantity:</small>
                  <strong className="text-dark">{booking.quantity} Saplings</strong>
                </div>

                <div className="col-md-6">
                  <small className="text-muted d-block">Customer Name:</small>
                  <strong className="text-dark">{booking.customerName} ({booking.district})</strong>
                </div>

                <div className="col-md-6">
                  <small className="text-muted d-block">Booking Date:</small>
                  <strong className="text-dark">{new Date(booking.createdAt).toLocaleDateString()}</strong>
                </div>
              </div>

              {/* Dispatch Info Block */}
              {booking.bookingStatus === 'Dispatched' || booking.bookingStatus === 'Delivered' ? (
                <div className="alert alert-success border-success-subtle mt-4 p-3 rounded-3">
                  <h6 className="fw-bold mb-2"><i className="bi bi-box-line me-2"></i> Shipment Dispatch Information</h6>
                  <div className="row g-2 small">
                    <div className="col-6">Courier Partner: <strong>{booking.courierName || 'Professional Couriers'}</strong></div>
                    <div className="col-6 text-end">Tracking ID: <strong className="font-monospace text-dark">{booking.trackingId || 'PR12948572IN'}</strong></div>
                    <div className="col-6">Dispatch Date: <strong>{booking.dispatchDate || 'Recent'}</strong></div>
                  </div>
                  <div className="mt-3 text-end">
                    <a href={`https://www.google.com/search?q=${booking.trackingId}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-success fw-bold">
                      <i className="bi bi-box-arrow-up-right me-1"></i> Track Shipment on Courier Site
                    </a>
                  </div>
                </div>
              ) : (
                <div className="alert alert-info border-info-subtle mt-4 p-3 rounded-3 small">
                  <i className="bi bi-clock-history me-2"></i> Your saplings are currently being carefully prepared and packaged in our nursery crate. Courier tracking details will appear here once dispatched.
                </div>
              )}

            </div>
          )}

          {!booking && searched && !error && (
            <div className="text-center py-4 text-muted">
              Enter a valid Booking ID above to trace status.
            </div>
          )}

        </div>
      </section>
    </>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="text-center py-5">Loading tracking...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
