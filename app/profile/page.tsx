import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileClient from "./profile-client";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login");
  }

  // Maknuli smo getUserItineraryData jer nam trenutno ne treba u profilu
  return (
    <ProfileClient 
      user={session.user} 
    />
  );
}