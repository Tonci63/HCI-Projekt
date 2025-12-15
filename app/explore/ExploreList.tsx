"use client";

import Link from "next/link";

const attractions = [
  {
    id: 1,
    title: "Plitvička Lakes National Park",
    description:
      "Plitvička Lakes is Croatia’s oldest and largest national park, famous for its cascading lakes and waterfalls surrounded by lush forests.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/5/5f/Plitvice_Lakes.jpg",
  },
  {
    id: 2,
    title: "Diocletian’s Palace, Split",
    description:
      "A UNESCO World Heritage Site, Diocletian’s Palace is the heart of Split and one of the best-preserved Roman monuments in the world.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/Diocletian_Palace_Split.jpg",
  },
  {
    id: 3,
    title: "Dubrovnik Old Town",
    description:
      "Dubrovnik’s Old Town is a stunning medieval city surrounded by massive stone walls overlooking the Adriatic Sea.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/97/Dubrovnik_old_city_1.jpg",
  },
  {
    id: 4,
    title: "Hvar Island",
    description:
      "Hvar is known for its beautiful beaches, historic old town, lavender fields and vibrant nightlife.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/3/37/Hvar_Stari_Grad.jpg",
  },
  {
    id: 5,
    title: "Rovinj",
    description:
      "Rovinj is a picturesque coastal town in Istria, famous for its narrow streets, colorful houses and romantic atmosphere.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/73/Rovinj_old_town.jpg",
  },
];

export default function ExploreList() {
  return (
    <div style={{ maxWidth: "900px", margin: "3rem auto" }}>
      {attractions.map((a) => (
        <div
          key={a.id}
          style={{
            border: "1px solid #ddd",
            borderRadius: "12px",
            marginBottom: "2rem",
            overflow: "hidden",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <img
            src={a.image}
            alt={a.title}
            style={{ width: "100%", height: "300px", objectFit: "cover" }}
          />

          <div style={{ padding: "1.2rem" }}>
            <h2>{a.title}</h2>
            <p style={{ color: "#555" }}>{a.description}</p>

            <Link
              href={`/explore/${a.id}`}
              style={{
                display: "inline-block",
                marginTop: "1rem",
                color: "#fff",
                backgroundColor: "#1E90FF",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                textDecoration: "none",
              }}
            >
              View details →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
