import { Navigation } from "../_components/navigation";

export default function PlanInfoPage() {
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
          Practical travel information
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
          Find useful travel tips, budget and ticket info, seasonal weather
          recommendations, and upcoming events to make your trip in Croatia
          easier and more enjoyable.
        </p>
      </div>
    </div>
  );
}
