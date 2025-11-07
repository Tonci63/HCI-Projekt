import { Navigation } from "../_components/navigation";

export default function ItinerariesPage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Navigacija na vrhu */}
      <Navigation />
      <div>
        <h1
          style={{
            color: "oklch(97.1% 0.013 17.38)",
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
            color: "oklch(70.5% 0.015 286.067)",
            maxWidth: "600px",
            margin: "0 auto",
            marginTop: "1rem",
          }}
        >
          Browse suggested trips tailored for different personas: Solo
          explorers, Families, and Seniors. Add attractions to your personal
          itinerary and plan your perfect Croatian adventure.
        </p>
      </div>
    </div>
  );
}
