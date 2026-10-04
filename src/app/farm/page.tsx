import Link from 'next/link';

export default function OurFarmPage() {
  return (
    <>
      {/* Hero with Local Folder Background */}
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
            <p className="text-muted">How generations of passion built our transparent online nursery</p>
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
              <img src="/images/placeholders/coconut.jpeg" alt="Ancestral Grove" className="img-fluid rounded-4 shadow-sm" />
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
              <img src="/images/placeholders/coconut1.jpeg" alt="Mother Palms Selection" className="img-fluid rounded-4 shadow-sm" />
            </div>
          </div>

          <div className="row g-4 align-items-center mb-5">
            <div className="col-md-6">
              <span className="badge bg-success mb-2">3. TAKING OUR SAPLINGS ONLINE</span>
              <h3 className="fw-bold text-dark">Total Transparency for Farmers</h3>
              <p className="text-secondary">
                Many nurseries buy saplings from unknown third-party brokers. We built this platform so agricultural buyers across Tamil Nadu and Pan-India can inspect the exact mother tree, view actual batch stock numbers, and book with complete peace of mind.
              </p>
            </div>
            <div className="col-md-6">
              <img src="/images/placeholders/coconut2.jpeg" alt="Online Farm Platform" className="img-fluid rounded-4 shadow-sm" />
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
            <div className="col-md-4 col-6">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <img src="/images/placeholders/coconut.jpeg" alt="Farm Plot" className="img-fluid object-fit-cover" style={{ height: '220px' }} />
                <div className="card-body p-2 text-center bg-white">
                  <small className="fw-bold text-dark">Nursery Seedbeds</small>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-6">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <img src="/images/placeholders/coconut1.jpeg" alt="Mother Palms" className="img-fluid object-fit-cover" style={{ height: '220px' }} />
                <div className="card-body p-2 text-center bg-white">
                  <small className="fw-bold text-dark">Ancestral Mother Tree Grove</small>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-6">
              <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                <img src="/images/placeholders/coconut2.jpeg" alt="Saplings Row" className="img-fluid object-fit-cover" style={{ height: '220px' }} />
                <div className="card-body p-2 text-center bg-white">
                  <small className="fw-bold text-dark">7-9 Month Sapling Rows</small>
                </div>
              </div>
            </div>
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
