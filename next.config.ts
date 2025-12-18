import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      
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
      { protocol: 'https', hostname: 'upload.wikimedia.org' },  
      { protocol: 'https', hostname: 'images.squarespace-cdn.com' },  
      { protocol: 'https', hostname: 'onegirlwholeworld.com' },  
      { protocol: 'https', hostname: 'www.wildplanetblog.com' },  
      { protocol: 'https', hostname: 'www.visitzagreb.hr' },  
      { protocol: 'https', hostname: 'www.mljettravel.com' },  
      { protocol: 'https', hostname: 'cdn.sanity.io' },  
      { protocol: 'https', hostname: 'robert-parker-michelin-hk-prod.s3.amazonaws.com' },  
      { protocol: 'https', hostname: 'gohvarblog.com' },  
      { protocol: 'https', hostname: 'jaywaytravel.com' },  
      { protocol: 'https', hostname: 'static.independent.co.uk' },  
      { protocol: 'https', hostname: 'image.shutterstock.com' },  
      { protocol: 'https', hostname: 'c8.alamy.com' },  
       {protocol: "https", hostname: "cdn.pixabay.com"},
       {protocol: "https", hostname: "bluecave-bisevo.com"},
    ],
  },
};

export default nextConfig;