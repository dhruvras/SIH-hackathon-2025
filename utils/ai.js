export async function sendPrompt(prompt) {
  try {
    const response = await fetch("http://192.168.99.115:8000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const text = await response.text();

    // Try to parse JSON and extract the message string
    try {
      const parsed = JSON.parse(text);
      return parsed.response?.toString() || text;
    } catch {
      return text;
    }
  } catch (error) {
    return `Error: ${error.message}`;
  }
}
