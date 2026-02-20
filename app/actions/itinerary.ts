"use server";

import { db } from "@/db";
import {
  itineraries,
  itineraryAttractions,
  savedTrips,
} from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";


/* =========================
   GET SESSION
========================= */

/* =========================
   SAFE SESSION (can be null)
========================= */
export async function getOptionalUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.user ?? null;
}

/* =========================
   REQUIRED SESSION
========================= */
export async function getRequiredUser() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
}


/* =========================
   GET OR CREATE DEFAULT ITINERARY
========================= */

export async function getOrCreateUserItinerary() {
  const user = await getRequiredUser();

  const existing = await db
    .select()
    .from(itineraries)
    .where(eq(itineraries.userId, user.id));

  if (existing.length > 0) {
    return existing[0];
  }

  const id = crypto.randomUUID();

  await db.insert(itineraries).values({
    id,
    title: "My Trip",
    userId: user.id,
  });

  return { id, title: "My Trip", userId: user.id };
}

/* =========================
   ADD ATTRACTION
========================= */

export async function addAttractionToUserItinerary(attraction: {
  id: string;
  name: string;
  image: string;
  travelTime: string;
  lat: number;
  lng: number;
}) {
  const itinerary = await getOrCreateUserItinerary();

  const existing = await db.query.itineraryAttractions.findFirst({
    where: (t, { and, eq }) =>
      and(
        eq(t.itineraryId, itinerary.id),
        eq(t.attractionId, attraction.id)
      ),
  });

  if (existing) return;

  await db.insert(itineraryAttractions).values({
    id: crypto.randomUUID(),
    itineraryId: itinerary.id,
    attractionId: attraction.id,
    name: attraction.name,
    image: attraction.image,
    travelTime: attraction.travelTime,
    lat: String(attraction.lat),
    lng: String(attraction.lng),
  });
}



/* =========================
   SAVE RECOMMENDED TRIP
========================= */

export async function saveRecommendedTrip(trip: {
  id: string;
  title: string;
  image: string;
}) {
  const user = await getRequiredUser();

  const existing = await db
    .select()
    .from(savedTrips)
    .where(
      and(
        eq(savedTrips.userId, user.id),
        eq(savedTrips.tripId, trip.id)
      )
    )
    .limit(1);

  if (existing.length > 0) {
    return;
  }

  await db.insert(savedTrips).values({
    id: crypto.randomUUID(),
    tripId: trip.id, // now exists in schema
    title: trip.title,
    image: trip.image,
    userId: user.id,
  });
}




/* =========================
   GET FULL USER DATA
========================= */

export async function getUserItineraryData() {
  const user = await getOptionalUser();

  if (!user) {
    return null;
  }

  const itinerary = await getOrCreateUserItinerary();

  const attractions = await db
    .select()
    .from(itineraryAttractions)
    .where(eq(itineraryAttractions.itineraryId, itinerary.id));

  const trips = await db
    .select()
    .from(savedTrips)
    .where(eq(savedTrips.userId, user.id));

  return {
    attractions,
    trips,
  };
}

/* =========================
   DELETE SAVED TRIP
========================= */

export async function deleteSavedTrip(savedTripId: string) {
  const user = await getRequiredUser();

  await db
    .delete(savedTrips)
    .where(
      and(
        eq(savedTrips.id, savedTripId),
        eq(savedTrips.userId, user.id)
      )
    );
}

/* =========================
   DELETE SAVED LOCATION
========================= */

export async function deleteSavedLocation(id: string) {
  const user = await getRequiredUser();

  await db.delete(itineraryAttractions).where(eq(itineraryAttractions.id, id));
}
