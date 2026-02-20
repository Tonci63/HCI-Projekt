import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileClient from "./profile-client";

export default async function ProfilePage() {
  const requestHeaders = await headers();

  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    redirect("/login");
  }

  return <ProfileClient user={session.user} />;
}
