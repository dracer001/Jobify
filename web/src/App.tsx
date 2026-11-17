import { useEffect, useState } from "react";
import { fetchHealth, type HealthResponse } from "./api/health";

type State =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; data: HealthResponse };

export default function App() {
  const [state, setState] = useState<State>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();

    fetchHealth(controller.signal)
      .then((data) => setState({ status: "ready", data }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return;
        setState({
          status: "error",
          message: err instanceof Error ? err.message : "Unknown error",
        });
      });

    return () => controller.abort();
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: "2rem" }}>
      <h1>Jobify</h1>
      {state.status === "loading" && <p>Checking the API…</p>}
      {state.status === "error" && <p role="alert">API unreachable: {state.message}</p>}
      {state.status === "ready" && (
        <p>
          API is {state.data.status}. Database: {state.data.database}.
        </p>
      )}
    </main>
  );
}