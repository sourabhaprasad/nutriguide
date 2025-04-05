export async function GET(req) {
  const res = await fetch(
    "https://world.openfoodfacts.org/facets/categories.json"
  );
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
}
