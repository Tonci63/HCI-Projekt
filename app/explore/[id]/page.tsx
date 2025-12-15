import { Navigation } from "../../_components/navigation";

const attractions = [
  {
    id: 1,
    title: "Plitvička Lakes National Park",
    description:
      "Plitvička Lakes National Park is a UNESCO World Heritage Site featuring 16 terraced lakes connected by waterfalls. Wooden walkways allow visitors to explore the park closely.",
    travelTime: "2–4 hours",
    accessibility: "Partially accessible; some paths are steep",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Plitvice_Lakes.jpg",
    map: "https://maps.google.com/maps?q=Plitvička%20jezera&t=&z=13&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 2,
    title: "Diocletian’s Palace, Split",
    description:
      "Built in the 4th century for Roman Emperor Diocletian, this palace forms the historic center of Split and is still actively lived in today.",
    travelTime: "1–2 hours",
    accessibility: "Mostly accessible; uneven stone surfaces",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/Diocletian_Palace_Split.jpg",
    map: "https://maps.google.com/maps?q=Dioklecijanova%20palača&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 3,
    title: "Dubrovnik Old Town",
    description:
      "Dubrovnik Old Town is a perfectly preserved medieval city, famous for its city walls, historic buildings and breathtaking sea views.",
    travelTime: "2–3 hours",
    accessibility: "Limited accessibility due to stairs",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/97/Dubrovnik_old_city_1.jpg",
    map: "https://maps.google.com/maps?q=Dubrovnik&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 4,
    title: "Hvar Island",
    description:
      "Hvar offers a mix of historic charm, crystal-clear beaches and vibrant nightlife, making it one of Croatia’s most popular islands.",
    travelTime: "Half day – full day",
    accessibility: "Good accessibility in town areas",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/37/Hvar_Stari_Grad.jpg",
    map: "https://maps.google.com/maps?q=Hvar&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: 5,
    title: "Rovinj",
    description:
      "Rovinj is a charming coastal town with Venetian-style architecture, a lively harbor and excellent local cuisine.",
    travelTime: "1–2 hours",
    accessibility: "Narrow streets may be challenging",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Rovinj_old_town.jpg",
    map: "https://maps.google.com/maps?q=Rovinj&t=&z=15&ie=UTF8&iwloc=&output=embed",
  },
];

export default function AttractionPage({ params }: { params: { id: string } }) {
  const attraction = attractions.find((a) => a.id === parseInt(params.id));

  if (!attraction) {
    return <div>Attraction not found</div>;
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "3rem auto",
      }}
    >
      <Navigation />

      <h1>{attraction.title}</h1>
      <p>
        <strong>Estimated visit time:</strong> {attraction.travelTime}
      </p>
      <p>
        <strong>Accessibility:</strong> {attraction.accessibility}
      </p>

      <img
        src={attraction.image}
        alt={attraction.title}
        style={{ width: "100%", borderRadius: "12px", margin: "1rem 0" }}
      />

      <p>{attraction.description}</p>

      <iframe
        src={attraction.map}
        width="100%"
        height="400"
        style={{ border: 0, borderRadius: "12px", marginTop: "2rem" }}
        loading="lazy"
      ></iframe>
    </div>
  );
}
