
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { 
  Bell, Search, Filter, Star, Clock
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import DashboardSidebar from '@/components/DashboardSidebar';
import axios from 'axios';
import Scholarship from "../type"
import {api} from "../utils/AxiosConfig"
interface User {
  id :number,
  email: string,
  username:string,
  password : string
}

interface ApiData {
  user:User,
  scholarship:Scholarship,
  createdAt : string

}
const Dashboard = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("saved");
  const [saved,setSaved] = useState<ApiData[]>([])
  const { toast } = useToast();
  
  const userid = localStorage.getItem("userid")
  const getUsersBookmarks = async (): Promise<ApiData[]> => {
    const response = await api.get(`http://localhost:8080/api/bookmarks/user/${userid}`);
    const filteredData: ApiData[] = response.data; 
    return filteredData;
  }

  useEffect(() => {
    const filterData = async () => {
      const result = await getUsersBookmarks();
      setIsLoaded(true);
      setSaved(result);
    };
    filterData();
  }, []);


  useEffect(() => {

    setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: `You have ${saved.length}  saved schemes`,
      });
    }, 1000);
  }, [isLoaded]);
  
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 flex-1">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <DashboardSidebar />
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Welcome Banner */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold font-display mb-2">Welcome back,</h1>
                  <p className="text-gray-600">
                    Browse through government schemes you might be interested in
                  </p>
                </div>
                
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-6">
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="text-amber-600 mb-2 font-semibold">Saved Schemes</div>
                  <div className="text-2xl font-bold">{saved.length}</div>
                </div>
              </div>
            </div>
            
            
            
            <Tabs defaultValue="saved" className="w-full" onValueChange={setActiveTab}>
            
              
              <TabsContent value="saved">
                <div className="space-y-4">
                  {saved.map((scheme) => (
                    <div 
                      key={scheme.scholarship.id}
                      className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                          <Link to={`/scheme/${scheme.scholarship.title.replace(/\s+/g, '-')}`} className="block">
                            <h3 className="text-lg font-semibold hover:text-gov-blue transition-colors">{scheme.scholarship.title}</h3>
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                              {scheme.scholarship.category}
                            </span>
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                              <Star className="h-3 w-3" /> Saved
                            </span>
                          </div>
                          <div className="mt-3 text-sm text-gray-600">
                            <div className="mb-1"><strong>Saved On:</strong> {scheme.createdAt}</div>
                            <div><strong>Deadline:</strong> {scheme.scholarship.deadline}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                          <Link to={scheme.scholarship.website}>
                            <Button>Apply Now</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
