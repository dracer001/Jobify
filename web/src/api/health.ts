import { env } from "../lib/env";

export type HealthResponse = {
  status: "ok";
  app: string;
  database: "up" | "down";
  time: string;
};

export async function fetchHealth(signal?: AbortSignal): Promise<HealthResponse> {
  const res = await fetch(`${env.apiBaseUrl}/api/health`, {
    headers: { Accept: "application/json" },
    signal,
  });
  if (!res.ok) throw new Error(`API responded with ${res.status}`);
  return res.json();
}