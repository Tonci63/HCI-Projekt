import Image from "next/image";
import Link from "next/link";
import { SearchBar } from "./search-bar";

export function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-0 md:px-6 py-0 md:py-20 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-10 items-center">
        
        {/* TEXT */}
        <div className="order-2 md:order-1 px-4 md:px-0 text-center md:text-left -mt-16 md:mt-0 relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Discover Croatia —
            <br />
            <span className="text-black-600">
              Plan Smarter, Travel Better
            </span>
          </h1>

          <p className="mt-4 md:mt-6 text-gray-600 max-w-xl mx-auto md:mx-0">
            Find attractions, estimate travel costs and time, and create your own journey.
          </p>

          <div className="mt-6 max-w-lg mx-auto md:mx-0">
            <SearchBar />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto md:mx-0">
            {/* PRVI GUMB: Plan My Trip */}
            <Link href="/plan-info">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition cursor-pointer">
                Plan My Trip
              </button>
            </Link>

            {/* DRUGI GUMB: Explore Croatia */}
            <Link href="/explore">
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 transition cursor-pointer">
                Explore Croatia
              </button>
            </Link>
          </div>
        </div>

        {/* IMAGE */}
        <div className="order-1 md:order-2 relative w-full h-72 md:h-[420px] md:rounded-2xl overflow-hidden shadow-none md:shadow-lg">
          <Image
            src="/dubrovnik.jpg"
            alt="Dubrovnik old town"
            fill
            className="object-cover"
            priority
          />

          {/* Mobile-only fade (bottom 20%) */}
          <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-white to-transparent md:hidden" />
        </div>
      </div>
    </section>
  );
}
