export interface ApiAgentMessage {
  agent: string;
  message: string;
}

export interface ChatResponse {
  conversation: ApiAgentMessage[];
  final_answer: string;
}

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export async function postChat(query: string): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Backend error (${response.status}): ${
        text || response.statusText || "Unknown error"
      }`
    );
  }

  return response.json() as Promise<ChatResponse>;
}


