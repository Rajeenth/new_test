import Link from 'next/link';
import { DataStore } from '@/lib/dataStore';

export default function FAQPage() {
  const faqs = DataStore.getFaqs();

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
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-2 fw-bold">HELP & ANSWERS</span>
          <h1 className="display-4 fw-bold">Frequently Asked Questions</h1>
          <p className="lead mx-auto" style={{ maxWidth: '650px' }}>
            Clear answers regarding our farm origin, batch booking, shipping, and delivery.
          </p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container" style={{ maxWidth: '850px' }}>
          
          <div className="accordion accordion-flush rounded-4 shadow-sm overflow-hidden" id="faqAccordion">
            {faqs.map((f, idx) => (
              <div key={f.id} className="accordion-item border-bottom">
                <h2 className="accordion-header" id={`heading${idx}`}>
                  <button 
                    className={`accordion-button ${idx !== 0 ? 'collapsed' : ''} fw-bold text-dark py-3`} 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target={`#collapse${idx}`} 
                    aria-expanded={idx === 0}
                  >
                    <i className="bi bi-question-circle text-success me-2"></i> {f.question}
                  </button>
                </h2>
                <div 
                  id={`collapse${idx}`} 
                  className={`accordion-collapse collapse ${idx === 0 ? 'show' : ''}`} 
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body text-secondary lh-lg">
                    {f.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <p className="text-muted">Have a question not listed here?</p>
            <Link href="/contact" className="btn btn-outline-success fw-bold me-2">
              Contact Us
            </Link>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn btn-success fw-bold">
              <i className="bi bi-whatsapp me-1"></i> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
