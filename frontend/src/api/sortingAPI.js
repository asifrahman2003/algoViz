const BASE_URL = "http://127.0.0.1:5000";

export async function getSortSteps(method, array) {
  const res = await fetch(`${BASE_URL}/sort`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method, array }),
  });
  return await res.json();
}

export async function getRecommendation(data_type, data_size, real_time) {
  const res = await fetch(`${BASE_URL}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data_type, data_size, real_time }),
  });
  return await res.json();
}
