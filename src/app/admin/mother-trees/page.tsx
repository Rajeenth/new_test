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
      } else {
        alert('Failed to add mother tree');
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
        alert(`Mother Tree ${editingTree.code} updated!`);
        setEditingTree(null);
        fetchPalms();
      } else {
        alert('Failed to update mother tree');
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
                      value={editingTree.whySelected}
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
