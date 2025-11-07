import { Navigation } from "./_components/navigation";

export default function HomePage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Navigacija na vrhu */}
      <Navigation />

      <div
        style={{
          textAlign: "center",
          marginTop: "5rem",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1
          style={{
            fontSize: "3rem",
            color: "oklch(97.1% 0.013 17.38)",
            marginBottom: "1rem",
          }}
        >
          Welcome to Croatia Travel App
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "oklch(70.5% 0.015 286.067)a",
            maxWidth: "600px",
            margin: "0 auto",
            marginTop: "1rem",
          }}
        >
          Discover the beauty of Croatia, plan your trips, explore hidden gems,
          and create your personalized itineraries.
        </p>
      </div>
    </div>
  );
}
