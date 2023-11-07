export const fetchUser = async () => {
  const res = await fetch("/api/auth/profile", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
