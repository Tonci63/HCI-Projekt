"use server";

import { db } from "@/db";
import { blogComments } from "@/db/schema";
import { getRequiredUser, getOptionalUser } from "@/app/actions/itinerary";
import { eq, desc, and } from "drizzle-orm";

/* =========================
   ADD COMMENT
========================= */
export async function addComment(slug: string, message: string) {
  const user = await getRequiredUser();

  if (!message.trim()) return;

  await db.insert(blogComments).values({
    id: crypto.randomUUID(),
    blogSlug: slug,
    userId: user.id,
    userName: user.name ?? "User",
    message,
  });
}

/* =========================
   GET COMMENTS
========================= */
export async function getComments(slug: string) {
  return db
    .select()
    .from(blogComments)
    .where(eq(blogComments.blogSlug, slug))
    .orderBy(desc(blogComments.createdAt));
}

/* =========================
   DELETE COMMENTS
========================= */
export async function deleteComment(commentId: string) {
  const user = await getRequiredUser();

  await db
    .delete(blogComments)
    .where(
      and(
        eq(blogComments.id, commentId),
        eq(blogComments.userId, user.id) // ownership check
      )
    );
}
