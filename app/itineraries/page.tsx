import { Navigation } from "../_components/navigation";

export default function ItinerariesPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <div>
        <h1
          style={{
            color: "black",
            textAlign: "center",
            marginTop: "5rem",
            fontSize: "3rem",
          }}
        >
          Plan your trip
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "black",
            maxWidth: "600px",
            margin: "0 auto",
            marginTop: "1rem",
          }}
          className="text-white"
        >
          Browse suggested trips tailored for different personas: Solo
          explorers, Families, and Seniors. Add attractions to your personal
          itinerary and plan your perfect Croatian adventure.
        </p>
      </div>
    </div>
  );
}
