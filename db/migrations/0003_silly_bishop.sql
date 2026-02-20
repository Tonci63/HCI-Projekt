CREATE TABLE "itineraries" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "itinerary_attractions" (
	"id" text PRIMARY KEY NOT NULL,
	"itinerary_id" text NOT NULL,
	"attraction_id" text NOT NULL,
	"name" text NOT NULL,
	"image" text NOT NULL,
	"travel_time" text NOT NULL,
	"is_priority" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "saved_trips" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"image" text NOT NULL,
	"user_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "itineraries" ADD CONSTRAINT "itineraries_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "itinerary_attractions" ADD CONSTRAINT "itinerary_attractions_itinerary_id_itineraries_id_fk" FOREIGN KEY ("itinerary_id") REFERENCES "public"."itineraries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "saved_trips" ADD CONSTRAINT "saved_trips_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;