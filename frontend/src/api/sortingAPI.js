const BASE_URL = "https://algoviz-fe71.onrender.com";

export async function getSortSteps(method, array) {
  const res = await fetch(`${BASE_URL}/sort`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ method, array }),
  });

  const data = await res.json(); // <- must make sure so that the frontend works properly, extract the JSON correctly

  console.log("Steps received from backend:", data.steps);
  return data; // <- here we return full object, not just data.steps
}

export async function getRecommendation(data_type, data_size, real_time) {
  const res = await fetch(`${BASE_URL}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data_type, data_size, real_time }),
  });

  return await res.json();
}
