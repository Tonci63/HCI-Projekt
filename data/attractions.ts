// data/attractions.ts

export type Attraction = {
  id: number;
  name: string;
  category:
    | 'Cultural & Historical'
    | 'Nature & Beaches'
    | 'Local Cuisine'
    | 'Hidden Gems'
    | 'Family-Friendly';
  shortDesc: string;
  description: string;
  image: string; // Sada prave slike
  travelTime: string;
  accessibility: string;
  lat: number;
  lng: number;
};

export const attractions: Attraction[] = [
  {
    id: 1,
    name: 'Dubrovnik Old Town',
    category: 'Cultural & Historical',
    shortDesc: 'UNESCO-listed medieval walled city with stunning architecture.',
    description: 'Explore the famous city walls, Stradun street, and Game of Thrones filming locations. A pearl of the Adriatic.',
    image: 'https://d1bv4heaa2n05k.cloudfront.net/user-images/1465464081858/6shutterstock-335796056_main_1465464087492.jpeg', // Dubrovnik aerial
    travelTime: '4-5 hours drive from Zagreb; 3 hours from Split',
    accessibility: 'Partially accessible (cobblestones and stairs; wheelchairs can enter main areas)',
    lat: 42.6507,
    lng: 18.0944,
  },
  {
    id: 2,
    name: "Diocletian's Palace (Split)",
    category: 'Cultural & Historical',
    shortDesc: 'Ancient Roman palace turned vibrant city center.',
    description: 'Built in the 4th century, now a living UNESCO site with shops, cafes, and history.',
    image: 'https://wmf.imgix.net/images/2e_HRV_Diocletian_JPEG_Hero_HRV_Diocletian.jpg?auto=format,compress&fit=max&w=4040', // Diocletian Palace
    travelTime: '3.5 hours drive from Zagreb',
    accessibility: 'Good accessibility in main areas; some underground sections limited',
    lat: 43.5081,
    lng: 16.4388,
  },
  {
    id: 3,
    name: 'Plitvice Lakes National Park',
    category: 'Nature & Beaches',
    shortDesc: 'Stunning waterfalls and turquoise lakes in a UNESCO park.',
    description: 'Wooden walkways over cascading lakes – perfect for hiking and nature.',
    image: 'https://images.squarespace-cdn.com/content/v1/665604881782aa23525c3d06/1717530041577-A9IPWAYPN5DZQPQGDML6/Tourist-at-Pltivice-Lakes-National-Park-Croatia.jpg', // Plitvice tourist
    travelTime: '2 hours drive from Zagreb',
    accessibility: 'Boardwalks are wheelchair-friendly in lower lakes; upper areas have steps',
    lat: 44.865,
    lng: 15.582,
  },
  {
    id: 4,
    name: 'Zlatni Rat Beach (Bol, Brač)',
    category: 'Nature & Beaches',
    shortDesc: 'Iconic golden horn pebble beach that changes shape.',
    description: 'Crystal-clear waters, great for swimming and windsurfing.',
    image: 'https://www.bolcroatia.com/wp-content/uploads/2021/06/Zlatni-rat-Roni.ws-01-DJI_0170.jpg.webp', // Zlatni Rat drone
    travelTime: 'Ferry from Split (1 hour) + short drive',
    accessibility: 'Pebble beach; pine shade nearby, but path has steps',
    lat: 43.256,
    lng: 16.633,
  },
  {
    id: 5,
    name: 'Ston Oysters Experience',
    category: 'Local Cuisine',
    shortDesc: 'Fresh oysters straight from Mali Ston Bay.',
    description: 'Boat tour and tasting of world-famous oysters with local wine.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/4d/db/d1/a-lovely-platter-of-oysters.jpg?w=1200&h=-1&s=1', // Ston oysters platter
    travelTime: '1 hour drive from Dubrovnik',
    accessibility: 'Boat tours accessible; tasting areas flat',
    lat: 42.838,
    lng: 17.698,
  },
  {
    id: 6,
    name: 'Pag Island Cheese & Lamb',
    category: 'Local Cuisine',
    shortDesc: 'Taste award-winning Paški sir cheese and roasted lamb.',
    description: 'Unique salty flavor from sheep grazing on coastal herbs.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Pa%C5%A1ki_sir.JPG/1200px-Pa%C5%A1ki_sir.JPG', // Paški sir
    travelTime: 'Ferry from Zadar area',
    accessibility: 'Farms and restaurants generally accessible',
    lat: 44.445,
    lng: 15.055,
  },
  {
    id: 7,
    name: 'Blue Cave (Biševo near Vis)',
    category: 'Hidden Gems',
    shortDesc: 'Magical glowing blue cave accessible only by boat.',
    description: 'Ethereal light show inside this sea cave.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/b3/89/0a/blue-cave-croatia.jpg?w=900&h=500&s=1', // Blue Cave
    travelTime: 'Boat from Split or Hvar',
    accessibility: 'Small boat entry; not wheelchair-friendly',
    lat: 43.023,
    lng: 16.013,
  },
  {
    id: 8,
    name: 'Lastovo Island',
    category: 'Hidden Gems',
    shortDesc: 'Remote star-gazing paradise with pristine nature.',
    description: "One of Europe's least light-polluted spots.",
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Skrivena_luka%2C_Lastovo.jpg', // Lastovo bay
    travelTime: 'Ferry from Split or Dubrovnik',
    accessibility: 'Good paths; quiet roads',
    lat: 42.766,
    lng: 16.883,
  },
  {
    id: 9,
    name: 'Krka National Park',
    category: 'Family-Friendly',
    shortDesc: 'Waterfalls where you can swim near Skradinski Buk.',
    description: 'Boat rides, trails, and swimming areas for kids.',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/12/87/ba/krka-national-park.jpg?w=900&h=500&s=1', // Krka waterfalls
    travelTime: '1 hour from Split or Zadar',
    accessibility: 'Main areas very family/wheelchair friendly',
    lat: 43.802,
    lng: 15.962,
  },
  {
    id: 10,
    name: 'Hvar Island Family Beaches',
    category: 'Family-Friendly',
    shortDesc: 'Calm bays and playgrounds on lavender-scented island.',
    description: 'Shallow waters and family resorts.',
    image: 'https://www.familycantravel.com/wp-content/uploads/2018/07/Hvar-for-families-1-1024x683.jpg', // Hvar family beach
    travelTime: 'Ferry from Split',
    accessibility: 'Many beaches flat and easy access',
    lat: 43.165,
    lng: 16.7,
  },
];