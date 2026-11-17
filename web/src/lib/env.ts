function required(name: string): string {
  const value = (import.meta.env as Record<string, string | undefined>)[name];
  if (!value) {
    throw new Error(`Missing env var ${name}. Copy .env.example to .env.local and fill it in.`);
  }
  return value;
}

export const env = {
  apiBaseUrl: required("VITE_API_BASE_URL").replace(/\/$/, ""),
};