import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Attraction images
      { protocol: "https", hostname: "www.celebritycruises.com" },
      { protocol: "https", hostname: "wmf.imgix.net" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "www.bolcroatia.com" },
      { protocol: "https", hostname: "www.total-croatia-news.com" },
      { protocol: "https", hostname: "www.croatiaweek.com" },
      { protocol: "https", hostname: "www.absolute-croatia.com" },
      { protocol: "https", hostname: "www.croatia-expert.com" },
      { protocol: "https", hostname: "www.np-krka.hr" },
      { protocol: "https", hostname: "rentaboathvar.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },  // Paški sir + Lastovo
      { protocol: "https", hostname: "dynamic-media-cdn.tripadvisor.com" },  // Ston oysters, Blue Cave, Krka
      { protocol: "https", hostname: "d1bv4heaa2n05k.cloudfront.net" },  // Dubrovnik
      { protocol: "https", hostname: "www.familycantravel.com" },  // Hvar beach

      // Static map
      { protocol: "https", hostname: "staticmap.openstreetmap.de" },
    ],
  },
};

export default nextConfig;
