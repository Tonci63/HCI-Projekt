import { Navigation } from "../_components/navigation";
import ExploreList from "./ExploreList";

export default function ExplorePage() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <Navigation />

      <div style={{ textAlign: "center", marginTop: "3rem" }}>
        <h1 style={{ fontSize: "2.5rem" }}>Discover Attractions</h1>
        <p style={{ color: "#555", maxWidth: "600px", margin: "1rem auto" }}>
          Discover the most beautiful cultural, historical and natural
          attractions Croatia has to offer – all in one place.
        </p>
      </div>

      <ExploreList />
    </div>
  );
}
