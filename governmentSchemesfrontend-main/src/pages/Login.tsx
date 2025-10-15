
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import Navbar from '@/components/Navbar';
import axios from "axios"
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { toast } = useToast();
  const navigate = useNavigate();
  const loginRequest = async (password:string,email:string)=>{
    try {
      const result = await axios.post("http://localhost:8080/api/users/login",{password:password,email:email})
      if(result.status == 200){
        const token = result.data.token
        const userId = result.data.user.id
        localStorage.setItem("authtoken",token)
        localStorage.setItem("userid",userId)
        toast({
          title: 'success',
          description:"Your account has been created"

        })
      }else{
        toast({
          title:"token error",
          description:"token not recevied"
        })

      }
      
    } catch (error) {

      console.log(error)
      toast({
        description:"error occured"
      })
      
    }

  }
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    loginRequest(password,email)
    setTimeout(() => {
      setIsLoading(false)
      navigate("/schemes")
      
    }, 1500);
    

    
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/50">
      <Navbar />
      
      <div className="container mx-auto pt-32 pb-20 px-6">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold font-display mb-2">Welcome Back</h1>
            <p className="text-gray-600">Log in to access your account and saved schemes</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="remember" 
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <label 
                    htmlFor="remember" 
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                </div>
                <a 
                  href="#" 
                  className="text-sm font-medium text-gov-blue hover:text-gov-blue/90"
                >
                  Forgot password?
                </a>
              </div>
              
              <Button 
                type="submit" 
                className={cn(
                  "w-full bg-gov-blue hover:bg-gov-blue/90",
                  isLoading && "opacity-70 cursor-not-allowed"
                )}
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
              
              <div className="text-center mt-6">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-medium text-gov-blue hover:text-gov-blue/90">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
