export async function sendEmail(subject, body) {
  try {
    const response = await fetch("http://192.168.180.132:5000/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body }),
    });

    const data = await response.json();
    if (data.success) {
      console.log("✅ Email sent:", data.message);
    } else {
      console.error("❌ Error:", data.error);
    }
  } catch (err) {
    console.error("⚠️ Network error:", err.message);
  }
}
