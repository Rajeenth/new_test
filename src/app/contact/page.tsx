'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    location: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', mobile: '', location: '', message: '' });
      } else {
        alert('Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      alert('Error submitting enquiry.');
    } finally {
      setSubmitting(false);
    }
  };

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
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-2 fw-bold">DIRECT FARM SUPPORT</span>
          <h1 className="display-4 fw-bold">Contact Eathamozhy Farm</h1>
          <p className="lead mb-0">We are here to answer your questions about coconut varieties, soil preparation, and bulk sapling orders.</p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            
            <div className="col-md-5">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white d-flex flex-column justify-content-between">
                <div>
                  <h4 className="fw-bold text-dark mb-3"><i className="bi bi-geo-alt-fill me-2 text-success"></i> Farm Location</h4>
                  <p className="text-secondary small mb-4">
                    Eathamozhy Village, Kanyakumari District,<br />
                    Tamil Nadu, India - 629501
                  </p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-1">Phone & WhatsApp</h6>
                  <p className="text-secondary small mb-1"><i className="bi bi-telephone me-1 text-success"></i> +91 94868 80641</p>
                  <p className="text-secondary small"><i className="bi bi-whatsapp me-1 text-success"></i> +91 94868 80641</p>
                </div>

                <div className="mb-4">
                  <h6 className="fw-bold text-dark mb-1">Email</h6>
                  <p className="text-secondary small">support@eathamozhycoconut.com</p>
                </div>

                <div className="d-flex flex-column gap-2 mt-auto">
                  <a href="https://wa.me/919486880641" target="_blank" rel="noreferrer" className="btn btn-success fw-bold py-2">
                    <i className="bi bi-whatsapp me-1"></i> WhatsApp Us Directly
                  </a>
                  <a href="tel:+919486880641" className="btn btn-outline-dark fw-bold py-2">
                    <i className="bi bi-telephone-fill me-1"></i> Call Us Now
                  </a>
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="card border-0 shadow-sm rounded-4 p-4 h-100 bg-white">
                <h4 className="fw-bold text-dark mb-3"><i className="bi bi-envelope-paper me-2 text-success"></i> Send Farm Enquiry</h4>
                
                {submitted && (
                  <div className="alert alert-success rounded-4 p-3 mb-4">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    <strong>Enquiry Received!</strong> Our farm admin team will call/WhatsApp you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Your Name *</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        required 
                        placeholder="Full name" 
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label small fw-bold">Mobile Number *</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        required 
                        placeholder="10-digit mobile" 
                        value={formData.mobile}
                        onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">District & Location</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="e.g. Tirunelveli, Tamil Nadu" 
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label small fw-bold">Enquiry / Sapling Requirement *</label>
                      <textarea 
                        className="form-control" 
                        rows={4} 
                        required
                        placeholder="How many saplings are you looking for or what questions do you have?"
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                      ></textarea>
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn btn-success btn-lg fw-bold w-100" disabled={submitting}>
                        {submitting ? 'Submitting...' : 'Submit Enquiry'} <i className="bi bi-send ms-1"></i>
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
