"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTheme } from "@/app/_components/ThemeWrapper"; 

export default function ItineraryDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [trip, setTrip] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { theme } = useTheme(); // Uzimamo globalnu temu
  const isDark = theme === "dark"; // Provjeravamo je li mrak

  useEffect(() => {
    if (!id) return;
    fetch(`https://6942e05d69b12460f313226c.mockapi.io/trips/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTrip(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const getExtraInfo = (tripId: string) => {
    const infos: any = {
      "1": { tips: ["Best visited May - Sept", "Great for meeting locals"], stats: { duration: "5 Days", type: "Adventure" } },
      "2": { tips: ["Safe for all ages", "Family discounts"], stats: { duration: "5 Days", type: "Family" } },
      "3": { tips: ["Low walking intensity", "Cultural landmarks"], stats: { duration: "5 Days", type: "Cultural" } },
    };
    return infos[tripId] || { tips: ["Enjoy your trip!"], stats: { duration: "Flexible", type: "General" } };
  };

  if (loading) return (
    <div className={`min-h-screen flex items-center justify-center italic transition-colors ${isDark ? 'bg-[#0a0a0a] text-gray-400' : 'bg-white text-gray-500'}`}>
      Preparing your map...
    </div>
  );

  if (!trip) return (
    <div className={`min-h-screen flex items-center justify-center font-bold ${isDark ? 'bg-[#0a0a0a] text-red-500' : 'bg-white text-red-500'}`}>
      Trip not found
    </div>
  );

  const extra = getExtraInfo(id);

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${isDark ? 'bg-[#0a0a0a] text-white' : 'bg-white text-black'}`}>
      
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img src={trip.image} alt={trip.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent flex items-end">
          <div className="max-w-6xl mx-auto w-full px-6 pb-12">
            <button 
              onClick={() => router.back()} 
              className={`mb-6 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border backdrop-blur-xl shadow-lg
                ${isDark 
                  ? "bg-black/40 text-white border-white/30 hover:bg-black/60 hover:border-white/50" 
                  : "bg-white/20 text-white border-white/40 hover:bg-white/40 hover:border-white/60"
                }`}
            >
              <span className="text-lg">←</span> Back
            </button>
            <h1 className="text-5xl md:text-7xl font-black text-white uppercase leading-none">{trip.title}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <h2 className="text-2xl font-bold uppercase">About</h2>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} italic text-lg`}>"{trip.description}"</p>
          
          <div className={`p-6 rounded-3xl border transition-colors ${isDark ? 'bg-[#111] border-gray-800' : 'bg-gray-50 border-gray-100'}`}>
            <h4 className="font-bold mb-4 uppercase text-sm text-blue-600">Travel Tips</h4>
            <ul className={`space-y-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {extra.tips.map((tip: string, i: number) => (
                <li key={i}>✦ {tip}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Schedule */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-10 uppercase flex items-center gap-3">
            Schedule
            <span className={`h-px flex-1 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}></span>
          </h2>
          
          <div className="space-y-12">
            {trip.plans?.map((plan: any, idx: number) => (
              <div key={idx} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-blue-600 flex items-center justify-center font-black text-blue-600">
                    {idx + 1}
                  </div>
                  <div className={`w-0.5 h-full mt-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}></div>
                </div>

                <div className="flex-1 pb-10">
                  <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>{plan.day}</h3>
                  
                  {/* DODAN INFO DIO OVDJE */}
                  {plan.info && (
                    <p className={`mb-4 text-sm italic opacity-80 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
                      {plan.info}
                    </p>
                  )}

                  <div className="grid gap-3">
                    {plan.activities?.map((act: string, i: number) => (
                      <div key={i} className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${isDark ? 'bg-[#111] border-gray-800 text-gray-300' : 'bg-white border-gray-100 text-gray-700'}`}>
                        <span className="text-blue-600">★</span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}