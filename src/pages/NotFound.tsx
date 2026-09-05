import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';
import '../styles/NotFound.css';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="notfound-section" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container notfound-container">
          <div className="notfound-404">
            404
          </div>
          <h1 className="notfound-title">
            Page Not <span className="notfound-highlight">Found</span>
          </h1>
          <p className="notfound-desc">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="notfound-actions">
            <Button to="/" variant="primary" size="lg">
              Back to Home
            </Button>
            <Button to="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
