const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

// Turns any error body returned by FastAPI into a readable string.
function readError(body, status) {
  const detail = body?.detail;
  if (Array.isArray(detail)) return detail.map((d) => d.msg).join(", ");
  if (typeof detail === "string") return detail;
  return `Request failed (${status})`;
}

export async function qualifyLead(message) {
  let response;
  try {
    response = await fetch(`${API_URL}/qualify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
  } catch {
    throw new Error(
      "Cannot reach the API. Is the backend running on " + API_URL + " ?"
    );
  }

  const body = await response.json().catch(() => null);
  if (!response.ok) throw new Error(readError(body, response.status));
  return body;
}
