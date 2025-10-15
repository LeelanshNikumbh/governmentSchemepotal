
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="container mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Column 1 - About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-md bg-gov-blue flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">G</span>
              </div>
              <span className="font-display font-semibold text-xl">GovSchemes</span>
            </div>
            <p className="text-gray-600 text-sm">
              Your one-stop platform for discovering government welfare schemes, subsidies, and financial assistance programs.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-500 hover:text-gov-blue transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gov-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gov-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gov-blue transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">Home</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">All Schemes</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">Eligibility Checker</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">Application Status</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">Contact Us</a>
              </li>
            </ul>
          </div>
          
          {/* Column 3 - Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">Agriculture</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">Education</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">Healthcare</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">Housing</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">Employment</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-gov-blue text-sm">Financial Inclusion</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4 - Contact */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-gov-blue mr-2 mt-0.5" />
                <span className="text-gray-600 text-sm">123 Government Complex, New Delhi, India - 110001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-gov-blue mr-2" />
                <span className="text-gray-600 text-sm">+91 1800-XXX-XXXX (Toll Free)</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-gov-blue mr-2" />
                <span className="text-gray-600 text-sm">contact@govschemes.gov.in</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-100 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © 2023 Government Schemes Portal. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gov-blue">Terms of Service</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gov-blue">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gov-blue">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
