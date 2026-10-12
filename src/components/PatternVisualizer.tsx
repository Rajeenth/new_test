'use client';

import React from 'react';

interface PatternVisualizerProps {
  selectedPattern?: 'triangular' | 'square';
  onSelectPattern?: (pattern: 'triangular' | 'square') => void;
  showComparison?: boolean;
  spacingDistance?: number;
}

export default function PatternVisualizer({
  selectedPattern = 'triangular',
  onSelectPattern,
  showComparison = false,
  spacingDistance = 25
}: PatternVisualizerProps) {
  // Dynamic calculation for tree densities based on spacing distance
  const sqTreesPerAcre = Math.round((43560 * 0.93) / (spacingDistance * spacingDistance));
  const triTreesPerAcre = Math.round(sqTreesPerAcre * 1.08);

  // SVG representation for Triangular Pattern
  const renderTriangularSVG = () => (
    <svg 
      viewBox="0 0 400 240" 
      className="w-100 h-auto"
      style={{ maxHeight: '220px', display: 'block' }}
    >
      <defs>
        {/* Palm Canopy Pattern */}
        <radialGradient id="canopyGradientTri" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#059669" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
        </radialGradient>
        
        {/* Marker for Dimension Lines */}
        <marker id="arrowTri" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
        </marker>
      </defs>

      {/* Field Background Grid */}
      <rect x="0" y="0" width="400" height="240" rx="12" fill="#022c22" />

      {/* Grid Guide Lines */}
      <line x1="40" y1="50" x2="360" y2="50" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
      <line x1="40" y1="120" x2="360" y2="120" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
      <line x1="40" y1="190" x2="360" y2="190" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

      {/* Equilateral Triangle Highlights */}
      <polygon 
        points="100,50 200,50 150,120" 
        fill="rgba(16, 185, 129, 0.15)" 
        stroke="#10b981" 
        strokeWidth="2" 
        strokeDasharray="5 3" 
      />
      <polygon 
        points="200,50 300,50 250,120" 
        fill="rgba(16, 185, 129, 0.08)" 
        stroke="#10b981" 
        strokeWidth="1.5" 
        strokeDasharray="4 3" 
      />
      <polygon 
        points="150,120 250,120 200,190" 
        fill="rgba(16, 185, 129, 0.15)" 
        stroke="#10b981" 
        strokeWidth="2" 
        strokeDasharray="5 3" 
      />

      {/* Dimension Arrow across top */}
      <line x1="105" y1="36" x2="195" y2="36" stroke="#f59e0b" strokeWidth="1.5" markerStart="url(#arrowTri)" markerEnd="url(#arrowTri)" />
      <text x="150" y="32" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{spacingDistance} ft</text>

      {/* Dimension Arrow diagonal */}
      <line x1="195" y1="55" x2="155" y2="115" stroke="#f59e0b" strokeWidth="1.5" markerStart="url(#arrowTri)" markerEnd="url(#arrowTri)" />
      <text x="195" y="92" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{spacingDistance} ft</text>

      {/* Dimension Arrow row distance */}
      <line x1="315" y1="55" x2="315" y2="115" stroke="#60a5fa" strokeWidth="1.2" strokeDasharray="3 2" />
      <text x="350" y="88" fill="#93c5fd" fontSize="9.5" textAnchor="middle" fontFamily="sans-serif">{(spacingDistance * 0.866).toFixed(1)} ft row</text>

      {/* Row 1 Palms (Y=50) */}
      {[100, 200, 300].map((x, i) => (
        <g key={`r1-${i}`}>
          <circle cx={x} cy="50" r="18" fill="url(#canopyGradientTri)" opacity="0.6" />
          <circle cx={x} cy="50" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        </g>
      ))}

      {/* Row 2 Palms (Y=120, STAGGERED BY 50%) */}
      {[50, 150, 250, 350].map((x, i) => (
        <g key={`r2-${i}`}>
          <circle cx={x} cy="120" r="18" fill="url(#canopyGradientTri)" opacity="0.6" />
          <circle cx={x} cy="120" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        </g>
      ))}

      {/* Row 3 Palms (Y=190, ALIGNED WITH ROW 1) */}
      {[100, 200, 300].map((x, i) => (
        <g key={`r3-${i}`}>
          <circle cx={x} cy="190" r="18" fill="url(#canopyGradientTri)" opacity="0.6" />
          <circle cx={x} cy="190" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
        </g>
      ))}

      {/* Legend / Stagger Callout */}
      <text x="200" y="222" fill="#a7f3d0" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
        Alternate rows staggered by {(spacingDistance / 2).toFixed(1)} ft &bull; Equilateral Triangles
      </text>
    </svg>
  );

  // SVG representation for Square Pattern
  const renderSquareSVG = () => (
    <svg 
      viewBox="0 0 400 240" 
      className="w-100 h-auto"
      style={{ maxHeight: '220px', display: 'block' }}
    >
      <defs>
        {/* Palm Canopy Pattern */}
        <radialGradient id="canopyGradientSq" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#2563eb" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.9" />
        </radialGradient>
        
        {/* Marker for Dimension Lines */}
        <marker id="arrowSq" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#f59e0b" />
        </marker>
      </defs>

      {/* Field Background Grid */}
      <rect x="0" y="0" width="400" height="240" rx="12" fill="#0f172a" />

      {/* Grid Guide Lines */}
      <line x1="40" y1="50" x2="360" y2="50" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
      <line x1="40" y1="120" x2="360" y2="120" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
      <line x1="40" y1="190" x2="360" y2="190" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />

      {/* Square Boxes Highlights */}
      <rect 
        x="100" 
        y="50" 
        width="100" 
        height="70" 
        fill="rgba(59, 130, 246, 0.15)" 
        stroke="#3b82f6" 
        strokeWidth="2" 
        strokeDasharray="5 3" 
      />
      <rect 
        x="200" 
        y="50" 
        width="100" 
        height="70" 
        fill="rgba(59, 130, 246, 0.08)" 
        stroke="#3b82f6" 
        strokeWidth="1.5" 
        strokeDasharray="4 3" 
      />
      <rect 
        x="100" 
        y="120" 
        width="100" 
        height="70" 
        fill="rgba(59, 130, 246, 0.15)" 
        stroke="#3b82f6" 
        strokeWidth="2" 
        strokeDasharray="5 3" 
      />

      {/* Dimension Arrow horizontal */}
      <line x1="105" y1="36" x2="195" y2="36" stroke="#f59e0b" strokeWidth="1.5" markerStart="url(#arrowSq)" markerEnd="url(#arrowSq)" />
      <text x="150" y="32" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{spacingDistance} ft</text>

      {/* Dimension Arrow vertical */}
      <line x1="86" y1="55" x2="86" y2="115" stroke="#f59e0b" strokeWidth="1.5" markerStart="url(#arrowSq)" markerEnd="url(#arrowSq)" />
      <text x="70" y="88" fill="#fbbf24" fontSize="11" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">{spacingDistance} ft</text>

      {/* Straight Intercropping Alleys Note */}
      <line x1="315" y1="40" x2="315" y2="200" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 2" />
      <text x="352" y="125" fill="#bae6fd" fontSize="9.5" textAnchor="middle" fontFamily="sans-serif">Straight alley</text>

      {/* Row 1 Palms (Y=50) */}
      {[100, 200, 300].map((x, i) => (
        <g key={`sq1-${i}`}>
          <circle cx={x} cy="50" r="18" fill="url(#canopyGradientSq)" opacity="0.6" />
          <circle cx={x} cy="50" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
        </g>
      ))}

      {/* Row 2 Palms (Y=120, EXACTLY ALIGNED VERTICALLY) */}
      {[100, 200, 300].map((x, i) => (
        <g key={`sq2-${i}`}>
          <circle cx={x} cy="120" r="18" fill="url(#canopyGradientSq)" opacity="0.6" />
          <circle cx={x} cy="120" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
        </g>
      ))}

      {/* Row 3 Palms (Y=190, EXACTLY ALIGNED VERTICALLY) */}
      {[100, 200, 300].map((x, i) => (
        <g key={`sq3-${i}`}>
          <circle cx={x} cy="190" r="18" fill="url(#canopyGradientSq)" opacity="0.6" />
          <circle cx={x} cy="190" r="6" fill="#3b82f6" stroke="#ffffff" strokeWidth="2" />
        </g>
      ))}

      {/* Legend / Square Grid Callout */}
      <text x="200" y="222" fill="#bfdbfe" fontSize="11" fontWeight="600" textAnchor="middle" fontFamily="sans-serif">
        Orthogonal 90&deg; Grid &bull; {spacingDistance} ft &times; {spacingDistance} ft straight alleys
      </text>
    </svg>
  );

  return (
    <div className="pattern-visualizer">
      {showComparison ? (
        /* Side by Side Comparison Layout */
        <div className="row g-3">
          <div className="col-md-6">
            <div className={`p-3 rounded-4 border h-100 ${selectedPattern === 'triangular' ? 'border-success bg-success bg-opacity-10 shadow-sm' : 'border-secondary border-opacity-25 bg-light'}`}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-success fw-bold">TRIANGULAR PATTERN</span>
                <span className="badge bg-success bg-opacity-25 text-success border border-success extra-small">~{triTreesPerAcre} palms / acre</span>
              </div>
              <div className="rounded-3 overflow-hidden shadow-sm mb-3">
                {renderTriangularSVG()}
              </div>
              <ul className="list-unstyled extra-small text-secondary mb-0">
                <li className="mb-1"><i className="bi bi-check-circle-fill text-success me-1"></i> <strong>+15% higher tree count</strong> (~{triTreesPerAcre} trees vs ~{sqTreesPerAcre}).</li>
                <li className="mb-1"><i className="bi bi-check-circle-fill text-success me-1"></i> Alternate rows staggered by {(spacingDistance / 2).toFixed(1)} ft.</li>
                <li className="mb-1"><i className="bi bi-check-circle-fill text-success me-1"></i> Uniform {spacingDistance} ft distance in all 3 directions.</li>
                <li><i className="bi bi-star-fill text-warning me-1"></i> <em>Recommended for maximum coconut yield.</em></li>
              </ul>
              {onSelectPattern && (
                <button 
                  type="button"
                  onClick={() => onSelectPattern('triangular')}
                  className={`btn btn-sm w-100 mt-3 fw-bold rounded-3 ${selectedPattern === 'triangular' ? 'btn-success' : 'btn-outline-success'}`}
                >
                  {selectedPattern === 'triangular' ? 'Selected Pattern' : 'Select Triangular'}
                </button>
              )}
            </div>
          </div>

          <div className="col-md-6">
            <div className={`p-3 rounded-4 border h-100 ${selectedPattern === 'square' ? 'border-primary bg-primary bg-opacity-10 shadow-sm' : 'border-secondary border-opacity-25 bg-light'}`}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-primary fw-bold">SQUARE PATTERN</span>
                <span className="badge bg-primary bg-opacity-25 text-primary border border-primary extra-small">~{sqTreesPerAcre} palms / acre</span>
              </div>
              <div className="rounded-3 overflow-hidden shadow-sm mb-3">
                {renderSquareSVG()}
              </div>
              <ul className="list-unstyled extra-small text-secondary mb-0">
                <li className="mb-1"><i className="bi bi-check-circle-fill text-primary me-1"></i> Standard orthogonal {spacingDistance} ft x {spacingDistance} ft square grid.</li>
                <li className="mb-1"><i className="bi bi-check-circle-fill text-primary me-1"></i> Straight tractor alleys along both directions.</li>
                <li className="mb-1"><i className="bi bi-check-circle-fill text-primary me-1"></i> Ideal for wide intercrops (banana, cocoa, pepper).</li>
                <li><i className="bi bi-info-circle-fill text-info me-1"></i> <em>Accommodates ~{sqTreesPerAcre} trees per acre.</em></li>
              </ul>
              {onSelectPattern && (
                <button 
                  type="button"
                  onClick={() => onSelectPattern('square')}
                  className={`btn btn-sm w-100 mt-3 fw-bold rounded-3 ${selectedPattern === 'square' ? 'btn-primary' : 'btn-outline-primary'}`}
                >
                  {selectedPattern === 'square' ? 'Selected Pattern' : 'Select Square'}
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Single Pattern Dynamic Preview Mode */
        <div>
          <div className="rounded-3 overflow-hidden shadow-sm mb-2">
            {selectedPattern === 'triangular' ? renderTriangularSVG() : renderSquareSVG()}
          </div>
          <div className="p-2 bg-light rounded-3 border extra-small text-secondary">
            {selectedPattern === 'triangular' ? (
              <div className="d-flex align-items-center justify-content-between">
                <span><i className="bi bi-triangle-fill text-success me-1"></i> <strong>Triangular:</strong> Equilateral {spacingDistance} ft spacing (~{triTreesPerAcre} palms/acre)</span>
                <span className="badge bg-success bg-opacity-25 text-success">+15% Capacity</span>
              </div>
            ) : (
              <div className="d-flex align-items-center justify-content-between">
                <span><i className="bi bi-square-fill text-primary me-1"></i> <strong>Square:</strong> {spacingDistance} ft x {spacingDistance} ft grid (~{sqTreesPerAcre} palms/acre)</span>
                <span className="badge bg-primary bg-opacity-25 text-primary">Intercropping</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
