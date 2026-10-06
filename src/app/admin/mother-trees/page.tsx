'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminMotherTreesPage() {
  const [palms, setPalms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Mother Tree Form State
  const [newTree, setNewTree] = useState({
    code: 'EM-MP-020',
    name: 'Plot C Selected Mother Tree #20',
    age: 45,
    location: 'Coastal Plot C, Eathamozhy Farm',
    healthStatus: 'Excellent (100% Disease Resistant)',
    yieldHistory: '180–210 nuts per palm per year',
    description: 'Selected for heavy canopy, disease immunity, and large copra content.',
    nutCharacteristics: 'Large spherical nuts with high coconut water volume and thick kernel.',
    whySelected: 'Consistently high yield for over 40 years without dropping premature buttons.',
    images: ['/images/placeholders/coconut1.jpeg']
  });

  // Edit Modal State
  const [editingTree, setEditingTree] = useState<any | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUploadTreeFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !editingTree) return;
    const files = Array.from(e.target.files);
    setUploading(true);
    const formData = new FormData();
    files.forEach(f => formData.append('files', f));
    formData.append('category', 'parent-palms');
    formData.append('tag', editingTree.code);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (res.ok && data.urls) {
        setEditingTree((prev: any) => prev ? {
          ...prev,
          images: [...(prev.images || []), ...data.urls]
        } : null);
        alert(`Successfully added ${data.urls.length} photo(s) for Mother Tree ${editingTree.code}!`);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      alert('Error uploading images');
    } finally {
      setUploading(false);
    }
  };

  const removeTreeImage = (idxToRemove: number) => {
    if (!editingTree) return;
    setEditingTree({
      ...editingTree,
      images: (editingTree.images || []).filter((_: any, idx: number) => idx !== idxToRemove)
    });
  };

  const removeAllTreeImages = () => {
    if (!editingTree) return;
    if (confirm('Are you sure you want to clear all photos for this mother tree?')) {
      setEditingTree({
        ...editingTree,
        images: []
      });
    }
  };

  const fetchPalms = async () => {
    try {
      const res = await fetch('/api/parent-palms');
      const data = await res.json();
      setPalms(data);
    } catch (err) {
      console.error('Failed to fetch parent palms');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPalms();
  }, []);

  const handleCreateTree = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/parent-palms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTree)
      });
      if (res.ok) {
        alert(`Mother Tree ${newTree.code} added successfully!`);
        fetchPalms();
        // Reset form to clear inputs and auto-increment code
        const nextNum = Math.floor(25 + Math.random() * 50);
        setNewTree({
          code: `EM-MP-0${nextNum}`,
          name: `Plot C Selected Mother Tree #${nextNum}`,
          age: 40,
          location: 'Eathamozhy Main Grove',
          healthStatus: 'Excellent (Vigorous Nut Producer)',
          yieldHistory: '160–180 nuts per palm per year',
          description: 'High-yielding mother tree selected for mother seed nut production.',
          nutCharacteristics: 'Large spherical nuts with high coconut water volume and thick kernel.',
          whySelected: 'Consistently high yield with exceptional seedling germination rate.',
          images: ['/images/placeholders/coconut.jpeg']
        });
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to add mother tree');
      }
    } catch (err) {
      alert('Error adding mother tree');
    }
  };

  const handleUpdateTree = async () => {
    if (!editingTree) return;
    try {
      const res = await fetch('/api/parent-palms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingTree)
      });
      if (res.ok) {
        alert(`Mother Tree ${editingTree.code} updated successfully!`);
        setEditingTree(null);
        fetchPalms();
      } else {
        const errData = await res.json();
        alert(errData.error || 'Failed to update mother tree');
      }
    } catch (err) {
      alert('Error updating mother tree');
    }
  };

  const handleDeleteTree = async (code: string) => {
    if (!confirm(`Are you sure you want to delete Mother Tree ${code}?`)) return;
    try {
      const res = await fetch(`/api/parent-palms?code=${encodeURIComponent(code)}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert(`Mother Tree ${code} deleted.`);
        fetchPalms();
      } else {
        alert('Failed to delete mother tree');
      }
    } catch (err) {
      alert('Error deleting mother tree');
    }
  };

  return (
    <>
      <section className="bg-dark text-white py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <div>
            <span className="badge bg-success me-2">GENETICS ADMIN</span>
            <h3 className="fw-bold mb-0 text-light d-inline align-middle">Mother Tree (Parent Palm) Management</h3>
          </div>
          <Link href="/admin" className="btn btn-outline-light btn-sm">
            <i className="bi bi-arrow-left me-1"></i> Back to Admin Dashboard
          </Link>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          
          {/* Create New Mother Tree Form */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-white">
            <h4 className="fw-bold text-dark mb-3"><i className="bi bi-tree-fill me-2 text-success"></i> Add New Mother Tree (Parent Palm)</h4>
            
            <form onSubmit={handleCreateTree}>
              <div className="row g-3">
                <div className="col-md-3">
                  <label className="form-label small fw-bold">Mother Tree Code *</label>
                  <input 
                    type="text" 
                    className="form-control fw-bold border-success" 
                    required 
                    placeholder="e.g. EM-MP-020"
                    value={newTree.code}
                    onChange={e => setNewTree({ ...newTree, code: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Tree Name / Label *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    required 
                    value={newTree.name}
                    onChange={e => setNewTree({ ...newTree, name: e.target.value })}
                  />
                </div>

                <div className="col-md-3">
                  <label className="form-label small fw-bold">Tree Age (Years) *</label>
                  <input 
                    type="number" 
                    className="form-control" 
                    required 
                    value={newTree.age}
                    onChange={e => setNewTree({ ...newTree, age: Number(e.target.value) })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Farm Plot Location</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newTree.location}
                    onChange={e => setNewTree({ ...newTree, location: e.target.value })}
                  />
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold">Annual Yield Record</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newTree.yieldHistory}
                    onChange={e => setNewTree({ ...newTree, yieldHistory: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Why Selected (Selection Rationale)</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={newTree.whySelected}
                    onChange={e => setNewTree({ ...newTree, whySelected: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label small fw-bold">Nut Characteristics & Description</label>
                  <textarea 
                    className="form-control" 
                    rows={2}
                    value={newTree.description}
                    onChange={e => setNewTree({ ...newTree, description: e.target.value })}
                  ></textarea>
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-success fw-bold px-4">
                    <i className="bi bi-plus-circle me-1"></i> Save Mother Tree Record
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Mother Trees List Table */}
          <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
            <h4 className="fw-bold text-dark mb-3">Registered Mother Trees ({palms.length})</h4>

            {loading ? (
              <div className="text-center py-4">Loading mother tree data...</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Tree Code</th>
                      <th>Tree Name</th>
                      <th>Age</th>
                      <th>Location</th>
                      <th>Yield Record</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {palms.map(p => (
                      <tr key={p.id}>
                        <td><strong className="text-success">{p.code}</strong></td>
                        <td><strong>{p.name}</strong></td>
                        <td><span className="badge bg-dark">{p.age} Years</span></td>
                        <td><small className="text-muted">{p.location}</small></td>
                        <td><small className="text-success fw-bold">{p.yieldHistory}</small></td>
                        <td>
                          <div className="d-flex gap-1">
                            <Link href={`/parent-palm/${p.code}`} target="_blank" className="btn btn-sm btn-outline-info">
                              <i className="bi bi-eye"></i> View
                            </Link>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => setEditingTree(p)}>
                              <i className="bi bi-pencil"></i> Edit
                            </button>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteTree(p.code)}>
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

          {/* EDIT MOTHER TREE MODAL */}
          {editingTree && (
            <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex align-items-center justify-content-center z-3">
              <div className="card border-0 shadow-lg rounded-4 p-4 bg-white" style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center mb-3 border-bottom pb-2">
                  <h4 className="fw-bold text-dark mb-0"><i className="bi bi-pencil-square text-success me-2"></i> Edit Mother Tree {editingTree.code}</h4>
                  <button className="btn-close" onClick={() => setEditingTree(null)}></button>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Mother Tree Code</label>
                    <input 
                      type="text" 
                      className="form-control fw-bold border-success" 
                      value={editingTree.code}
                      onChange={e => setEditingTree({ ...editingTree, code: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Name</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editingTree.name}
                      onChange={e => setEditingTree({ ...editingTree, name: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Age (Years)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      value={editingTree.age}
                      onChange={e => setEditingTree({ ...editingTree, age: Number(e.target.value) })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Health Status</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editingTree.healthStatus || ''}
                      onChange={e => setEditingTree({ ...editingTree, healthStatus: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Location</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editingTree.location}
                      onChange={e => setEditingTree({ ...editingTree, location: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small fw-bold">Yield Record</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editingTree.yieldHistory}
                      onChange={e => setEditingTree({ ...editingTree, yieldHistory: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold">Why Selected</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      value={editingTree.whySelected || ''}
                      onChange={e => setEditingTree({ ...editingTree, whySelected: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label small fw-bold">Nut Characteristics & Description</label>
                    <textarea 
                      className="form-control" 
                      rows={3} 
                      value={editingTree.description}
                      onChange={e => setEditingTree({ ...editingTree, description: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Mother Tree Images Gallery & Uploader */}
                  <div className="col-12 bg-light p-3 rounded-3 border">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <label className="form-label small fw-bold text-dark mb-0">
                        <i className="bi bi-images me-1 text-success"></i> Mother Tree Photos ({(editingTree.images || []).length})
                      </label>
                      {(editingTree.images || []).length > 0 && (
                        <button 
                          type="button" 
                          className="btn btn-sm btn-outline-danger py-0 px-2 extra-small"
                          onClick={removeAllTreeImages}
                        >
                          <i className="bi bi-trash me-1"></i> Clear All Photos
                        </button>
                      )}
                    </div>
                    
                    {(editingTree.images || []).length > 0 ? (
                      <div className="d-flex flex-wrap gap-2 mb-3 max-vh-25 overflow-auto p-2 bg-white border rounded">
                        {editingTree.images.map((imgUrl: string, idx: number) => (
                          <div key={idx} className="position-relative d-inline-block">
                            <img 
                              src={imgUrl} 
                              alt={`Mother Tree Photo ${idx+1}`} 
                              className="rounded border"
                              style={{ width: '65px', height: '65px', objectFit: 'cover' }}
                            />
                            <button 
                              type="button" 
                              className="btn btn-danger btn-sm py-0 px-1 position-absolute top-0 end-0 rounded-circle"
                              style={{ fontSize: '0.65rem', transform: 'translate(30%, -30%)' }}
                              onClick={() => removeTreeImage(idx)}
                              title="Remove image"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <small className="text-muted d-block mb-2">No photos uploaded for this tree yet.</small>
                    )}

                    <div>
                      <label className="form-label extra-small text-muted mb-1">
                        {uploading ? 'Uploading selected photos...' : 'Upload New Mother Tree Photographs:'}
                      </label>
                      <input 
                        type="file" 
                        className="form-control form-control-sm" 
                        multiple 
                        accept="image/*"
                        disabled={uploading}
                        onChange={handleUploadTreeFiles}
                      />
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-2 justify-content-end mt-4">
                  <button className="btn btn-outline-secondary" onClick={() => setEditingTree(null)}>Cancel</button>
                  <button className="btn btn-success fw-bold" onClick={handleUpdateTree}>
                    Save Changes
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
