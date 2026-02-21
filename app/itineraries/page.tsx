import { getUserItineraryData } from "@/app/actions/itinerary";
import ItinerariesClient from "./itineraries-client";

export default async function ItinerariesPage() {
  const data = await getUserItineraryData();

  if (!data) {
    return <ItinerariesClient attractions={[]} trips={[]} locked />;
  }

  return (
    <ItinerariesClient
      attractions={data.attractions}
      trips={data.trips}
      locked={false}
    />
  );
}