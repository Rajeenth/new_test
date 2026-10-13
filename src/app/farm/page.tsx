import Link from 'next/link';
import { DataStore } from '@/lib/dataStore';

export const dynamic = 'force-dynamic';

export default function OurFarmPage() {
  // Pull images from DB so any admin update is instantly reflected here
  const palms = DataStore.getParentPalms();
  const batches = DataStore.getBatches();

  // Helper: get first image URL from a list, with a fallback
  const img = (urls: string[] | undefined) =>
    urls && urls.length > 0 ? urls[0] : '/images/placeholder.png';

  const palm1 = palms.find(p => p.code === 'EM-MP-001');
  const palm2 = palms.find(p => p.code === 'EM-MP-002');
  const batch1 = batches.find(b => b.batchCode === 'EM-0126-A');
  const batch2 = batches.find(b => b.batchCode === 'EM-0226-B');

  // Gallery: 3 photos from DB
  const galleryPhotos = [
    { src: img(batch1?.images), alt: 'Farm Seedbeds', label: 'Farm Seedbeds' },
    { src: img(palm1?.images), alt: 'Mother Palms', label: 'Ancestral Mother Tree Grove' },
    { src: img(batch2?.images), alt: 'Saplings Row', label: '7–9 Month Sapling Rows' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero-ambient-mesh text-white py-5 position-relative overflow-hidden border-bottom border-success border-opacity-25">
        <div className="container position-relative py-5">
          <span className="badge bg-success px-3 py-2 fs-6 rounded-pill mb-3">OUR HERITAGE</span>
          <h1 className="display-4 fw-bold mb-3">Our Farm. Our Roots. Our Tradition.</h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
            Over 80 years of dedicated coconut cultivation in the coastal soil of Eathamozhy, Kanyakumari.
          </p>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-5 bg-white">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">The Eathamozhy Farm Journey</h2>
            <p className="text-muted">How generations of passion built our transparent direct-from-farm platform</p>
          </div>

          <div className="row g-4 align-items-center mb-5">
            <div className="col-md-6">
              <span className="badge bg-success mb-2">1. OUR BEGINNING</span>
              <h3 className="fw-bold text-dark">Ancestral Roots in Eathamozhy</h3>
              <p className="text-secondary">
                Our farm was established in the early 1940s in Eathamozhy village, Kanyakumari district—a region globally renowned for its unique coastal microclimate, high groundwater table, and fertile soil perfect for tall coconut cultivars.
              </p>
            </div>
            <div className="col-md-6">
              {/* Image URL read from DB — updates instantly when admin changes it */}
              <img
                src={img(palm1?.images)}
                alt="Ancestral Grove"
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
              />
            </div>
          </div>

          <div className="row g-4 align-items-center mb-5 flex-row-reverse">
            <div className="col-md-6">
              <span className="badge bg-success mb-2">2. GENERATIONS OF FARMING</span>
              <h3 className="fw-bold text-dark">Selection of Mother Palms</h3>
              <p className="text-secondary">
                For over 40 years, our elders systematically recorded and marked the highest yielding coconut palms on our land. Only seednuts harvested from these verified mother trees (aging 70–80+ years) are selected to raise our sapling batches.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src={img(batch1?.images)}
                alt="Mother Palms Selection"
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
              />
            </div>
          </div>

          <div className="row g-4 align-items-center mb-5">
            <div className="col-md-6">
              <span className="badge bg-success mb-2">3. TAKING OUR SAPLINGS ONLINE</span>
              <h3 className="fw-bold text-dark">Total Transparency for Farmers</h3>
              <p className="text-secondary">
                Unlike commercial middlemen who trade saplings from unknown brokers, we raise every single sapling directly on our own ancestral farm so agricultural buyers across Tamil Nadu and Pan-India can inspect the exact mother tree, view actual batch stock numbers, and book with complete peace of mind.
              </p>
            </div>
            <div className="col-md-6">
              <img
                src={img(palm2?.images)}
                alt="Online Farm Platform"
                className="img-fluid rounded-4 shadow-sm"
                style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Farm Photo Gallery */}
      <section className="py-5 bg-light border-top">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold text-dark">Farm Photo Gallery</h2>
            <p className="text-muted">Real moments captured from our seedbeds, harvest, and packing</p>
          </div>

          <div className="row g-3">
            {galleryPhotos.map((photo, idx) => (
              <div key={idx} className="col-md-4 col-6">
                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="img-fluid object-fit-cover"
                    style={{ height: '220px', width: '100%' }}
                  />
                  <div className="card-body p-2 text-center bg-white">
                    <small className="fw-bold text-dark">{photo.label}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link href="/batches" className="btn btn-success btn-lg fw-bold">
              View Available Sapling Batches <i className="bi bi-arrow-right me-1"></i>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
