'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminInventoryAdjustmentPage() {
  const [batches, setBatches] = useState<any[]>([]);
  const [adjustments, setAdjustments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedBatch, setSelectedBatch] = useState('EM-0926-A');
  const [change, setChange] = useState<number>(-10);
  const [reason, setReason] = useState('');
  const [adminName, setAdminName] = useState('Rajeenth (Farm Admin)');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    const [batchesData, adjData] = await Promise.all([
      fetch('/api/batches').then(res => res.json()),
      fetch('/api/admin/inventory').then(res => res.json())
    ]);
    setBatches(batchesData);
    setAdjustments(adjData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdjust = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Mandatory Reason is required to record an inventory adjustment log.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchCode: selectedBatch,
          change: Number(change),
          reason,
          adminName
        })
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Inventory adjustment of ${change} logged for batch ${selectedBatch}. Live available stock updated to ${data.updatedBatch.availableQuantity}!`);
        setReason('');
        await fetchData(); // Refresh batch list & logs
      } else {
        alert(data.error || 'Failed to adjust inventory');
      }
    } catch (err) {
      alert('Network error adjusting inventory');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-dark text-white py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <span className="badge bg-warning text-dark me-2">AUDIT LOG ENFORCED</span>
            <h3 className="fw-bold mb-0 text-light d-inline align-middle">Inventory Adjustment</h3>
          </div>
          <Link href="/admin" className="btn btn-outline-light btn-sm">
            <i className="bi bi-arrow-left me-1"></i> Back to Admin Dashboard
          </Link>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* Formula Rule Banner */}
          <div className="alert alert-info border-info-subtle shadow-sm rounded-4 p-4 mb-4">
            <h6 className="fw-bold alert-heading"><i className="bi bi-shield-check me-2"></i> Real-Time Inventory Formula</h6>
            <p className="mb-0 small text-secondary">
              <code>Available Inventory = Total Produced - Booked/Sold + Inventory Adjustments</code>.<br />
              When an adjustment is logged, the available stock updates immediately across the website and audit logs.
            </p>
          </div>

          {/* Adjustment Entry Form */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-white">
            <h4 className="fw-bold text-dark mb-3"><i className="bi bi-sliders me-2 text-warning"></i> Record Inventory Adjustment</h4>

            <form onSubmit={handleAdjust}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label small fw-bold">Select Batch *</label>
                  <select 
                    className="form-select"
                    value={selectedBatch}
                    onChange={e => setSelectedBatch(e.target.value)}
                  >
                    {batches.map(b => (
                      <option key={b.batchCode} value={b.batchCode}>
                        {b.batchCode} (Avail: {b.availableQuantity} | Booked: {b.bookedQuantity})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-bold">Adjustment Quantity (+ or -) *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    required 
                    value={change}
                    onChange={e => setChange(Number(e.target.value))}
                  />
                  <small className="text-muted extra-small">Use negative numbers (e.g. -10) for damaged/rejected stock.</small>
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-bold">Admin Logging Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={adminName}
                    onChange={e => setAdminName(e.target.value)}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Mandatory Audit Reason *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    placeholder="e.g. 10 saplings damaged due to high coastal wind storm"
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                  />
                </div>

                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-warning fw-bold px-4 text-dark" disabled={submitting}>
                    {submitting ? 'Updating Inventory...' : <><i className="bi bi-file-earmark-plus me-1"></i> Confirm & Deduct Inventory</>}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Current Batch Inventory Summary Table */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-white">
            <h5 className="fw-bold text-dark mb-3">Live Batch Stock Status</h5>
            <div className="table-responsive">
              <table className="table table-bordered align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Batch Code</th>
                    <th>Total Produced</th>
                    <th>Booked / Sold</th>
                    <th>Adjustments Logged</th>
                    <th>Current Available Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {batches.map(b => (
                    <tr key={b.batchCode}>
                      <td><strong className="text-success">{b.batchCode}</strong></td>
                      <td>{b.totalQuantity}</td>
                      <td className="text-primary fw-bold">{b.bookedQuantity}</td>
                      <td>
                        <span className={`badge ${b.inventoryAdjustments < 0 ? 'bg-danger' : 'bg-secondary'}`}>
                          {b.inventoryAdjustments}
                        </span>
                      </td>
                      <td className="text-success fs-6 fw-bold">{b.availableQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Historical Audit Log Table */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h4 className="fw-bold text-dark mb-3"><i className="bi bi-journal-text me-2 text-dark"></i> Inventory Audit Logs</h4>

            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Date & Time</th>
                    <th>Batch</th>
                    <th>Admin</th>
                    <th>Quantity Change</th>
                    <th>Audit Reason</th>
                  </tr>
                </thead>
                <tbody>
                  {adjustments.map(log => (
                    <tr key={log.id}>
                      <td className="small text-muted">{new Date(log.createdAt).toLocaleString()}</td>
                      <td><strong className="text-success">{log.batchCode}</strong></td>
                      <td>{log.adminName}</td>
                      <td>
                        <span className={`badge ${log.quantityChange < 0 ? 'bg-danger' : 'bg-success'}`}>
                          {log.quantityChange > 0 ? `+${log.quantityChange}` : log.quantityChange}
                        </span>
                      </td>
                      <td className="small text-secondary">{log.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
