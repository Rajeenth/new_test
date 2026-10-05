import Link from 'next/link';
import { DataStore } from '@/lib/dataStore';

export default function AdminDashboardPage() {
  const batches = DataStore.getBatches();
  const bookings = DataStore.getBookings();

  const totalProduced = batches.reduce((acc, b) => acc + b.totalQuantity, 0);
  const totalBooked = batches.reduce((acc, b) => acc + b.bookedQuantity, 0);
  const totalAvailable = batches.reduce((acc, b) => acc + b.availableQuantity, 0);

  return (
    <>
      <section className="bg-dark text-white py-4 border-bottom border-success border-3">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-danger mb-1">SECURE ADMIN PORTAL</span>
              <h1 className="fw-bold mb-0 text-light">Eathamozhy Farm Admin Dashboard</h1>
            </div>
            <Link href="/" className="btn btn-outline-light btn-sm">
              <i className="bi bi-box-arrow-right me-1"></i> Exit Admin
            </Link>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          
          {/* Executive Stat Cards */}
          <div className="row g-4 mb-5">
            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-primary border-4">
                <small className="text-muted d-block text-uppercase fw-bold">Total Produced</small>
                <h2 className="fw-bold text-dark mb-0">{totalProduced.toLocaleString()}</h2>
                <small className="text-secondary">All Sapling Batches</small>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-success border-4">
                <small className="text-muted d-block text-uppercase fw-bold">Total Booked</small>
                <h2 className="fw-bold text-success mb-0">{totalBooked.toLocaleString()}</h2>
                <small className="text-secondary">Confirmed Orders</small>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-warning border-4">
                <small className="text-muted d-block text-uppercase fw-bold">Available Inventory</small>
                <h2 className="fw-bold text-warning mb-0">{totalAvailable.toLocaleString()}</h2>
                <small className="text-secondary">Live Stock Remaining</small>
              </div>
            </div>

            <div className="col-md-3">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white border-start border-danger border-4">
                <small className="text-muted d-block text-uppercase fw-bold">Active Orders</small>
                <h2 className="fw-bold text-danger mb-0">{bookings.length}</h2>
                <small className="text-secondary">Requires Processing</small>
              </div>
            </div>
          </div>

          {/* Integration Status Badges */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-white">
            <h5 className="fw-bold text-dark mb-3"><i className="bi bi-cpu me-2 text-success"></i> System Integrations</h5>
            <div className="d-flex flex-wrap gap-3">
              <span className="badge bg-success-subtle text-success border border-success p-2">
                <i className="bi bi-whatsapp me-1"></i> WhatsApp Business API: Connected
              </span>
              <span className="badge bg-success-subtle text-success border border-success p-2">
                <i className="bi bi-credit-card me-1"></i> Payment Gateway: Active
              </span>
              <span className="badge bg-success-subtle text-success border border-success p-2">
                <i className="bi bi-database me-1"></i> Database: Active (MongoDB / Server Engine)
              </span>
              <span className="badge bg-info-subtle text-info border border-info p-2">
                <i className="bi bi-shield-lock me-1"></i> Audit Logging: Enabled
              </span>
            </div>
          </div>

          {/* Quick Admin Actions */}
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                <h5 className="fw-bold text-dark mb-2"><i className="bi bi-grid-3x3-gap text-success me-2"></i> Batch Management</h5>
                <p className="text-secondary small mb-3">Create new batches, assign Mother Palms, set prices, photo gallery & statuses.</p>
                <Link href="/admin/batches" className="btn btn-outline-success fw-bold mt-auto">
                  Manage Batches & Photos <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                <h5 className="fw-bold text-dark mb-2"><i className="bi bi-bag-check text-primary me-2"></i> Order Management</h5>
                <p className="text-secondary small mb-3">View bookings, check payment screenshots, update status & enter tracking IDs.</p>
                <Link href="/admin/orders" className="btn btn-outline-primary fw-bold mt-auto">
                  Manage Customer Orders <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                <h5 className="fw-bold text-dark mb-2"><i className="bi bi-envelope-paper text-warning me-2"></i> Customer Enquiries</h5>
                <p className="text-secondary small mb-3">View contact form enquiries, customer questions, locations & reply directly on WhatsApp.</p>
                <Link href="/admin/enquiries" className="btn btn-outline-warning text-dark fw-bold mt-auto">
                  View Customer Enquiries <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                <h5 className="fw-bold text-dark mb-2"><i className="bi bi-tree-fill text-success me-2"></i> Mother Tree Genetics</h5>
                <p className="text-secondary small mb-3">Add and update Mother Palms (Parent Trees), yield history, age, plot location & photos.</p>
                <Link href="/admin/mother-trees" className="btn btn-outline-success fw-bold mt-auto">
                  Manage Mother Trees <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card border-0 shadow-sm rounded-4 p-4 bg-white h-100">
                <h5 className="fw-bold text-dark mb-2"><i className="bi bi-box-seam text-secondary me-2"></i> Inventory Audit</h5>
                <p className="text-secondary small mb-3">Adjust inventory for damaged/rejected saplings with mandatory audit log reasons.</p>
                <Link href="/admin/inventory" className="btn btn-outline-secondary fw-bold mt-auto">
                  Adjust Inventory Audit <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
