export const fetchData = async () => {
  const response = await fetch('https://api.sampleapis.com/coffee/hot');
  if (!response.ok) {
    throw new Error('API error');
  }
  return response.json();
};