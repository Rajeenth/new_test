'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSaplingMetrics } from '@/lib/dataStore';

export default function AdminBatchesPage() {
  const [batches, setBatches] = useState<any[]>([]);
  const [parentPalms, setParentPalms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // File Upload State
  const [batchFiles, setBatchFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);

  // Edit Batch Modal State
  const [editingBatch, setEditingBatch] = useState<any | null>(null);
  const [editPrice, setEditPrice] = useState<number>(150);
  const [editTotalQuantity, setEditTotalQuantity] = useState<number>(500);
  const [editDescription, setEditDescription] = useState<string>('');
  const [editImages, setEditImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState<string>('');

  // Auto-generate Batch Code (e.g. EM-1226-D)
  const generateAutoBatchCode = () => {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = String(d.getFullYear()).slice(-2);
    const letter = String.fromCharCode(65 + Math.floor(Math.random() * 6));
    return `EM-${month}${year}-${letter}`;
  };

  // New Batch Form State
  const [newBatch, setNewBatch] = useState({
    batchCode: '',
    parentPalmCode: 'EM-MP-014',
    name: 'December 2026 Batch',
    harvestDate: '2026-01-05',
    seededDate: '2026-01-15',
    totalQuantity: 500,
    price: 150,
    status: 'AVAILABLE',
    description: ''
  });

  const calculatedMetrics = getSaplingMetrics(newBatch.seededDate);

  const fetchBatchesData = async () => {
    const [batchesData, palmsData] = await Promise.all([
      fetch('/api/batches').then(res => res.json()),
      fetch('/api/parent-palms').then(res => res.json())
    ]);
    setBatches(batchesData);
    setParentPalms(palmsData);
    setLoading(false);
  };

  useEffect(() => {
    setNewBatch(prev => ({ ...prev, batchCode: generateAutoBatchCode() }));
    fetchBatchesData();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBatchFiles(Array.from(e.target.files));
    }
  };

  const handleUploadFiles = async () => {
    if (!newBatch.batchCode) {
      alert('Please enter a Batch Code first');
      return;
    }

    if (batchFiles.length === 0) {
      alert('Please select image files to upload.');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    batchFiles.forEach(f => formData.append('files', f));
    formData.append('category', 'batches');
    formData.append('tag', newBatch.batchCode);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok) {
        setUploadedUrls(data.urls);
        alert(`Uploaded ${data.urls.length} image(s) to folder /public/uploads/batches/${newBatch.batchCode}/!`);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('File upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleCreateBatch = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalImages = uploadedUrls.length > 0 ? uploadedUrls : [
      '/images/placeholders/coconut.jpeg',
      '/images/placeholders/coconut1.jpeg',
      '/images/placeholders/coconut2.jpeg'
    ];

    try {
      const res = await fetch('/api/batches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newBatch,
          images: finalImages
        })
      });

      if (res.ok) {
        alert(`Batch ${newBatch.batchCode} added! It is now live on the Available Batches page.`);
        fetchBatchesData();
        setUploadedUrls([]);
        setBatchFiles([]);
        setNewBatch({
          batchCode: generateAutoBatchCode(),
          parentPalmCode: 'EM-MP-014',
          name: 'December 2026 Batch',
          harvestDate: '2026-01-05',
          seededDate: '2026-01-15',
          totalQuantity: 500,
          price: 150,
          status: 'AVAILABLE',
          description: ''
        });
      } else {
        alert('Failed to save batch');
      }
    } catch (err) {
      alert('Error saving batch');
    }
  };

  const openEditModal = (batch: any) => {
    setEditingBatch(batch);
    setEditPrice(batch.price);
    setEditTotalQuantity(batch.totalQuantity);
    setEditDescription(batch.description || '');
    setEditImages(batch.images && batch.images.length > 0 ? [...batch.images] : []);
    setNewImageUrl('');
  };

  const handleAddEditFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editingBatch) return;

    const files = Array.from(e.target.files);
    setUploading(true);
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    formData.append('category', 'batches');
    formData.append('tag', editingBatch.batchCode);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.urls) {
        setEditImages(prev => [...prev, ...data.urls]);
        alert(`Successfully added ${data.urls.length} photo(s)!`);
      } else {
        // Fallback to FileReader if server upload fails
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (evt) => {
            const url = evt.target?.result as string;
            if (url) setEditImages(prev => [...prev, url]);
          };
          reader.readAsDataURL(file);
        });
      }
    } catch (err) {
      alert('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const removeEditImage = async (indexToRemove: number) => {
    const targetUrl = editImages[indexToRemove];
    setEditImages(prev => prev.filter((_, idx) => idx !== indexToRemove));
    if (targetUrl && targetUrl.startsWith('/images/')) {
      try {
        await fetch(`/api/upload?path=${encodeURIComponent(targetUrl)}`, { method: 'DELETE' });
      } catch (e) {
        console.error('Failed to unlink deleted image file:', e);
      }
    }
  };

  const removeAllEditImages = async () => {
    if (confirm('Are you sure you want to remove ALL current images for this batch?')) {
      const toDelete = [...editImages];
      setEditImages([]);
      for (const imgUrl of toDelete) {
        if (imgUrl && imgUrl.startsWith('/images/')) {
          try {
            await fetch(`/api/upload?path=${encodeURIComponent(imgUrl)}`, { method: 'DELETE' });
          } catch (e) {}
        }
      }
    }
  };

  const handleSaveEdit = async () => {
    if (!editingBatch) return;

    try {
      const res = await fetch('/api/batches', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          batchCode: editingBatch.batchCode,
          price: editPrice,
          totalQuantity: editTotalQuantity,
          description: editDescription,
          images: editImages
        })
      });

      if (res.ok) {
        alert(`Batch ${editingBatch.batchCode} updated! ${editImages.length} photo(s) saved for customer viewing.`);
        setEditingBatch(null);
        fetchBatchesData();
      } else {
        alert('Failed to update batch');
      }
    } catch (err) {
      alert('Error updating batch');
    }
  };

  const handleDeleteBatch = async (batchCode: string) => {
    if (!confirm(`Are you sure you want to remove batch ${batchCode}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/batches?code=${encodeURIComponent(batchCode)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert(`Batch ${batchCode} removed.`);
        fetchBatchesData();
      } else {
        alert('Failed to delete batch');
      }
    } catch (err) {
      alert('Error deleting batch');
    }
  };

  return (
    <>
      <section className="bg-dark text-white py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <span className="badge bg-success me-2">ADMIN PORTAL</span>
            <h3 className="fw-bold mb-0 text-light d-inline align-middle">Batch & Image Management</h3>
          </div>
          <Link href="/admin" className="btn btn-outline-light btn-sm">
            <i className="bi bi-arrow-left me-1"></i> Back to Admin Dashboard
          </Link>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          
          {/* Create New Batch Form Card */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="fw-bold text-dark mb-0">
                <i className="bi bi-plus-circle-fill text-success me-2"></i> Create New Sapling Batch
              </h4>
              <button 
                type="button" 
                className="btn btn-sm btn-outline-secondary"
                onClick={() => setNewBatch({ ...newBatch, batchCode: generateAutoBatchCode() })}
              >
                <i className="bi bi-arrow-clockwise me-1"></i> Regenerate Batch Code
              </button>
            </div>
            
            <form onSubmit={handleCreateBatch}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-bold text-success">Batch Code (Auto-populated) *</label>
                  <input 
                    type="text" 
                    className="form-control fw-bold border-success" 
                    required 
                    value={newBatch.batchCode}
                    onChange={e => setNewBatch({ ...newBatch, batchCode: e.target.value })}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-bold">Mother Tree / Parent Palm *</label>
                  <select 
                    className="form-select"
                    value={newBatch.parentPalmCode}
                    onChange={e => setNewBatch({ ...newBatch, parentPalmCode: e.target.value })}
                  >
                    {parentPalms.map(p => (
                      <option key={p.code} value={p.code}>{p.code} ({p.name})</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-bold">Base Batch Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    placeholder="e.g. December 2026 Batch"
                    value={newBatch.name}
                    onChange={e => setNewBatch({ ...newBatch, name: e.target.value })}
                  />
                  <small className="text-muted extra-small">Combined Full Name: <strong>{newBatch.name} ({newBatch.batchCode})</strong></small>
                </div>

                <div className="col-md-2">
                  <label className="form-label small fw-bold">Price (₹/sapling) *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    required 
                    value={newBatch.price}
                    onChange={e => setNewBatch({ ...newBatch, price: Number(e.target.value) })}
                  />
                </div>

                {/* DATES SECTION */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-dark">
                    <i className="bi bi-calendar-event me-1 text-success"></i> Coconut Cut From Tree Date (Harvest Date) *
                  </label>
                  <input 
                    type="date" 
                    className="form-control" 
                    required 
                    value={newBatch.harvestDate}
                    onChange={e => setNewBatch({ ...newBatch, harvestDate: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold text-dark">
                    <i className="bi bi-calendar-check-fill me-1 text-success"></i> Seeded On Date (Nursery Sowing) *
                  </label>
                  <input 
                    type="date" 
                    className="form-control" 
                    required 
                    value={newBatch.seededDate}
                    onChange={e => setNewBatch({ ...newBatch, seededDate: e.target.value })}
                  />
                </div>

                {/* AUTOMATIC CALCULATION DISPLAY */}
                <div className="col-12">
                  <div className="alert alert-success border-success-subtle rounded-3 p-3 d-flex flex-wrap justify-content-between align-items-center">
                    <div>
                      <span className="badge bg-success me-2">AUTOMATICALLY CALCULATED METRICS</span>
                      <span className="fw-bold text-dark me-3">
                        Sapling Age: <strong className="text-success fs-6">{calculatedMetrics.age}</strong>
                      </span>
                      <span className="fw-bold text-dark">
                        Estimated Average Height: <strong className="text-success fs-6">{calculatedMetrics.height}</strong>
                      </span>
                    </div>
                  </div>
                </div>

                {/* FILE UPLOAD BOX */}
                <div className="col-12 bg-light p-3 rounded-3 border">
                  <label className="form-label small fw-bold text-dark d-block">
                    <i className="bi bi-cloud-arrow-up-fill text-success me-1"></i> Upload Seedling / Batch Photographs
                  </label>
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <input 
                      type="file" 
                      className="form-control form-control-sm w-auto" 
                      multiple 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                    <button 
                      type="button" 
                      className="btn btn-sm btn-outline-success fw-bold"
                      onClick={handleUploadFiles}
                      disabled={uploading || batchFiles.length === 0}
                    >
                      {uploading ? 'Uploading to server...' : 'Upload Selected Images'}
                    </button>
                    {uploadedUrls.length > 0 && (
                      <span className="badge bg-success">
                        <i className="bi bi-check-circle-fill me-1"></i> {uploadedUrls.length} image(s) uploaded!
                      </span>
                    )}
                  </div>
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-bold">Total Quantity *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    required 
                    value={newBatch.totalQuantity}
                    onChange={e => setNewBatch({ ...newBatch, totalQuantity: Number(e.target.value) })}
                  />
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-bold">Initial Status</label>
                  <input type="text" className="form-control" readOnly value={newBatch.status} />
                </div>

                <div className="col-md-4">
                  <label className="form-label small fw-bold">Mother Tree Code</label>
                  <input type="text" className="form-control" readOnly value={newBatch.parentPalmCode} />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Batch Notes / Description</label>
                  <textarea 
                    className="form-control" 
                    rows={2} 
                    placeholder="Enter farm observations or notes for this batch"
                    value={newBatch.description}
                    onChange={e => setNewBatch({ ...newBatch, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="col-12 text-end">
                  <button type="submit" className="btn btn-success fw-bold px-4">
                    <i className="bi bi-check-circle me-1"></i> Save & Add to Live Batches
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Batches Inventory Table with Edit Feature */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h4 className="fw-bold text-dark mb-3">All Active & Past Batches ({batches.length})</h4>

            {loading ? (
              <div className="text-center py-4">Loading...</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Batch Code</th>
                      <th>Batch Name</th>
                      <th>Dates (Cut / Seeded)</th>
                      <th>Age / Height</th>
                      <th>Total</th>
                      <th>Booked</th>
                      <th>Available</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {batches.map(b => (
                      <tr key={b.id}>
                        <td><strong className="text-success">{b.batchCode}</strong></td>
                        <td><small className="fw-bold">{b.name}</small></td>
                        <td className="small text-muted">
                          <div>Cut: {b.harvestDate || 'N/A'}</div>
                          <div>Seeded: {b.seededDate || 'N/A'}</div>
                        </td>
                        <td className="small"><span className="badge bg-success-subtle text-success border me-1">{b.age}</span> ({b.height})</td>
                        <td><strong>{b.totalQuantity}</strong></td>
                        <td className="text-primary"><strong>{b.bookedQuantity}</strong></td>
                        <td className="text-success fs-6"><strong>{b.availableQuantity}</strong></td>
                        <td><strong className="text-success fs-6">₹{b.price}</strong></td>
                        <td>
                          <span className={`badge ${b.status === 'AVAILABLE' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {b.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-1">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              onClick={() => openEditModal(b)}
                              title="Edit Price & Details"
                            >
                              <i className="bi bi-pencil-square me-1"></i> Edit
                            </button>
                            <button 
                              className="btn btn-sm btn-outline-danger" 
                              onClick={() => handleDeleteBatch(b.batchCode)}
                              title="Remove Batch"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* EDIT BATCH MODAL */}
          {editingBatch && (
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-3">
              <div className="card border-0 shadow-lg rounded-4 p-4 bg-white" style={{ maxWidth: '500px', width: '90%' }}>
                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                  <h4 className="fw-bold text-dark mb-0"><i className="bi bi-pencil-square text-primary me-2"></i> Edit Batch {editingBatch.batchCode}</h4>
                  <button className="btn-close" onClick={() => setEditingBatch(null)}></button>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Price per Sapling (₹) *</label>
                  <input 
                    type="number" 
                    className="form-control fw-bold border-success fs-5 text-success" 
                    value={editPrice}
                    onChange={e => setEditPrice(Number(e.target.value))}
                  />
                  <small className="text-muted extra-small">Update selling price per sapling for batch {editingBatch.batchCode}.</small>
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Total Batch Quantity *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    value={editTotalQuantity}
                    onChange={e => setEditTotalQuantity(Number(e.target.value))}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small fw-bold">Batch Notes / Description</label>
                  <textarea 
                    className="form-control" 
                    rows={2} 
                    value={editDescription}
                    onChange={e => setEditDescription(e.target.value)}
                  ></textarea>
                </div>

                {/* Batch Images Gallery & Uploader */}
                <div className="mb-3 p-3 bg-light rounded-3 border">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <label className="form-label small fw-bold text-dark mb-0">
                        <i className="bi bi-images me-1 text-success"></i> Customer Photo Gallery ({editImages.length})
                      </label>
                      <span className="d-block extra-small text-muted font-monospace">
                        <i className="bi bi-folder-fill text-warning me-1"></i> /public/images/batches/{editingBatch.batchCode}/
                      </span>
                    </div>
                    {editImages.length > 0 && (
                      <button 
                        type="button" 
                        className="btn btn-sm btn-outline-danger py-0 px-2 extra-small"
                        onClick={removeAllEditImages}
                      >
                        <i className="bi bi-trash me-1"></i> Clear All Photos
                      </button>
                    )}
                  </div>
                  
                  {editImages.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2 mb-3 max-vh-25 overflow-auto p-2 bg-white border rounded">
                      {editImages.map((imgUrl, idx) => (
                        <div key={idx} className="position-relative d-inline-block">
                          <img 
                            src={imgUrl} 
                            alt={`Batch Photo ${idx+1}`} 
                            className="rounded border"
                            style={{ width: '65px', height: '65px', objectFit: 'cover' }}
                          />
                          <button 
                            type="button" 
                            className="btn btn-danger btn-sm py-0 px-1 position-absolute top-0 end-0 rounded-circle"
                            style={{ fontSize: '0.65rem', transform: 'translate(30%, -30%)' }}
                            onClick={() => removeEditImage(idx)}
                            title="Remove image"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <small className="text-muted d-block mb-2">No photos in this batch. Upload replacement images below.</small>
                  )}

                  <div className="mb-2">
                    <label className="form-label extra-small text-muted mb-1">
                      {uploading ? 'Uploading selected photos...' : 'Upload New Replacement Photos from Device:'}
                    </label>
                    <input 
                      type="file" 
                      className="form-control form-control-sm" 
                      multiple 
                      accept="image/*"
                      disabled={uploading}
                      onChange={handleAddEditFiles}
                    />
                  </div>
                </div>

                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button className="btn btn-outline-secondary" onClick={() => setEditingBatch(null)}>Cancel</button>
                  <button 
                    className="btn btn-success fw-bold"
                    onClick={handleSaveEdit}
                  >
                    <i className="bi bi-check-circle me-1"></i> Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}
