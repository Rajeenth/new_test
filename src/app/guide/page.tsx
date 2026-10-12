'use client';

import Link from 'next/link';
import PatternVisualizer from '@/components/PatternVisualizer';

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
      <section className="hero-ambient-mesh text-white py-5 position-relative overflow-hidden border-bottom border-success border-opacity-25">
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

          {/* Plantation Layout Visualizer Card */}
          <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 mt-5 bg-white">
            <div className="text-center mb-4">
              <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-1 rounded-pill fw-bold">
                <i className="bi bi-diagram-3-fill me-1"></i> FIELD GEOMETRY & SPACING GUIDE
              </span>
              <h3 className="fw-bold text-dark mt-2 mb-2">Planting Pattern Visual Guide: Triangular vs Square</h3>
              <p className="text-secondary small mx-auto" style={{ maxWidth: '650px' }}>
                Compare the field geometry, spacing dimensions, and palm population per acre between the two standard coconut planting systems.
              </p>
            </div>

            <PatternVisualizer showComparison={true} />
          </div>

          <div className="card border-0 shadow-sm rounded-4 p-4 mt-4 bg-white text-center">
            <h4 className="fw-bold text-dark mb-2">Have a specific soil, layout, or planting question?</h4>
            <p className="text-secondary mb-3">Our farm experts are available to guide you on pit digging, manure mixing, and grove orientation.</p>
            <a href="https://wa.me/919486880641?text=Hello%20Eathamozhy%20Farm,%20I%20have%20a%20question%20regarding%20plantation%20spacing%20patterns" target="_blank" rel="noreferrer" className="btn btn-success fw-bold d-inline-flex align-items-center gap-2 mx-auto">
              <i className="bi bi-whatsapp fs-5"></i> Ask Farm Expert on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
