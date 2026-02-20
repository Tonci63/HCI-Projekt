import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

/* =========================
   ITINERARIES (1 per user)
========================= */

export const itineraries = pgTable("itineraries", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   ATTRACTIONS INSIDE ITINERARY
========================= */

export const itineraryAttractions = pgTable("itinerary_attractions", {
  id: text("id").primaryKey(),
  itineraryId: text("itinerary_id")
    .notNull()
    .references(() => itineraries.id, { onDelete: "cascade" }),
  attractionId: text("attraction_id").notNull(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  travelTime: text("travel_time").notNull(),
  isPriority: boolean("is_priority").default(false),
  lat: text("lat"),
  lng: text("lng"),
});

/* =========================
   SAVED TRIPS (recommended templates)
========================= */

export const savedTrips = pgTable("saved_trips", {
  id: text("id").primaryKey(), // internal UUID

  tripId: text("trip_id").notNull(), // ← ADD THIS LINE

  title: text("title").notNull(),
  image: text("image").notNull(),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});


/* =========================
   BLOG COMMENTS
========================= */

export const blogComments = pgTable("blog_comments", {
  id: text("id").primaryKey(),

  blogSlug: text("blog_slug").notNull(), // connects to CMS post

  userId: text("user_id").notNull(),

  userName: text("user_name").notNull(),

  message: text("message").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
