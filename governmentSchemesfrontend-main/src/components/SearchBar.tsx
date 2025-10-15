
import { useState } from 'react';
import { Sparkle, Search, Flame, Rocket } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  
  const handleExplore = () => {
    // Navigate to schemes page with the selected category as a query parameter
    if (category) {
      navigate(`/schemes?category=${category.toLowerCase()}`);
    } else {
      navigate('/schemes');
    }
  };
  
  return (
    <div 
      className={cn(
        "flex items-center w-full h-14 px-5 py-3 bg-white rounded-full border",
        "transition-all duration-300 ease-in-out",
        isFocused 
          ? 'shadow-lg border-gov-blue/30 ring-4 ring-gov-blue/10' 
          : 'shadow-card border-gray-200 hover:border-gray-300'
      )}
    >
      <div className="flex items-center justify-center h-5 w-5 mr-3">
        {isFocused ? (
          <Search className="h-5 w-5 text-gov-blue animate-fade-in" />
        ) : (
          <Rocket className="h-5 w-5 text-gov-blue animate-pulse" />
        )}
      </div>
      
      <div className="flex-1 relative">
        <Select value={category} onValueChange={setCategory} onOpenChange={(open) => setIsFocused(open)}>
          <SelectTrigger 
            className="w-full bg-transparent border-none shadow-none  text-gray-800 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0 py-0 h-auto outline-none"
          >
            <SelectValue  className='border-none outline-none'/>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="education">Education & Scholarships</SelectItem>
            <SelectItem value="health">Healthcare & Medical</SelectItem>
            <SelectItem value="agriculture">Agriculture & Farming</SelectItem>
            <SelectItem value="housing">Housing & Urban Development</SelectItem>
            <SelectItem value="business">Business & Entrepreneurship</SelectItem>
            <SelectItem value="women">Women & Child Development</SelectItem>
            <SelectItem value="elderly">Senior Citizens</SelectItem>
            <SelectItem value="disability">Disability Support</SelectItem>
            <SelectItem value="employment">Employment & Skill Development</SelectItem>
            <SelectItem value="financial">Financial Inclusion</SelectItem>
          </SelectContent>
        </Select>
        
        {!isFocused && !category && (
          <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
            <span className="text-gray-400">Discover government schemes...</span>
            <span className="text-xs text-gov-blue bg-gov-blue/10 px-2 py-1 rounded-full">Explore opportunities</span>
          </div>
        )}
      </div>
      
      <button 
        className="ml-2 px-4 py-1.5 bg-gov-lightBlue text-white rounded-full text-sm font-medium transition-colors hover:bg-gov-blue"
        onClick={handleExplore}
      >
        Explore
      </button>
    </div>
  );
};
