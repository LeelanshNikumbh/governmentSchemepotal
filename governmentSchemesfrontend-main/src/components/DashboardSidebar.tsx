
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  User, 
  Home, 
  Search, 
  BookMarked,
  Bell, 
  Settings, 
  LogOut
} from 'lucide-react';

const DashboardSidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <Home className="h-5 w-5" />,
      href: '/dashboard',
    },
    {
      name: 'Browse Schemes',
      icon: <Search className="h-5 w-5" />,
      href: '/schemes',
    },
    
    
  ];
  
  return (
    <div className="w-full lg:w-64 lg:min-h-[calc(100vh-80px)] bg-white rounded-lg border border-gray-100 overflow-hidden shadow-sm">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="relative w-10 h-10 rounded-full bg-gov-lightBlue text-white flex items-center justify-center font-bold text-lg mr-3">
            A
          </div>
          <div>
            <h3 className="font-medium">Anuj Kumar</h3>
            <p className="text-xs text-gray-500">anuj@example.com</p>
          </div>
        </div>
        
        <nav>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors",
                    location.pathname === item.href && "bg-blue-50 text-gov-blue font-medium"
                  )}
                >
                  {item.icon}
                  {item.name}
                </Link>
              </li>
            ))}
            
            <li className="pt-4 mt-4 border-t border-gray-100">
              <button
                className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
