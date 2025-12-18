// app/explore/[id]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Image from "next/image";

const API_URL = "https://6942e05d69b12460f313226c.mockapi.io/attractions"; // Tvoj URL

type Attraction = {
  id: number;
  name: string;
  category: string;
  shortDesc: string;
  description: string;
  image: string;
  travelTime: string;
  accessibility: string;
  lat: number;
  lng: number;
};

async function fetchAttraction(id: string): Promise<Attraction> {
  const res = await fetch(`${API_URL}/${id}`, { cache: "no-store" });
  if (!res.ok) notFound();
  return res.json();
}

export default async function AttractionDetail(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const attraction = await fetchAttraction(params.id);

  return (
    <main className="container mx-auto px-6 py-12 max-w-5xl">
      <Link
        href="/explore"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 text-lg font-medium"
      >
        <ArrowLeft className="mr-2 h-5 w-5" /> Back to Explore
      </Link>

      <h1 className="text-4xl font-bold mb-6">{attraction.name}</h1>

      <Image
        src={attraction.image}
        alt={attraction.name}
        width={1200}
        height={600}
        className="w-full h-96 object-cover rounded-xl mb-8 shadow-lg"
      />

      <p className="text-lg text-gray-300 mb-10 leading-relaxed">
        {attraction.description}
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Travel Time</h2>
          <p className="text-gray-300">{attraction.travelTime}</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Accessibility</h2>
          <p className="text-gray-300">{attraction.accessibility}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300 h-96">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${
                attraction.lng - 0.02
              }%2C${attraction.lat - 0.02}%2C${attraction.lng + 0.02}%2C${
                attraction.lat + 0.02
              }&layer=mapnik&marker=${attraction.lat}%2C${attraction.lng}`}
              style={{ border: 0 }}
              allowFullScreen
            ></iframe>
            <br />
            <small className="text-gray-300 block text-center mt-2">
              <a
                href={`https://www.openstreetmap.org/#map=15/${attraction.lat}/${attraction.lng}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Larger Map
              </a>
            </small>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center">
        <button className="bg-green-600 text-white px-10 py-4 rounded-lg text-xl font-medium hover:bg-green-700 transition">
          Add to Itinerary
        </button>
      </div>
    </main>
  );
}
