import { Navigation } from "../_components/navigation";

export default function BlogPage() {
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
          Blog & Reviews
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
          Explore featured articles, read user reviews, and check ratings for
          attractions. Learn about hidden gems, cultural insights, and travel
          tips from fellow travelers.
        </p>
      </div>
    </div>
  );
}
