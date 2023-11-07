"use client";

import { fetchUser } from "@/services/auth/fetchUser";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const getUser = async () => {
    try {
      const user = await fetchUser();

      if (user.ok === false) {
        router.replace("/login");
      }

      console.log(user);
    } catch (error) {
      router.replace("/login");
    }
  };

  const logout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    router.replace("/login");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h2>Dashboard</h2>
      <button onClick={getUser}>Get profile</button>

      <button onClick={logout}>Logout</button>
    </main>
  );
}
