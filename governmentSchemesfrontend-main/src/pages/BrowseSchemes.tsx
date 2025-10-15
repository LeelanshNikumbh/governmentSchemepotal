import {useRef, useState, useEffect, useMemo } from "react";
import {api} from "../utils/AxiosConfig";
import { useToast } from "@/hooks/use-toast"; // Assuming this is your toast hook
import { Link } from "react-router-dom"; // Assuming you're using React Router
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationNext } from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { BookmarkIcon, BookmarkX, ChevronRight, Leaf, GraduationCap, Heart, Home, Briefcase, Book, Landmark } from "lucide-react"; // Icons
import Navbar from "../components/Navbar"
import Footer from "@/components/Footer";
// Define the Scholarships type
interface Scholarships {
  id: number;
  title: string;
  category: string;
  eligibility: string[];
  benefit: string;
  deadline: string;
  color?: string; // Optional property for badge styling
}

const BrowseSchemes = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all categories");
  const [currentPage, setCurrentPage] = useState(1);
  const [allSchemes, setAllSchemes] = useState<Scholarships[]>([]);
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const userId = useRef<string>('')
  const { toast } = useToast();
  const schemesPerPage = 5;
  const bookmarkPost = async (userId: number, scholarshipId: number) => {
    try {
      const result = await api.post(`http://localhost:8080/api/bookmarks`, { userId, scholarshipId });
      if (result.status === 200) {
        setBookmarks((prev) => [...prev, scholarshipId]);
        toast({ title: "Success", description: "Bookmark Added" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to add bookmark" });
    }
  };

  const removeBookmark = async (userId: number, scholarshipId: number) => {
    try {
      const result = await api.delete(`http://localhost:8080/api/bookmarks/user/${userId}/scholarship/${scholarshipId}`);
      if (result.status === 200) {
        setBookmarks((prev) => prev.filter((id) => id !== scholarshipId));
        toast({ title: "Success", description: "Bookmark Removed" });
      }
    } catch (error) {
      toast({ title: "Error", description: "Failed to remove bookmark" });
    }
  };

  const getBookmarks = async () => {
    try {
      const result = await api.get(`http://localhost:8080/api/bookmarks/user/scholarships/${userId.current}`);
      return result.data;
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
      return [];
    }
  };

  const getAllSchemes = async (): Promise<Scholarships[]> => {
    try {
      const response = await api.get("http://localhost:8080/api/scholarships");
      return response.data;
    } catch (error) {
      console.error("Failed to fetch schemes:", error);
      return [];
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      const [schemesData, bookmarksData] = await Promise.all([getAllSchemes(), getBookmarks()]);
      setAllSchemes(schemesData);
      setBookmarks(bookmarksData);
      setIsLoaded(true);
    };

    userId.current = localStorage.getItem("userid")
    fetchData();
  }, []);

  // Filter schemes (memoized)
  const filteredSchemes = useMemo(() => {
    let filtered = [...allSchemes];

    if (searchQuery) {
      filtered = filtered.filter((scheme) =>
        [scheme.title, scheme.category, scheme.eligibility.join(" "), scheme.benefit]
          .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedCategory !== "all categories") {
      filtered = filtered.filter((scheme) => scheme.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    return filtered;
  }, [allSchemes, searchQuery, selectedCategory]);

  // Pagination logic (memoized)
  const currentSchemes = useMemo(() => {
    const indexOfLastScheme = currentPage * schemesPerPage;
    const indexOfFirstScheme = indexOfLastScheme - schemesPerPage;
    return filteredSchemes.slice(indexOfFirstScheme, indexOfLastScheme);
  }, [filteredSchemes, currentPage]);

  const totalPages = Math.ceil(filteredSchemes.length / schemesPerPage);

  // Show toast when schemes load
  useEffect(() => {
    if (isLoaded) {
      toast({
        title: "Schemes Loaded",
        description: `${filteredSchemes.length} schemes available to browse`,
      });
    }
  }, [isLoaded, filteredSchemes.length]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Category options and icons (unchanged)
  const categoryOptions = [
    { value: "all categories", label: "All Categories" },
    { value: "agriculture", label: "Agriculture" },
    { value: "education", label: "Education" },
    { value: "healthcare", label: "Healthcare" },
    { value: "housing", label: "Housing" },
    { value: "financial", label: "Financial" },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "agriculture": return <Leaf className="h-4 w-4 text-green-600" />;
      case "education": return <GraduationCap className="h-4 w-4 text-blue-600" />;
      case "healthcare": return <Heart className="h-4 w-4 text-rose-600" />;
      case "housing": return <Home className="h-4 w-4 text-orange-600" />;
      case "financial": return <Landmark className="h-4 w-4 text-indigo-600" />;
      default: return <Book className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex-1">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold font-display mb-2">Browse All Schemes</h1>
            <p className="text-gray-600">Discover government schemes across various sectors</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all categories");
                }}
              >
                Reset Filters
              </Button>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              {isLoaded ? `Showing ${currentSchemes.length} of ${filteredSchemes.length} schemes` : "Loading schemes..."}
            </div>
          </div>

          <div className="space-y-4">
            {isLoaded && currentSchemes.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-8 text-center">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No schemes found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all categories");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {currentSchemes.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 hover:shadow-md transition-all">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between">
                    <Badge className="flex items-center gap-1" style={{ backgroundColor: `${scheme.color}20`, color: scheme.color }}>
                      {getCategoryIcon(scheme.category)}
                      {scheme.category}
                    </Badge>
                    <div className="text-sm text-gray-500">Deadline: {scheme.deadline}</div>
                  </div>
                  <Link to={`/scheme/${scheme.title.replace(/\s+/g, "-")}`} className="block">
                    <h2 className="text-xl font-semibold hover:text-gov-blue transition-colors">{scheme.title}</h2>
                  </Link>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Eligibility</h3>
                      <p className="text-sm text-gray-600 mt-1">{scheme.eligibility.join(", ")}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-700">Benefit</h3>
                      <p className="text-sm text-gray-600 mt-1">{scheme.benefit}</p>
                    </div>
                  </div>
                  <div className="flex justify-end items-center space-x-3">
                    {bookmarks.includes(scheme.id) ? (
                      <Button className="bg-white hover:bg-white" onClick={() => removeBookmark(Number(userId.current), scheme.id)}>
                        <BookmarkX className="h-6 w-6 text-gray-600" />
                      </Button>
                    ) : (
                      <Button className="bg-white hover:bg-white" onClick={() => bookmarkPost(Number(userId.current), scheme.id)}>
                        <BookmarkIcon className="h-6 w-6 text-gray-600" />
                      </Button>
                    )}
                    <Link to={`/scheme/${scheme.title.replace(/\s+/g, "-")}`}>
                      <Button className="flex items-center gap-1">
                        View Details <ChevronRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}

            {!isLoaded && (
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {filteredSchemes.length > 0 && isLoaded && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink isActive={currentPage === index + 1} onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
<Footer />
    </div>
  );
};

export default BrowseSchemes;
