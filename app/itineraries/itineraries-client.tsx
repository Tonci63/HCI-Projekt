"use client";

import Link from "next/link";
import { saveRecommendedTrip } from "@/app/actions/itinerary";
import { useRouter } from "next/navigation";
import { deleteSavedTrip } from "@/app/actions/itinerary";
import { deleteSavedLocation } from "@/app/actions/itinerary";

interface Attraction {
  id: string;
  attractionId: string; 
  name: string;
  image: string;
  travelTime: string;
  isPriority: boolean | null;
  lat?: string | null;
  lng?: string | null;
}

interface SavedTrip {
  id: string;
  tripId: string;
  title: string;
  image: string;
}

interface SuggestedTrip {
  id: string;
  title: string;
  image: string;
}

export default function ItinerariesClient({
  attractions,
  trips,
  locked,
}: {
  attractions: Attraction[];
  trips: SavedTrip[];
  locked: boolean;
}) {
  const router = useRouter();

  const suggestedTrips: SuggestedTrip[] = [
    { id: "1", title: "Solo Explorer", image: "/solo.jpg" },
    { id: "2", title: "Family Trip", image: "/family2.avif" },
    { id: "3", title: "Senior Friendly", image: "/senior3.jpg" },
  ];

  const handleSaveTrip = async (trip: SuggestedTrip) => {
    await saveRecommendedTrip(trip);

    // Force server component re-fetch
    router.refresh();
  };

/* =========================
   CLUSTER BY CITY
========================= */

  const CITY_CENTERS = {
  Zagreb: { lat: 45.815, lng: 15.9819 },
  Split: { lat: 43.5081, lng: 16.4402 },
  Dubrovnik: { lat: 42.6507, lng: 18.0944 },
  Istria: { lat: 45.227, lng: 13.595 }, // Rovinj/Pula area
  };

  const distanceKm = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) => {
    const R = 6371;

    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;

    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };


  const clusterByCity = (items: Attraction[]) => {
    const groups: Record<string, Attraction[]> = {};

    for (const a of items) {
      if (a.lat == null || a.lng == null) {
        if (!groups["Other"]) groups["Other"] = [];
        groups["Other"].push(a);
        continue;
      }

      let closestCity = "Other";
      let minDistance = Infinity;

      for (const [city, center] of Object.entries(CITY_CENTERS)) {
        const d = distanceKm(Number(a.lat), Number(a.lng), center.lat, center.lng);

        if (d < minDistance) {
          minDistance = d;
          closestCity = city;
        }
      }

      // 50km rule ⭐
      const cityName = minDistance <= 70 ? closestCity : "Other";

      if (!groups[cityName]) groups[cityName] = [];
      groups[cityName].push(a);
    }

    return groups;
  };

  const cityClusters = Object.entries(clusterByCity(attractions));
  let globalDay = 1;

/* =========================
   DAY SPLIT (per city)
========================= */

  const splitCityIntoDays = (items: Attraction[]) => {
    const DAYS_SIZE = 2; // ⭐ max locations per day

    const days: Attraction[][] = [];

    for (let i = 0; i < items.length; i += DAYS_SIZE) {
      days.push(items.slice(i, i + DAYS_SIZE));
    }

    return days;
  };

