const API_BASE = "http://localhost:5000/api";
export const askAI = async (message: string) => {
  try {
    const response = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to get AI response from server");
    }

    return data.reply;
  } catch (error: any) {
    console.error("[Frontend AI Error]:", error.message);
    throw new Error(error.message || "Could not reach the AI server.");
  }
};
