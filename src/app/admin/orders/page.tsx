'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');

  // Modal / Dispatch State
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [courierName, setCourierName] = useState('Professional Couriers');
  const [trackingId, setTrackingId] = useState('');

  // Screenshot Preview Modal
  const [previewScreenshot, setPreviewScreenshot] = useState<string | null>(null);

  const fetchOrders = async () => {
    const res = await fetch('/api/bookings');
    const data = await res.json();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    if (status === 'Dispatched') {
      const ord = orders.find(o => o.bookingId === orderId);
      setSelectedOrder(ord);
      return;
    }

    await updateOrder(orderId, status);
  };

  const updateOrder = async (orderId: string, status: string, courier?: string, trackId?: string) => {
    try {
      const res = await fetch(`/api/bookings/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, courierName: courier, trackingId: trackId })
      });

      if (res.ok) {
        alert(`Order ${orderId} updated to "${status}". Inventory & payment records synchronized!`);
        fetchOrders();
        setSelectedOrder(null);
      }
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const filteredOrders = orders.filter(o => {
    const matchSearch = o.bookingId.toLowerCase().includes(search.toLowerCase()) || 
                        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
                        o.mobile.includes(search);
    const matchStatus = filterStatus === 'ALL' || o.bookingStatus === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <section className="bg-dark text-white py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <span className="badge bg-primary me-2">ORDERS ADMIN</span>
            <h3 className="fw-bold mb-0 text-light d-inline align-middle">Order & Payment Verification</h3>
          </div>
          <Link href="/admin" className="btn btn-outline-light btn-sm">
            <i className="bi bi-arrow-left me-1"></i> Back to Admin Dashboard
          </Link>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          
          {/* Search & Filter Bar */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
            <div className="row g-3">
              <div className="col-md-6">
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Search by Booking ID, Customer Name, or Mobile..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <select 
                  className="form-select"
                  value={filterStatus}
                  onChange={e => setFilterStatus(e.target.value)}
                >
                  <option value="ALL">All Order Statuses</option>
                  <option value="Payment review">Payment review (New Orders)</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Packed">Packed</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Orders Table */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h4 className="fw-bold text-dark mb-3">Customer Bookings ({filteredOrders.length})</h4>

            {loading ? (
              <div className="text-center py-4">Loading orders...</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Booking ID</th>
                      <th>Customer Details</th>
                      <th>Expected Delivery</th>
                      <th>Batch</th>
                      <th>Qty</th>
                      <th>Amount</th>
                      <th>UPI & Screenshot</th>
                      <th>Fulfillment Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map(ord => (
                      <tr key={ord.id}>
                        <td><strong className="text-success">{ord.bookingId}</strong></td>
                        <td>
                          <strong className="d-block">{ord.customerName}</strong>
                          <small className="text-muted"><i className="bi bi-phone me-1"></i>{ord.mobile} | {ord.district}</small>
                        </td>
                        <td><span className="badge bg-success-subtle text-success border me-1">{ord.expectedDeliveryDate || 'N/A'}</span></td>
                        <td><span className="badge bg-secondary">{ord.batchCode}</span></td>
                        <td><strong className="fs-6">{ord.quantity} Saplings</strong></td>
                        <td><strong className="text-success">₹{ord.totalAmount.toLocaleString()}</strong></td>
                        <td>
                          <span className="badge bg-success-subtle text-success border border-success d-block mb-1">
                            rajeenth1@ybl
                          </span>
                          {ord.paymentScreenshotUrl ? (
                            <button 
                              className="btn btn-sm btn-outline-primary py-0 text-nowrap"
                              onClick={() => setPreviewScreenshot(ord.paymentScreenshotUrl)}
                            >
                              <i className="bi bi-image me-1"></i> View Screenshot
                            </button>
                          ) : (
                            <small className="text-muted extra-small">Via WhatsApp</small>
                          )}
                        </td>
                        <td>
                          <select 
                            className={`form-select form-select-sm fw-bold ${ord.bookingStatus === 'Payment review' ? 'border-warning bg-warning-subtle text-dark' : 'border-success text-success'}`}
                            value={ord.bookingStatus}
                            onChange={(e) => handleStatusChange(ord.bookingId, e.target.value)}
                          >
                            <option value="Payment review">Payment review</option>
                            <option value="Confirmed">Confirmed</option>
                            <option value="Preparing">Preparing</option>
                            <option value="Packed">Packed</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td>
                          <a href={`https://wa.me/91${ord.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-success">
                            <i className="bi bi-whatsapp"></i> Chat
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Screenshot Preview Modal */}
          {previewScreenshot && (
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex align-items-center justify-content-center z-3">
              <div className="card border-0 shadow-lg rounded-4 p-3 bg-white" style={{ maxWidth: '500px', width: '90%' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold mb-0">Payment Screenshot Preview</h6>
                  <button className="btn-close" onClick={() => setPreviewScreenshot(null)}></button>
                </div>
                <img src={previewScreenshot} alt="Payment Screenshot" className="img-fluid rounded border" style={{ maxHeight: '450px', objectFit: 'contain' }} />
                <button className="btn btn-dark btn-sm mt-3 w-100" onClick={() => setPreviewScreenshot(null)}>Close Preview</button>
              </div>
            </div>
          )}

          {/* Dispatch Modal */}
          {selectedOrder && (
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-3">
              <div className="card border-0 shadow-lg rounded-4 p-4 bg-white" style={{ maxWidth: '500px', width: '90%' }}>
                <h4 className="fw-bold text-dark mb-3"><i className="bi bi-truck me-2 text-success"></i> Dispatch Order {selectedOrder.bookingId}</h4>
                <p className="text-secondary small mb-3">Entering courier & tracking details will save the dispatch record.</p>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Courier Partner Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={courierName}
                    onChange={e => setCourierName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Tracking ID / Consignment No. *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. PR12948572IN"
                    value={trackingId}
                    onChange={e => setTrackingId(e.target.value)}
                  />
                </div>

                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button className="btn btn-outline-secondary" onClick={() => setSelectedOrder(null)}>Cancel</button>
                  <button 
                    className="btn btn-success fw-bold"
                    onClick={() => updateOrder(selectedOrder.bookingId, 'Dispatched', courierName, trackingId)}
                  >
                    Save & Dispatch
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
