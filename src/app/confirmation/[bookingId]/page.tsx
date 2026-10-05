import Link from 'next/link';
import { DataStore } from '@/lib/dataStore';
import { notFound } from 'next/navigation';

export default async function BookingConfirmationPage({
  params
}: {
  params: Promise<{ bookingId: string }>;
}) {
  const { bookingId } = await params;
  const booking = DataStore.getBookingById(bookingId);
  if (!booking) {
    notFound();
  }

  return (
    <>
      <section className="bg-success text-white py-5 text-center">
        <div className="container py-3">
          <div className="display-1 mb-2">🎉</div>
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-2 fw-bold">PAYMENT SUCCESSFUL</span>
          <h1 className="display-4 fw-bold">Booking Confirmed!</h1>
          <p className="lead mb-0">Thank you for supporting Eathamozhy Coconut Farm.</p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container" style={{ maxWidth: '800px' }}>
          
          <div className="card border-0 shadow-lg rounded-4 p-4 mb-4 bg-white">
            <div className="text-center border-bottom pb-4 mb-4">
              <small className="text-muted d-block text-uppercase">YOUR UNIQUE BOOKING REFERENCE</small>
              <h2 className="fw-bold text-success display-6 mb-1">{booking.bookingId}</h2>
              <span className="badge bg-success-subtle text-success border border-success">
                <i className="bi bi-check-circle-fill me-1"></i> PAID (₹{booking.totalAmount.toLocaleString()})
              </span>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <h6 className="fw-bold text-dark mb-2">Booking Summary</h6>
                <ul className="list-unstyled text-secondary small">
                  <li className="mb-1">Batch Code: <strong className="text-dark">{booking.batchCode}</strong></li>
                  <li className="mb-1">Quantity: <strong className="text-dark">{booking.quantity} Saplings</strong></li>
                  <li className="mb-1">Expected Delivery: <strong className="text-success fw-bold">{booking.expectedDeliveryDate || 'Within 7 Days'}</strong></li>
                  <li className="mb-1">Subtotal: <strong className="text-dark">₹{booking.subtotal.toLocaleString()}</strong></li>
                  <li className="mb-1">Delivery Charge: <strong className="text-dark">₹{booking.deliveryCharge}</strong></li>
                  <li className="mb-1">Total Paid: <strong className="text-success fw-bold">₹{booking.totalAmount.toLocaleString()}</strong></li>
                </ul>
              </div>

              <div className="col-md-6">
                <h6 className="fw-bold text-dark mb-2">Delivery Details</h6>
                <p className="text-secondary small mb-0">
                  <strong>{booking.customerName}</strong><br />
                  {booking.address}<br />
                  {booking.district}, {booking.state} - {booking.pinCode}<br />
                  Phone: {booking.mobile} | WhatsApp: {booking.whatsapp}
                </p>
              </div>
            </div>

            {/* Simulated WhatsApp Notification Previews */}
            <div className="border-top pt-4 mb-4">
              <h6 className="fw-bold text-dark mb-3"><i className="bi bi-whatsapp me-2 text-success"></i> WhatsApp Notification Sent</h6>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="p-3 bg-success-subtle border border-success rounded-3 small">
                    <small className="fw-bold text-success d-block mb-1">📱 Sent to Customer ({booking.whatsapp})</small>
                    <p className="mb-0 text-dark font-monospace" style={{ fontSize: '0.8rem' }}>
                      🌴 <strong>Eathamozhy Coconut Farm</strong><br />
                      Your booking is confirmed!<br />
                      <strong>ID:</strong> {booking.bookingId}<br />
                      <strong>Batch:</strong> {booking.batchCode}<br />
                      <strong>Qty:</strong> {booking.quantity} saplings<br />
                      <strong>Expected Delivery:</strong> {booking.expectedDeliveryDate || 'Next week'}<br />
                      We will update you when dispatched.
                    </p>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="p-3 bg-light border rounded-3 small">
                    <small className="fw-bold text-dark d-block mb-1">📋 Sent to Farm Admin</small>
                    <p className="mb-0 text-dark font-monospace" style={{ fontSize: '0.8rem' }}>
                      🌴 <strong>NEW BOOKING</strong><br />
                      <strong>ID:</strong> {booking.bookingId}<br />
                      <strong>Customer:</strong> {booking.customerName}<br />
                      <strong>Location:</strong> {booking.district}<br />
                      <strong>Qty:</strong> {booking.quantity} Saplings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 justify-content-center">
              <Link href={`/tracking?id=${booking.bookingId}&mobile=${booking.mobile}`} className="btn btn-success fw-bold px-4">
                <i className="bi bi-truck me-1"></i> Track Booking Status
              </Link>
              <a href="https://wa.me/919486880641" target="_blank" rel="noreferrer" className="btn btn-outline-success fw-bold">
                <i className="bi bi-whatsapp me-1"></i> WhatsApp Farm Support
              </a>
              <Link href="/" className="btn btn-outline-secondary">
                Return to Home
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
