export async function sendPrompt(prompt) {
  try {
    const response = await fetch("http://192.168.180.132:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Server returned status ${response.status}`);
    }

    const text = await response.text();

    try {
      const parsed = JSON.parse(text);
      return parsed.response?.toString() || text;
    } catch (err) {
      console.warn("JSON parsing failed", err);
      return text;
    }
  } catch (error) {
    console.error("Network error", error);
    return `Error: ${error.message}`;
  }
}
