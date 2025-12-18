import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Prethodni hostovi (iz ranijih poruka)
      { protocol: 'https', hostname: 'www.celebritycruises.com' },
      { protocol: 'https', hostname: 'images.celebritycruises.com' },
      { protocol: 'https', hostname: 'dynamic-media-cdn.tripadvisor.com' },
      { protocol: 'https', hostname: 'assets.dm.rccl.com' },
      { protocol: 'https', hostname: 'shippedaway.com' },
      { protocol: 'https', hostname: 'adriaticservicetravel.com' },
      { protocol: 'https', hostname: 'www.gulet-croatia.com' },
      { protocol: 'https', hostname: 'cruisecroatia.com' },
      { protocol: 'https', hostname: 'www.heatheronhertravels.com' },
      { protocol: 'https', hostname: 'www.istra.hr' },
      { protocol: 'https', hostname: 'img.liveaboard.com' },
      { protocol: 'https', hostname: 'cruisepassenger.com.au' },
      { protocol: 'https', hostname: 'images.dreamlines.de' },
      { protocol: 'https', hostname: 'media-cdn.tripadvisor.com' },
      { protocol: 'https', hostname: 'i0.wp.com' },
      { protocol: 'https', hostname: 'www.ferrycroatia.com' },
      { protocol: 'https', hostname: 'iznajmljivaci.laganini.com' },

      // Novi hostovi za ove slike
      { protocol: 'https', hostname: 'upload.wikimedia.org' },  // Wikimedia (Zagreb)
      { protocol: 'https', hostname: 'images.squarespace-cdn.com' },  // Plitvice
      { protocol: 'https', hostname: 'onegirlwholeworld.com' },  // Plitvice
      { protocol: 'https', hostname: 'www.wildplanetblog.com' },  // Plitvice
      { protocol: 'https', hostname: 'www.visitzagreb.hr' },  // Zagreb
      { protocol: 'https', hostname: 'www.mljettravel.com' },  // Mljet
      { protocol: 'https', hostname: 'cdn.sanity.io' },  // Mljet (MedSailors)
      { protocol: 'https', hostname: 'robert-parker-michelin-hk-prod.s3.amazonaws.com' },  // Pag
      { protocol: 'https', hostname: 'gohvarblog.com' },  // Pag
      { protocol: 'https', hostname: 'jaywaytravel.com' },  // Pag
      { protocol: 'https', hostname: 'static.independent.co.uk' },  // Varaždin
      { protocol: 'https', hostname: 'image.shutterstock.com' },  // Varaždin (ili www.shutterstock.com)
      { protocol: 'https', hostname: 'c8.alamy.com' },  // Varaždin
       {protocol: "https", hostname: "cdn.pixabay.com"},
    ],
  },
};

export default nextConfig;