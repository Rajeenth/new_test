import Link from 'next/link';
import { DataStore } from '@/lib/dataStore';
import { notFound } from 'next/navigation';
import ImageCarousel from '@/components/ImageCarousel';

export const dynamic = 'force-dynamic';

export default async function BatchDetailPage({
  params
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const batch = DataStore.getBatchByCode(code);
  if (!batch) {
    notFound();
  }

  const motherPalm = DataStore.getParentPalmByCode(batch.parentPalmCode);

  return (
    <>
      <section className="bg-dark text-white py-4 position-relative overflow-hidden">
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 opacity-25"
          style={{
            backgroundImage: "url('/images/placeholders/coconut.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)'
          }}
        ></div>
        <div className="container position-relative">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-2">
              <li className="breadcrumb-item"><Link href="/batches" className="text-success text-decoration-none">Batches</Link></li>
              <li className="breadcrumb-item active text-light" aria-current="page">{batch.batchCode}</li>
            </ol>
          </nav>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
            <div>
              <span className="badge bg-success px-3 py-2 me-2">{batch.status}</span>
              
              {/* Social Proof Views Counter */}
              <span className="badge bg-danger bg-opacity-75 px-3 py-2 me-2">
                <i className="bi bi-eye-fill me-1"></i> 🔥 {batch.viewsCount || 142} People Viewed This Batch
              </span>

              <h1 className="fw-bold mb-0 text-light d-inline-block align-middle fs-2 mt-2 mt-md-0">{batch.name}</h1>
            </div>
            <span className="fs-3 fw-bold text-success">₹{batch.price} <small className="fs-6 text-muted font-normal">/ sapling</small></span>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            
            {/* Left Column: Carousel & Notes */}
            <div className="col-md-7">
              {/* Bootstrap Carousel for Multiple Batch Images */}
              <div className="mb-4">
                <ImageCarousel images={batch.images} title={batch.name} carouselId="batchDetailCarousel" />
              </div>

              {/* Admin Description & Batch Notes */}
              <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-white">
                <h5 className="fw-bold text-dark mb-3"><i className="bi bi-file-text me-2 text-success"></i> Batch Notes</h5>
                <p className="text-secondary">{batch.description}</p>
                <div className="alert alert-success border-success-subtle mb-0 small">
                  <i className="bi bi-truck me-2"></i> <strong>Dispatch Schedule:</strong> Saplings are prepared & packed next working day upon booking confirmation.
                </div>
              </div>

              {/* Traceability Card: Connected Parent Palm */}
              {motherPalm && (
                <div className="card border-0 shadow-sm rounded-4 p-4 border-start border-success border-4 bg-white">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <span className="badge bg-success mb-1">PARENT PALM TRACEABILITY</span>
                      <h5 className="fw-bold text-dark mb-0">Mother Tree: {motherPalm.code}</h5>
                    </div>
                    <span className="badge bg-warning text-dark">{motherPalm.age} Years Old</span>
                  </div>
                  <p className="text-secondary small mb-3">
                    These saplings were harvested directly from Mother Palm <strong>{motherPalm.code}</strong> located in <em>{motherPalm.location}</em>.
                  </p>
                  <div className="p-3 bg-light rounded-3 mb-3 small text-secondary">
                    <strong>Yield Record:</strong> {motherPalm.yieldHistory}
                  </div>
                  <Link href={`/parent-palm/${motherPalm.code}`} className="btn btn-outline-success btn-sm fw-bold align-self-start">
                    View Mother Tree Photos & Profile <i className="bi bi-arrow-right ms-1"></i>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Column: Key Info & Booking Box */}
            <div className="col-md-5">
              <div className="card border-0 shadow-lg rounded-4 p-4 sticky-top" style={{ top: '90px' }}>
                <h4 className="fw-bold text-dark mb-4">Batch Summary & Dates</h4>

                <table className="table table-borderless mb-4">
                  <tbody>
                    <tr className="border-bottom">
                      <td className="text-muted py-2">Batch ID</td>
                      <td className="fw-bold text-dark text-end py-2">{batch.batchCode}</td>
                    </tr>
                    <tr className="border-bottom">
                      <td className="text-muted py-2">Coconut Cut Date</td>
                      <td className="fw-bold text-dark text-end py-2">{batch.harvestDate || '2026-01-05'}</td>
                    </tr>
                    <tr className="border-bottom">
                      <td className="text-muted py-2">Seeded On Date</td>
                      <td className="fw-bold text-success text-end py-2">{batch.seededDate || '2026-01-15'}</td>
                    </tr>
                    <tr className="border-bottom">
                      <td className="text-muted py-2">Calculated Sapling Age</td>
                      <td className="fw-bold text-dark text-end py-2"><span className="badge bg-success-subtle text-success border border-success">{batch.age}</span></td>
                    </tr>
                    <tr className="border-bottom">
                      <td className="text-muted py-2">Calculated Avg Height</td>
                      <td className="fw-bold text-dark text-end py-2">{batch.height}</td>
                    </tr>
                    <tr className="border-bottom">
                      <td className="text-muted py-2">Total Produced</td>
                      <td className="fw-bold text-dark text-end py-2">{batch.totalQuantity}</td>
                    </tr>
                    <tr className="border-bottom">
                      <td className="text-muted py-2">Booked / Sold Quantity</td>
                      <td className="fw-bold text-primary text-end py-2 fs-6">{batch.bookedQuantity}</td>
                    </tr>
                    <tr className="border-bottom">
                      <td className="text-muted py-2">Currently Available</td>
                      <td className="fw-bold text-success text-end py-2 fs-5">{batch.availableQuantity}</td>
                    </tr>
                    <tr>
                      <td className="text-muted py-2">Unit Price</td>
                      <td className="fw-bold text-success text-end py-2 fs-5">₹{batch.price}</td>
                    </tr>
                  </tbody>
                </table>

                {/* Progress Bar Visual */}
                <div className="mb-4">
                  <div className="d-flex justify-content-between small fw-bold mb-1">
                    <span>Stock Status</span>
                    <span className="text-success">{batch.bookedPercentage}% Booked</span>
                  </div>
                  <div className="progress" style={{ height: '10px' }}>
                    <div className="progress-bar bg-success" style={{ width: `${batch.bookedPercentage}%` }}></div>
                  </div>
                  <small className="text-muted d-block text-center mt-2">{batch.availableQuantity} saplings left in stock</small>
                </div>

                <Link href={`/book/${batch.batchCode}`} className="btn btn-success btn-lg fw-bold w-100 shadow py-3">
                  <i className="bi bi-cart-check-fill me-2"></i> Book This Batch Now
                </Link>

                <div className="text-center mt-3">
                  <a href="https://wa.me/919486880641" target="_blank" rel="noreferrer" className="text-success small fw-bold text-decoration-none">
                    <i className="bi bi-whatsapp me-1"></i> Have questions? Chat with our Farm Admin
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Mobile Book Button */}
      <div className="fixed-bottom bg-white p-3 border-top d-md-none shadow-lg z-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div>
            <span className="fw-bold text-dark">{batch.batchCode}</span>
            <small className="text-muted d-block">₹{batch.price} / sapling</small>
          </div>
          <span className="badge bg-success">{batch.availableQuantity} Available</span>
        </div>
        <Link href={`/book/${batch.batchCode}`} className="btn btn-success w-100 fw-bold py-2">
          Book This Batch
        </Link>
      </div>
    </>
  );
}
