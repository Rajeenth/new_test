'use client';

import Link from 'next/link';

export default function FarmingGuidePage() {
  const articles = [
    {
      title: 'How to Plant a Coconut Sapling',
      category: 'Planting',
      summary: 'Recommended spacing (25ft x 25ft), pit preparation (3ft x 3ft x 3ft), organic manure mixture, and correct planting depth to prevent trunk rot.',
      date: 'Sep 2026',
      readTime: '4 min read'
    },
    {
      title: 'First Year Care & Irrigation Management',
      category: 'Early Growth',
      summary: 'Essential watering schedule for young saplings, coir-pith mulching for soil moisture retention, and protecting fronds from intense summer sun.',
      date: 'Aug 2026',
      readTime: '5 min read'
    },
    {
      title: 'Organic Fertilizer & Micronutrient Schedule',
      category: 'Nutrition',
      summary: 'Application of farmyard manure, neem cake, wood ash, and borax micronutrient sprays to boost crown growth and early flowering vigor.',
      date: 'Jul 2026',
      readTime: '6 min read'
    },
    {
      title: 'Managing Salinity & Coastal Soil Environment',
      category: 'Environment',
      summary: 'Why Eathamozhy coconut palms thrive in coastal sandy loam and how to manage irrigation water salinity in coastal regions.',
      date: 'Jun 2026',
      readTime: '4 min read'
    },
    {
      title: 'Preventing Rhinoceros Beetle & Yellowing Leaves',
      category: 'Troubleshooting',
      summary: 'Natural organic traps for beetles, treating crown rot, and identifying magnesium vs nitrogen deficiency symptoms early.',
      date: 'May 2026',
      readTime: '5 min read'
    }
  ];

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
          <span className="badge bg-warning text-dark px-3 py-2 rounded-pill mb-2 fw-bold">FARM KNOWLEDGE</span>
          <h1 className="display-4 fw-bold">Coconut Farming Guide</h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
            Practical, field-tested guidance from our farm team to help your saplings achieve maximum health and early yield.
          </p>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="row g-4">
            {articles.map((art, idx) => (
              <div key={idx} className="col-md-6 col-lg-4">
                <div className="card border-0 shadow-sm rounded-4 h-100 p-4 bg-white d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="badge bg-success-subtle text-success border border-success">{art.category}</span>
                      <small className="text-muted">{art.readTime}</small>
                    </div>
                    <h5 className="fw-bold text-dark mb-2">{art.title}</h5>
                    <p className="text-secondary small mb-3">{art.summary}</p>
                  </div>
                  <div className="pt-3 border-top d-flex justify-content-between align-items-center">
                    <span className="text-muted extra-small">By Eathamozhy Farm Team</span>
                    <button className="btn btn-sm btn-outline-success fw-bold" onClick={() => alert(`Reading guide: ${art.title}`)}>Read Guide</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-4 mt-5 bg-white text-center">
            <h4 className="fw-bold text-dark mb-2">Have a specific soil or pest question?</h4>
            <p className="text-secondary mb-3">Our farm experts are available to assist you via WhatsApp.</p>
            <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="btn btn-success fw-bold d-inline-flex align-items-center gap-2 mx-auto">
              <i className="bi bi-whatsapp fs-5"></i> Ask Farm Expert on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
