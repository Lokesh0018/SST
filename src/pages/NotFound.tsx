import PageTransition from '../components/common/PageTransition';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <PageTransition>
      <section className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #F7F0E0 0%, #EFE4CF 100%)' }}>
        <div className="container text-center">
          <div className="text-[120px] md:text-[180px] font-extrabold text-cream-dark/30 leading-none select-none">
            404
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight -mt-6 mb-4">
            Page Not <span className="text-orange">Found</span>
          </h1>
          <p className="text-charcoal/60 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex items-center justify-center gap-4">
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
