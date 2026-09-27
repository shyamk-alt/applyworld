export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || 'developer jobs in India';
  const res = await fetch(`https://jsearch.p.rapidapi.com/search-v2?query=${query}&page=${page}&num_pages=1`, {
  const res = await fetch(`https://jsearch.p.rapidapi.com/search?query=${query}&page=${page}&num_pages=1`, {
    headers: {
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
    }
  });
  const data = await res.json();
  return Response.json(data);
}