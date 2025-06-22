import React, { useEffect, useState } from 'react';
import useTimeContext from '../context/useTimeContext';
import useWeatherContext from '../context/useWeatherContext';
import { getPlaylists } from '../playlists/getPlaylists';
import PlaylistCarousel from '../components/PlaylistCarousel';

const ContextualPlaylistsSection = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const timeCtx = useTimeContext();
  const weatherCtx = useWeatherContext();

  useEffect(() => {
    fetch('/src/data/shows.json')
      .then(res => res.json())
      .then(data => {
        setShows(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-white">Loading playlists...</div>;

  const playlists = getPlaylists({ ...timeCtx, ...weatherCtx }, shows);

  if (playlists.length === 0) return null;

  return (
    <section className="mb-8">
      {playlists.map(pl => (
        <PlaylistCarousel key={pl.key} title={pl.title} shows={pl.shows} />
      ))}
    </section>
  );
};

export default ContextualPlaylistsSection; 