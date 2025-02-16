import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bus, Train } from 'lucide-react';
export function SplashScreen() {
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/history');
    }, 10000);
    return () => clearTimeout(timer);
  }, [navigate]);
  return <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B4EA2] text-white p-4">
      <h1 className="text-5xl font-bold mb-4">CATS</h1>
      <p className="text-2xl mb-8">Buses, trains and streetcar</p>
      <div className="flex gap-8">
        <Bus size={48} />
        <Train size={48} />
        <Train size={48} />
      </div>
    </div>;
}