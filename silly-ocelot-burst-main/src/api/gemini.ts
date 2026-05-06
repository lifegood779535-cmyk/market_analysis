export const askGemini = async (message: string) => {
  const apiKey = import.meta.env.VITE_AI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key missing! Please add VITE_AI_API_KEY to your .env file.");
  }

  // Using v1 endpoint with gemini-1.5-flash
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `You are an expert AI Trading Mentor and Assistant. You answer ANY question asked, even if it's not about trading, but try to bring it back to a professional or mentoring tone if possible. Use natural Hinglish (Hindi + English mix). User asks: ${message}`,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data?.candidates?.[0]?.content?.parts?.[0]?.text || "Mafi chahta hoon, main abhi busy hoon. 😢";
};
