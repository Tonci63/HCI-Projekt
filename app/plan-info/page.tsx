"use client";

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] pb-20">
      {/* HEADER */}
      <section className="py-24 px-6 relative bg-white border-b border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>
        <div className="max-w-5xl mx-auto">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-4 block">
            Resources & Guide
          </span>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter leading-none">
            Traveler <span className="text-blue-600">Essentials.</span>
          </h1>
          <p className="text-gray-500 mt-6 text-lg max-w-xl leading-relaxed">
            All the key information for your journey through Croatia in one place.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16 space-y-24">
        
        {/* 1. TRAVEL TIPS */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Travel Tips</h2>
            <div className="h-0.5 flex-1 bg-gray-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Currency", desc: "Croatia uses the Euro (€). While cards are standard, always keep some cash for local markets and small island shops." },
              { title: "Transport", desc: "Ferries for islands and FlixBus for cities are your best options. Book tickets in advance to save money." },
              { title: "Language", desc: "English is widely spoken, but 'Dobar dan' (Good day) and 'Hvala' (Thank you) are always appreciated." }
            ].map((tip, i) => (
              <div key={i} className="p-8 bg-white rounded-4xl border border-gray-100 shadow-sm hover:border-blue-200 transition-all">
                <h3 className="font-black text-blue-600 uppercase text-xs mb-3">{tip.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 2. BUDGET OVERVIEW */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Budget Overview</h2>
            <div className="h-0.5 flex-1 bg-gray-100"></div>
          </div>
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-center md:text-left">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Daily Average</span>
              <p className="text-5xl font-black text-gray-900 mt-2">€80 - €130</p>
              <p className="text-gray-400 text-sm mt-3 font-medium italic">Includes food, local transport, and entrance fees.</p>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {[
                { label: "Espresso on the Riva", price: "€2.50 - €4.00" },
                { label: "Ferry Ticket", price: "€5.00 - €15.00" },
                { label: "Dinner in a Konoba", price: "€20.00 - €40.00" }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <span className="text-gray-600 font-medium text-sm">{item.label}</span>
                  <span className="text-gray-900 font-black text-sm">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. WEATHER & SEASONS */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Weather & Seasons</h2>
            <div className="h-0.5 flex-1 bg-gray-100"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-6 p-8 bg-white rounded-4xl border border-gray-50 shadow-sm">
              <div className="text-4xl">☀️</div>
              <div>
                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">Summer (Jun - Sep)</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">Hot and sunny (25°C - 35°C). Perfect for swimming, but expect larger crowds.</p>
              </div>
            </div>
            <div className="flex gap-6 p-8 bg-white rounded-4xl border border-gray-50 shadow-sm">
              <div className="text-4xl">🍂</div>
              <div>
                <h3 className="font-bold text-gray-900 uppercase text-sm tracking-wide">Shoulder (May, Oct)</h3>
                <p className="text-gray-500 text-sm mt-2 leading-relaxed">Mild weather (18°C - 24°C). Ideal for exploring cities and nature without the heat.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. EVENTS WITH IMAGES */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight italic">Upcoming Events</h2>
            <div className="h-0.5 flex-1 bg-gray-100"></div>
          </div>
          <div className="space-y-6">
            {[
              { name: "Dubrovnik Summer Festival", date: "July 10 - Aug 25", loc: "Old Town Dubrovnik", img: "🎭" },
              { name: "Ultra Europe Split", date: "July 11 - July 13", loc: "Park Mladeži", img: "🔊" },
              { name: "Advent in Zagreb", date: "December - January", loc: "Zagreb Center", img: "🎄" }
            ].map((event, i) => (
              <div key={i} className="group flex flex-col md:flex-row bg-white rounded-4xl overflow-hidden border border-gray-100 hover:border-blue-300 transition-all shadow-sm">
                {/* Image Placeholder - Replace with <img /> tag later */}
                <div className="w-full md:w-48 h-32 bg-gray-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-500">
                  {event.img}
                </div>
                <div className="p-8 flex-1 flex flex-col justify-center">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-black text-gray-900 uppercase text-lg tracking-tighter">{event.name}</h4>
                      <p className="text-xs text-blue-600 font-bold uppercase tracking-widest mt-1">{event.loc}</p>
                    </div>
                    <div className="text-right">
                      <span className="bg-gray-900 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-tighter">
                        {event.date}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}