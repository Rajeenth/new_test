'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Our Farm', href: '/farm' },
    { name: 'Eathamozhy Coconut', href: '/about' },
    { name: 'Available Batches', href: '/batches', isHighlight: true },
    { name: 'Farming Guide', href: '/guide' },
    { name: 'Reviews', href: '/reviews' },
    { name: 'Track Order', href: '/tracking' },
  ];

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Main Desktop & Laptop Navbar */}
      <header className="navbar navbar-expand-lg sticky-top navbar-dark bg-dark shadow-sm py-2">
        <div className="container">
          <Link href="/" className="navbar-brand d-flex align-items-center fw-bold text-success fs-4 me-4">
            <i className="bi bi-tree-fill me-2 text-success"></i> Eathamozhy Coconut Farm
          </Link>

          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarMain"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 fw-semibold gap-1">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="nav-item">
                    <Link 
                      href={link.href} 
                      className={`nav-link px-3 py-2 rounded-3 transition-all ${
                        active 
                          ? 'active fw-bold text-success bg-success-subtle bg-opacity-25 border border-success' 
                          : link.isHighlight 
                            ? 'text-warning' 
                            : 'text-light opacity-85 hover-opacity-100'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="d-flex align-items-center gap-2">
              <Link 
                href="/admin" 
                className={`btn btn-sm ${pathname.startsWith('/admin') ? 'btn-danger' : 'btn-outline-light'}`}
              >
                <i className="bi bi-shield-lock me-1"></i> Admin
              </Link>
              <Link href="/batches" className="btn btn-success fw-bold shadow-sm">
                <i className="bi bi-bag-check me-1"></i> Book Saplings
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Mobile Bottom Navigation Bar with Active Highlights */}
      <nav className="navbar fixed-bottom navbar-dark bg-dark d-md-none border-top border-secondary py-1 z-3">
        <div className="container-fluid d-flex justify-content-around text-center small">
          <Link 
            href="/" 
            className={`text-decoration-none p-1 ${pathname === '/' ? 'text-success fw-bold' : 'text-light'}`}
          >
            <i className={`bi bi-house-door${pathname === '/' ? '-fill text-success' : ''} d-block fs-5`}></i> Home
          </Link>
          
          <Link 
            href="/batches" 
            className={`text-decoration-none p-1 ${pathname.startsWith('/batches') ? 'text-warning fw-bold' : 'text-light'}`}
          >
            <i className={`bi bi-grid-3x3-gap${pathname.startsWith('/batches') ? '-fill text-warning' : ''} d-block fs-5`}></i> Batches
          </Link>

          <Link 
            href="/batches" 
            className="text-success text-decoration-none p-1 fw-bold"
          >
            <i className="bi bi-bag-plus-fill d-block fs-5 text-success"></i> Book
          </Link>

          <Link 
            href="/tracking" 
            className={`text-decoration-none p-1 ${pathname.startsWith('/tracking') ? 'text-success fw-bold' : 'text-light'}`}
          >
            <i className={`bi bi-truck${pathname.startsWith('/tracking') ? ' text-success' : ''} d-block fs-5`}></i> Track
          </Link>

          <a 
            href="https://wa.me/919486880641" 
            target="_blank" 
            rel="noreferrer" 
            className="text-success text-decoration-none p-1"
          >
            <i className="bi bi-whatsapp d-block fs-5"></i> WhatsApp
          </a>
        </div>
      </nav>
    </>
  );
}
