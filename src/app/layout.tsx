import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Eathamozhy Coconut Farm | Premium Saplings & Traceability',
  description: 'Traditional Eathamozhy coconut saplings, carefully raised in our own farm and delivered to your farm. Transparent batch stock and Mother Palm traceability.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Bootstrap 5 CSS & Icons */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
        />
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" 
        />
      </head>
      <body className="bg-light">
        {/* Active Page Aware Navigation (Desktop & Mobile) */}
        <Navbar />

        {/* Main Content Area */}
        <main className="min-vh-100">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-dark text-white pt-5 pb-4 mt-5 border-top border-success border-3">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-4">
                <h5 className="text-success fw-bold mb-3">
                  <i className="bi bi-tree me-2"></i> Eathamozhy Coconut Farm
                </h5>
                <p className="text-secondary small">
                  Traditional Eathamozhy coconut saplings, raised in our own farm and delivered to your farm with 100% transparency and Mother Palm origin verification.
                </p>
                <div className="d-flex gap-2">
                  <a href="https://wa.me/919486880641" target="_blank" rel="noreferrer" className="btn btn-sm btn-outline-success">
                    <i className="bi bi-whatsapp me-1"></i> WhatsApp Us
                  </a>
                  <Link href="/contact" className="btn btn-sm btn-outline-light">
                    <i className="bi bi-telephone me-1"></i> Contact
                  </Link>
                </div>
              </div>

              <div className="col-md-2 col-6">
                <h6 className="text-uppercase fw-bold text-light mb-3">Explore</h6>
                <ul className="list-unstyled text-secondary small">
                  <li className="mb-2"><Link href="/farm" className="text-decoration-none text-secondary">Our Farm Story</Link></li>
                  <li className="mb-2"><Link href="/batches" className="text-decoration-none text-secondary">Live Batches</Link></li>
                  <li className="mb-2"><Link href="/about" className="text-decoration-none text-secondary">Eathamozhy Variety</Link></li>
                  <li className="mb-2"><Link href="/reviews" className="text-decoration-none text-secondary">Farmer Reviews</Link></li>
                </ul>
              </div>

              <div className="col-md-3 col-6">
                <h6 className="text-uppercase fw-bold text-light mb-3">Customer Care</h6>
                <ul className="list-unstyled text-secondary small">
                  <li className="mb-2"><Link href="/tracking" className="text-decoration-none text-secondary">Track Booking</Link></li>
                  <li className="mb-2"><Link href="/guide" className="text-decoration-none text-secondary">Coconut Planting Guide</Link></li>
                  <li className="mb-2"><Link href="/faq" className="text-decoration-none text-secondary">FAQs</Link></li>
                  <li className="mb-2"><Link href="/admin" className="text-decoration-none text-secondary">Admin Portal</Link></li>
                </ul>
              </div>

              <div className="col-md-3">
                <h6 className="text-uppercase fw-bold text-light mb-3">Farm Location</h6>
                <p className="text-secondary small mb-2">
                  <i className="bi bi-geo-alt-fill text-danger me-1"></i> Eathamozhy Village, Kanyakumari District, Tamil Nadu - 629501
                </p>
                <p className="text-secondary small mb-1">
                  <i className="bi bi-envelope me-1"></i> support@eathamozhycoconut.com
                </p>
                <p className="text-secondary small">
                  <i className="bi bi-phone me-1"></i> +91 94868 80641
                </p>
              </div>
            </div>

            <hr className="my-4 border-secondary" />

            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center text-secondary small">
              <p className="mb-2 mb-md-0">&copy; {new Date().getFullYear()} Eathamozhy Coconut Farm. All rights reserved.</p>
              <div>
                <span className="badge bg-success me-2">Authentic Farm Origin</span>
                <span className="badge bg-secondary">Pan-India Delivery</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
