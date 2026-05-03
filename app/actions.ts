"use server";

import { cookies } from "next/headers";

export async function setProfile(profile: "bauti" | "otro") {
  const c = await cookies();
  c.set("jcb_profile", profile, { path: "/", maxAge: 60 * 60 * 24 * 30 });
}

export async function clearProfile() {
  const c = await cookies();
  c.delete("jcb_profile");
}
