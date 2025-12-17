// app/explore/[id]/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { attractions } from "@/data/attractions";
import type { Attraction } from "@/data/attractions";
import { notFound } from "next/navigation";
import Image from "next/image";

type Props = {
  params: { id: string };
};

export default function AttractionDetail({ params }: Props) {
  const attraction = attractions.find((a) => a.id === Number(params.id));

  if (!attraction) {
    notFound();
  }

  const staticMapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${attraction.lat},${attraction.lng}&zoom=13&size=600x400&markers=${attraction.lat},${attraction.lng},lightblue1`;

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

      <p className="text-lg text-gray-700 mb-10 leading-relaxed">
        {attraction.description}
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Travel Time</h2>
          <p className="text-gray-600">{attraction.travelTime}</p>

          <h2 className="text-2xl font-semibold mt-8 mb-4">Accessibility</h2>
          <p className="text-gray-600">{attraction.accessibility}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Location</h2>
          <div className="rounded-xl overflow-hidden shadow-lg border border-gray-300">
            <img
              src={staticMapUrl}
              alt={`Map of ${attraction.name}`}
              className="w-full"
            />
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
