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
          Profile & Settings
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
          View and update your personal information, manage saved trips,
          favorite reviews, and adjust accessibility settings like font size or
          theme preference.
        </p>
      </div>
    </div>
  );
}
