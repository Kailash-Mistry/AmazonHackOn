export const searchShows = async (query) => {
  try {
    const res = await fetch('/src/data/shows.json');
    const data = await res.json();
    const q = query.trim().toLowerCase();
    
    const results = data.filter(show =>
      show.title.toLowerCase().includes(q) ||
      (show.genres && show.genres.some(g => g.toLowerCase().includes(q)))
    );
    
    return { results, error: null };
  } catch (err) {
    return { results: [], error: 'Error searching.' };
  }
}; 