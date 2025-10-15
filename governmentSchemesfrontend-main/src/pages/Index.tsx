
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import { SchemeCategories } from '../components/SchemeCategories';
import Footer from '../components/Footer';
import Scholarships from "../type.ts"
import axios from 'axios';

const Index = () => {
  
    const [schemes,setSchemes] =  useState<Scholarships[]>([])

    const getSchemes = async ():Promise<Scholarships[]> =>{
      const data = await axios.get("http://localhost:8080/api/scholarships")
      return data.data
    }

  useEffect( () => {

    const execute = async () => {
      const data = await getSchemes();
      setSchemes(data.splice(0,6));
    };

    execute()
    const smoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const id = target.getAttribute('href');
        document.querySelector(id!)?.scrollIntoView({
          behavior: 'smooth'
        });
      }
    };

    document.addEventListener('click', smoothScroll);
    
    return () => document.removeEventListener('click', smoothScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <SchemeCategories schemes={schemes} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
