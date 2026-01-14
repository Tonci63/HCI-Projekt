import { Navigation } from "../_components/navigation";

export default function PlanInfoPage() {
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
          Practical travel information
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            color: "black",
            maxWidth: "600px",
            margin: "0 auto",
            marginTop: "1rem",
          }}
          className="text-gray-300"
        >
          Find useful travel tips, budget and ticket info, seasonal weather
          recommendations, and upcoming events to make your trip in Croatia
          easier and more enjoyable.
        </p>
      </div>
    </div>
  );
}
