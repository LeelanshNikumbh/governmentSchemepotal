
import { useState, useEffect } from 'react';
import { Menu, X, Sparkle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ease-in-out",
        isScrolled 
          ? "bg-white/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-md bg-gov-blue flex items-center justify-center">
              <span className="text-white font-display font-bold text-lg">G</span>
            </div>
            <span className="font-display font-semibold text-xl">GovSchemes</span>
          </Link>
          
          
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-full bg-gov-blue/10 hover:bg-gov-blue/20 transition-colors group">
              <Sparkle className="h-5 w-5 text-gov-blue group-hover:animate-pulse" />
            </button>
            <Link to="/login">
              <Button variant="outline" className="border-gray-200 hover:border-gray-300 hover:bg-gray-50">
                Log In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="button-animation bg-gov-blue text-white hover:bg-gov-blue/90">
                Sign Up
              </Button>
            </Link>
          </div>
          
          <button 
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-2xl mt-1 p-5 animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Home</Link>
              <Link to="/schemes" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Schemes</Link>
              <Link to="/eligibility" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Eligibility</Link>
              <Link to="/resources" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Resources</Link>
              <Link to="/contact" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Contact</Link>
              <Link to="/login" className="font-medium text-gray-700 hover:text-gov-blue px-2 py-2 rounded-md hover:bg-gray-50 transition-colors">Log In</Link>
              <Link to="/signup">
                <Button className="w-full button-animation bg-gov-blue text-white hover:bg-gov-blue/90">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
