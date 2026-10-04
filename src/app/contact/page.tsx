'use client';

import Link from 'next/link';

export default function ContactPage() {
  return (
    <>
      <section className="bg-dark text-white py-5 text-center position-relative overflow-hidden">
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 opacity-30"
          style={{
            backgroundImage: "url('/images/placeholders/coconut1.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.6)'
          }}
        ></div>
        <div className="container position-relative py-3">
          <span className="badge bg-success px-3 py-2 rounded-pill mb-2 fw-bold">GET IN TOUCH</span>
          <h1 className="display-4 fw-bold">Contact Our Farm</h1>
          <p className="lead mx-auto" style={{ maxWidth: '650px' }}>
            We welcome farmers and agricultural buyers to visit our farm in Eathamozhy or reach out directly.
          </p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            
            <div className="col-md-5">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                <h4 className="fw-bold text-dark mb-4"><i className="bi bi-geo-alt-fill text-danger me-2"></i> Farm Location & Details</h4>

                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-1">Farm Name</h6>
                  <p className="text-secondary small">Eathamozhy Coconut Farm</p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-1">Address</h6>
                  <p className="text-secondary small">
                    Eathamozhy Village, Rajakkamangalam Block,<br />
                    Kanyakumari District, Tamil Nadu - 629501
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-1">Phone & WhatsApp</h6>
                  <p className="text-secondary small mb-1"><i className="bi bi-telephone me-1 text-success"></i> +91 98765 43210</p>
                  <p className="text-secondary small"><i className="bi bi-whatsapp me-1 text-success"></i> +91 98765 43210</p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-1">Email</h6>
                  <p className="text-secondary small">support@eathamozhycoconut.com</p>
                </div>

                <div className="d-flex flex-column gap-2 mt-auto">
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn btn-success fw-bold py-2">
                    <i className="bi bi-whatsapp me-1"></i> WhatsApp Us Directly
                  </a>
                  <a href="tel:+919876543210" className="btn btn-outline-dark fw-bold py-2">
                    <i className="bi bi-telephone-fill me-1"></i> Call Us Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                <h4 className="fw-bold text-dark mb-3"><i className="bi bi-envelope-paper me-2 text-success"></i> Send Farm Enquiry</h4>
                
                <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! Our farm team will contact you shortly.'); }}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Your Name *</label>
                      <input type="text" className="form-control" required placeholder="Full name" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Mobile Number *</label>
                      <input type="tel" className="form-control" required placeholder="10-digit mobile" />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">District & Location</label>
                      <input type="text" className="form-control" placeholder="e.g. Tirunelveli, Tamil Nadu" />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Enquiry / Sapling Requirement</label>
                      <textarea className="form-control" rows={4} placeholder="How many saplings are you looking for or what questions do you have?"></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-success btn-lg fw-bold w-100">
                        Submit Enquiry <i className="bi bi-send ms-1"></i>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
