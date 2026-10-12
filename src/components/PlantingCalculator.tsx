'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function PlantingCalculator() {
  const [acres, setAcres] = useState<number>(1);
  const [spacingType, setSpacingType] = useState<'triangular' | 'square'>('triangular');
  const unitPrice = 150; // Standard price per sapling

  // Triangular spacing yields ~70 trees/acre; Square yields ~65 trees/acre at 25x25 ft
  const treesPerAcre = spacingType === 'triangular' ? 70 : 65;
  const totalTrees = Math.round(acres * treesPerAcre);
  const totalCost = totalTrees * unitPrice;
  const cratesNeeded = Math.ceil(totalTrees / 12);
  const pitSize = '3 ft × 3 ft × 3 ft';

  return (
    <div className="card border-0 shadow-lg rounded-4 overflow-hidden bg-white p-4 p-md-5">
      <div className="row g-4 align-items-center">
        
        {/* Left Column: Input Controls */}
        <div className="col-lg-6">
          <div className="d-flex align-items-center gap-2 mb-2">
            <span className="badge bg-success bg-opacity-10 text-success border border-success border-opacity-25 px-3 py-1 rounded-pill fw-bold">
              <i className="bi bi-calculator me-1"></i> FARM PLANNING UTILITY
            </span>
          </div>

          <h3 className="fw-bold text-dark mb-2">Coconut Grove Planning Calculator</h3>
          <p className="text-secondary small mb-4">
            Calculate exact sapling quantity, plantation spacing, pit size, and estimated cost for your agricultural land.
          </p>

          {/* Acreage Slider & Input */}
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="fw-bold text-dark small">Your Land Area (Acres):</label>
              <div className="input-group" style={{ maxWidth: '140px' }}>
                <input 
                  type="number" 
                  step="0.5" 
                  min="0.5" 
                  max="50" 
                  value={acres} 
                  onChange={(e) => setAcres(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                  className="form-control text-center fw-bold"
                />
                <span className="input-group-text small bg-light">Acre{acres > 1 ? 's' : ''}</span>
              </div>
            </div>

            <input 
              type="range" 
              className="form-range custom-range" 
              min="0.5" 
              max="10" 
              step="0.5" 
              value={acres}
              onChange={(e) => setAcres(parseFloat(e.target.value))}
            />
            <div className="d-flex justify-content-between text-muted extra-small">
              <span>0.5 Acre (~35 palms)</span>
              <span>2.5 Acres (~175 palms)</span>
              <span>5 Acres (~350 palms)</span>
              <span>10 Acres (~700 palms)</span>
            </div>
          </div>

          {/* Spacing Selection */}
          <div className="mb-4">
            <label className="fw-bold text-dark small d-block mb-2">Planting Pattern (25 ft Spacing):</label>
            <div className="d-flex gap-2">
              <button 
                type="button" 
                onClick={() => setSpacingType('triangular')}
                className={`btn btn-sm px-3 py-2 rounded-3 flex-fill text-start transition-all ${
                  spacingType === 'triangular' 
                    ? 'btn-success fw-bold shadow-sm' 
                    : 'btn-outline-secondary'
                }`}
              >
                <i className="bi bi-triangle-fill me-1 small"></i> Triangular Pattern
                <small className="d-block extra-small opacity-75">~70 palms/acre (Recommended)</small>
              </button>

              <button 
                type="button" 
                onClick={() => setSpacingType('square')}
                className={`btn btn-sm px-3 py-2 rounded-3 flex-fill text-start transition-all ${
                  spacingType === 'square' 
                    ? 'btn-success fw-bold shadow-sm' 
                    : 'btn-outline-secondary'
                }`}
              >
                <i className="bi bi-square-fill me-1 small"></i> Square Pattern
                <small className="d-block extra-small opacity-75">~65 palms/acre (Traditional)</small>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Output Card */}
        <div className="col-lg-6">
          <div className="p-4 rounded-4 text-white shadow-md position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #022c22 0%, #064e3b 100%)' }}>
            <div className="d-flex justify-content-between align-items-start mb-3">
              <div>
                <span className="badge bg-warning text-dark fw-bold mb-1">RECOMMENDED ORDER</span>
                <h4 className="fw-bold mb-0 text-white">{acres} Acre Plantation Plan</h4>
              </div>
              <span className="badge bg-success-subtle text-success border border-success">
                GI Eathamozhy Tall
              </span>
            </div>

            <div className="row g-3 py-3 border-top border-bottom border-success border-opacity-25 my-3">
              <div className="col-6 border-end border-success border-opacity-25">
                <small className="text-light opacity-75 d-block extra-small text-uppercase">Saplings Required</small>
                <span className="display-6 fw-bold text-gradient-emerald">{totalTrees}</span>
                <small className="d-block text-light opacity-75 extra-small">palms</small>
              </div>

              <div className="col-6">
                <small className="text-light opacity-75 d-block extra-small text-uppercase">Estimated Value</small>
                <span className="display-6 fw-bold text-warning">₹{totalCost.toLocaleString('en-IN')}</span>
                <small className="d-block text-light opacity-75 extra-small">@ ₹{unitPrice} / sapling</small>
              </div>

              <div className="col-6 border-end border-success border-opacity-25 pt-2">
                <small className="text-light opacity-75 d-block extra-small text-uppercase">Pit Dimensions</small>
                <span className="fw-bold text-light">{pitSize}</span>
                <small className="d-block text-light opacity-75 extra-small">Depth & width</small>
              </div>

              <div className="col-6 pt-2">
                <small className="text-light opacity-75 d-block extra-small text-uppercase">Transport Crates</small>
                <span className="fw-bold text-light">~{cratesNeeded} Wooden Crates</span>
                <small className="d-block text-light opacity-75 extra-small">Protective transit</small>
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 pt-2">
              <Link 
                href={`/batches`} 
                className="btn-gold flex-fill text-decoration-none py-2 text-center"
              >
                <i className="bi bi-cart-check-fill me-1"></i> Book {totalTrees} Saplings Now
              </Link>
              <a 
                href={`https://wa.me/919486880641?text=Hello%20Eathamozhy%20Farm,%20I%20am%20planning%20a%20${acres}%20acre%20coconut%20plantation%20with%20${totalTrees}%20saplings.%20Please%20guide%20me.`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-light border-opacity-50 py-2 px-3 text-nowrap"
              >
                <i className="bi bi-whatsapp me-1 text-success"></i> Farm Advice
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
