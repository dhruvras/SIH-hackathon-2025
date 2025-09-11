const SERVER_URL = "http://192.168.1.5:5050/data"; 
// ⚠️ Replace with your laptop's local IP

export async function fetchCsvData() {
  try {
    const response = await fetch(SERVER_URL);
    const json = await response.json();

    if (json.error) {
      throw new Error(json.error);
    }

    return json; // returns array of objects
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    throw error;
  }
}
