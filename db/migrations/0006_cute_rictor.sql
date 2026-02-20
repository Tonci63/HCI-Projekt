CREATE TABLE "blog_comments" (
	"id" text PRIMARY KEY NOT NULL,
	"blog_slug" text NOT NULL,
	"user_id" text NOT NULL,
	"user_name" text NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