/* =========================
   DISTANCE CALCULATION
========================= */

  const toNum = (v?: string | null) => (v ? Number(v) : null);

  const distance = (
    a: { lat: number; lng: number },
    b: { lat: number; lng: number }
  ) => {
    const R = 6371;

    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;

    const lat1 = (a.lat * Math.PI) / 180;
    const lat2 = (b.lat * Math.PI) / 180;

    const x =
      Math.sin(dLat / 2) ** 2 +
      Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

    return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  };

  const orderByDistance = (items: Attraction[]) => {
    if (items.length <= 2) return items;

    const remaining = [...items];
    const ordered: Attraction[] = [];

    ordered.push(remaining.shift()!);

    while (remaining.length) {
      const last = ordered[ordered.length - 1];

      const lastCoords = {
        lat: toNum(last.lat),
        lng: toNum(last.lng),
      };

      if (!lastCoords.lat || !lastCoords.lng) {
        ordered.push(remaining.shift()!);
        continue;
      }

      let nearestIndex = 0;
      let nearestDist = Infinity;

      remaining.forEach((item, i) => {
        const cLat = toNum(item.lat);
        const cLng = toNum(item.lng);
        if (!cLat || !cLng) return;

        const d = distance(
          { lat: lastCoords.lat!, lng: lastCoords.lng! },
          { lat: cLat, lng: cLng }
        );

        if (d < nearestDist) {
          nearestDist = d;
          nearestIndex = i;
        }
      });

      ordered.push(remaining.splice(nearestIndex, 1)[0]);
    }

    return ordered;
  };

  const handleDeleteTrip = async (id: string) => {
    await deleteSavedTrip(id);
    router.refresh();
  };

  const handleDeleteLocation = async (id: string) => {
    await deleteSavedLocation(id);
    router.refresh();
  };


  return (
  <>
    {/* Main Content */}
    <div
      className={`min-h-screen bg-white dark:bg-[#121212] transition ${
        locked ? "blur-sm pointer-events-none select-none" : ""
      }`}
    >
      <header className="py-12 text-center border-b">
        <h1 className="text-3xl font-black">ADVENTURE PLANNER</h1>
        <p className="opacity-70">
          Organize your spots and explore curated travel routes.
        </p>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Recommended Section */}
        <h2 className="text-xl font-bold mb-6">Recommended for you</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {suggestedTrips.map((trip) => (
            <div key={trip.id} className="border rounded-2xl p-4 shadow-sm">
              <img
                src={trip.image}
                className="h-40 w-full object-cover rounded-xl mb-4"
                alt={trip.title}
              />
              <h3 className="font-bold mb-4">{trip.title}</h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          
          <Link
            href={`/itineraries/${trip.id}`}
            style={{
              backgroundColor: "#2563eb",
              color: "white",
              padding: "12px",
              borderRadius: "14px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "0.9rem",
              textAlign: "center"
            }}
          >
            View Details
          </Link>

          {trips.some((t) => t.title === trip.title) ? (
            <div
              style={{
                border: "2px solid #16a34a",
                color: "#16a34a",
                padding: "10px",
                borderRadius: "14px",
                fontWeight: "bold",
                fontSize: "0.9rem",
                textAlign: "center"
              }}
            >
              ✓ Saved
            </div>
          ) : (
            <button
              onClick={() => handleSaveTrip(trip)}
              style={{
                border: "2px solid #16a34a",
                color: "#16a34a",
                padding: "10px",
                borderRadius: "14px",
                background: "transparent",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "0.9rem"
              }}
            >
              Save Trip
            </button>
          )}

        </div>


            </div>
          ))}
        </div>

        {/* Saved Locations */}
        <h2 className="text-xl font-bold mb-6">My Saved Locations - Suggested Schedule</h2>

        <div className="space-y-10">
          {cityClusters.map(([city, items]) => {
            const days = splitCityIntoDays(items);

            return (
              <div key={city}>
                <h3 className="font-bold text-lg mb-4">
                  📍 {city}
                </h3>

                {days.map((day) => {
                  const dayNumber = globalDay;
                  globalDay++;

                  return (
                    <div key={dayNumber} className="mb-6">
                      <h4 className="font-semibold mb-2">
                        Day {dayNumber}
                      </h4>

                      <div className="grid md:grid-cols-2 gap-4">
                        {day.map((attr) => (
                          <div key={attr.id} className="relative">
                            <Link
                              href={`/explore/${attr.attractionId}`}
                              className="border rounded-xl p-4 flex gap-4 items-center hover:shadow-lg transition"
                            >
                              <img
                                src={attr.image}
                                className="w-20 h-20 object-cover rounded-lg"
                                alt={attr.name}
                              />

                              <div>
                                <h4 className="font-bold">{attr.name}</h4>
                                <p className="text-sm opacity-60">
                                  {attr.travelTime}
                                </p>
                              </div>
                            </Link>

                            {/* DELETE BUTTON */}
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteLocation(attr.id);
                              }}
                              className="absolute top-2 right-2 bg-white dark:bg-[#1a1a1a] border rounded-full px-2 py-1 text-xs font-bold text-red-600 shadow hover:scale-110 transition"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>


        {/* Always visible button under list */}
        <div className="flex justify-center">
          <Link
            href="/explore"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition"
          >
            + Add New Location
          </Link>
        </div>
        
        {/* Saved Trips */}
        <h2 className="text-xl font-bold mt-16 mb-6">My Saved Trips</h2>

        {trips.length === 0 ? (
          <p>No trips saved yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {trips.map((trip) => (
              <div key={trip.id} className="relative">
                <Link
                  href={`/itineraries/${trip.tripId ?? trip.id}`}
                  className="block border rounded-xl p-4 hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <img
                    src={trip.image}
                    className="h-32 w-full object-cover rounded-lg mb-3"
                    alt={trip.title}
                  />
                  <h4 className="font-bold">{trip.title}</h4>
                </Link>

                {/* DELETE BUTTON */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteTrip(trip.id);
                  }}
                  className="absolute top-2 right-2 bg-white dark:bg-[#1a1a1a] border rounded-full px-2 py-1 text-xs font-bold text-red-600 shadow hover:scale-110 transition"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>

    {/* LOCKED MODAL */}
    {locked && (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
        <div className="bg-white dark:bg-[#1a1a1a] p-8 rounded-2xl shadow-xl text-center max-w-md w-[90%]">
          <h2 className="text-xl font-bold mb-4">Login Required</h2>
          <p className="mb-6 opacity-70">
            You must log in to access your itineraries.
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="/login"
              className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition"
            >
              Go to Login
            </a>

            <a
              href="/"
              className="border border-gray-300 py-3 rounded-xl font-bold hover:bg-gray-100 transition"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    )}
  </>
);
}