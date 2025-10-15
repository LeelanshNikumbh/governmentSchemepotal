
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { SearchBar } from './SearchBar';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative pt-28 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden">
      {/* Background decor */}
      <div className="absolute top-0 left-0 right-0 bottom-0 -z-10 opacity-80">
        <div className="absolute top-20 left-[10%] w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-gov-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Pre-title */}
          <span 
            className={`px-4 py-1.5 text-sm font-medium bg-blue-50 text-gov-darkBlue rounded-full
              ${isLoaded ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.1s' }}
          >
            Accessing government benefits made simple
          </span>
          
          {/* Main title */}
          <h1 
            className={`text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight tracking-tight max-w-4xl
              ${isLoaded ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.3s' }}
          >
            Discover <span className="text-gov-blue">Government Schemes</span> You're Eligible For
          </h1>
          
          {/* Subtitle */}
          <p 
            className={`text-lg md:text-xl text-gray-600 max-w-2xl
              ${isLoaded ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.5s' }}
          >
            Navigate through hundreds of welfare schemes, subsidies, and financial
            assistance programs designed to support citizens across various sectors.
          </p>
          
          {/* Search bar */}
          <div 
            className={`w-full max-w-2xl mt-6
              ${isLoaded ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.7s' }}
          >
            <SearchBar />
          </div>
          
          {/* CTA buttons */}
          <div 
            className={`flex flex-col sm:flex-row items-center gap-4 mt-8
              ${isLoaded ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '0.9s' }}
          >
            <Button className="button-animation bg-gov-blue text-white hover:bg-gov-blue/90 px-8 py-6 text-base">
              Check Eligibility
            </Button>
            <Link to="/schemes">
              <Button className="button-animation bg-white text-gov-darkBlue border border-gray-200 hover:bg-gray-50 px-8 py-6 text-base">
                Browse All Schemes
              </Button>
            </Link>
          </div>
          
          {/* Stats */}
          <div 
            className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 pt-10 
              ${isLoaded ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: '1.1s' }}
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gov-blue">500+</span>
              <span className="text-sm text-gray-600 mt-1">Active Schemes</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gov-blue">50M+</span>
              <span className="text-sm text-gray-600 mt-1">Citizens Benefited</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gov-blue">28</span>
              <span className="text-sm text-gray-600 mt-1">States Covered</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gov-blue">12</span>
              <span className="text-sm text-gray-600 mt-1">Categories</span>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="flex justify-center mt-20">
          <ArrowDown className={`h-6 w-6 text-gray-400 animate-float ${isLoaded ? 'opacity-100' : 'opacity-0'}`} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
