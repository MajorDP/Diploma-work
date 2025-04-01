export async function scrapeSite(url) {
  const res = await fetch("http://localhost:3000/api/scrape", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: url }),
  });

  const data = await res.json();

  return data;
}
