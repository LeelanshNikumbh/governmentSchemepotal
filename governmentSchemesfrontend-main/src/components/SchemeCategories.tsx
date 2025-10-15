
import { Book, Home, Heart, GraduationCap, Building, Briefcase, Users, Leaf, FileText, Landmark, ArrowRight } from 'lucide-react';
import { SchemeCard } from './SchemeCard';
import { Link } from 'react-router-dom';
import Scholarship  from "../type.ts"

export const SchemeCategories = ({schemes}:{schemes:Scholarship[]}) => {
  
  

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-blue-50/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Popular Scheme Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our most sought-after government schemes across various sectors designed to support and empower citizens
          </p>
        </div>
        
        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Link to="/schemes">
            <button className="px-5 py-2.5 rounded-full bg-gov-blue text-white flex items-center gap-2 transition-all hover:shadow-md">
              <Users className="h-4 w-4" />
              <span>All Schemes</span>
            </button>
          </Link>
          <Link to="/schemes?category=agriculture">
            <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
              <Leaf className="h-4 w-4 text-green-600" />
              <span>Agriculture</span>
            </button>
          </Link>
          <Link to="/schemes?category=education">
            <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
              <GraduationCap className="h-4 w-4 text-blue-600" />
              <span>Education</span>
            </button>
          </Link>
          <Link to="/schemes?category=healthcare">
            <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
              <Heart className="h-4 w-4 text-rose-600" />
              <span>Healthcare</span>
            </button>
          </Link>
          <Link to="/schemes?category=housing">
            <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
              <Home className="h-4 w-4 text-orange-600" />
              <span>Housing</span>
            </button>
          </Link>
          <Link to="/schemes?category=employment">
            <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
              <Briefcase className="h-4 w-4 text-purple-600" />
              <span>Employment</span>
            </button>
          </Link>
          <Link to="/schemes?category=financial">
            <button className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-gray-800 flex items-center gap-2 transition-all hover:border-gray-300 hover:shadow-sm">
              <Landmark className="h-4 w-4 text-indigo-600" />
              <span>Financial</span>
            </button>
          </Link>
        </div>
        
        {/* Schemes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schemes.map((scheme, index) => (
            <SchemeCard key={index} {...scheme} />
          ))}
        </div>
        
        {/* View more button */}
        <div className="flex justify-center mt-12">
          <Link to="/schemes">
            <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-white border border-gray-200 text-gray-800 transition-all hover:border-gray-300 hover:shadow-md button-animation">
              <span>View All Schemes</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
