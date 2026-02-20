import { NextResponse } from "next/server";
import { db } from "@/db";
import { itineraryAttractions } from "@/db/schema";
import { getOptionalUser, getOrCreateUserItinerary } from "@/app/actions/itinerary";
import { and, eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const attractionId = searchParams.get("id");

  const user = await getOptionalUser();
  if (!user || !attractionId) {
    return NextResponse.json({ saved: false });
  }

  // 🔥 Get user's itinerary
  const itinerary = await getOrCreateUserItinerary();

  const existing = await db
    .select()
    .from(itineraryAttractions)
    .where(
      and(
        eq(itineraryAttractions.itineraryId, itinerary.id),
        eq(itineraryAttractions.attractionId, attractionId)
      )
    );

  return NextResponse.json({ saved: existing.length > 0 });
}
