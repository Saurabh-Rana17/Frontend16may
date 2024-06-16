import { BaseUrl } from "./CONSTANT";

export async function postData({ url, data }) {
  const response = await fetch(BaseUrl + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to post", response.status, response.statusText);
  }

  return response.json();
}
