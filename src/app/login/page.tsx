"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = Object.fromEntries(
      new FormData(event.currentTarget)
    );
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.status === 200) {
      router.push("/dashboard");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>
        <input
          type="email"
          autoComplete="email"
          name="email"
          className="border border-gray-400 rounded-lg px-4 py-2 mb-4 text-lime-900"
          placeholder="Email"
        />
        <input
          className="border border-gray-400 rounded-lg px-4 py-2 mb-4 text-lime-900"
          autoComplete="current-password"
          type="password"
          name="password"
          placeholder="Contraseña"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white rounded-lg px-4 py-2"
        >
          Iniciar sesión
        </button>
      </form>

      {/* {user && (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <button
            onClick={() => router.push("/dashboard")}
            className="bg-blue-500 text-white rounded-lg px-4 py-2"
          >
            Ir al dashboard
          </button>
        </div>
      )} */}
    </main>
  );
}
