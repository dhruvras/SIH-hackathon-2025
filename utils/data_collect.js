const SERVER_URL = "http://192.168.5.249:5050/data"; 


export async function fetchCsvData() {
  try {
    const response = await fetch(SERVER_URL);
    const json = await response.json();

    if (json.error) {
      throw new Error(json.error);
    }

    return json;
  } catch (error) {
    console.error("Error fetching CSV data:", error);
    throw error;
  }
}
