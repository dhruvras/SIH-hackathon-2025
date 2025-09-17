const SERVER_URL = "http://192.168.180.132:5050/data";

export async function fetchCsvData(): Promise<number[]> {
  try {
    const response = await fetch(SERVER_URL);
    const json = await response.json();

    if (json.error) {
      throw new Error(json.error);
    }

    // If server sends { "data": "636.0,894.0,0.0,1013.0,67.0,27.1" }
    // Convert that string into [636, 894, 0, 1013, 67, 27.1]
    const raw = Array.isArray(json) ? json : json.data || json;

    const values =
      typeof raw === "string"
        ? raw.split(",").map(v => parseFloat(v.trim()))
        : raw;

    console.log("✅ Parsed CSV values:", values);
    return values;
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    return [];
  }
}
