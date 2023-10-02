import React, { useState, useEffect } from "react";
import './Filmlist.scss';

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://swapi.dev/api/films")
      .then((response) => response.json())
      .then((data) => {
        setFilms(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setLoading(false);
      });
  }, []);

  const handleFilmClick = (film) => {
    setSelectedFilm(selectedFilm === film ? null : film);
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      {!loading && (
        <ul>
          {films.map((film) => (
            <li key={film.episode_id} onClick={() => handleFilmClick(film)}>
              {film.title}
              {selectedFilm === film && (
                <div>
                  <p>Episode: {film.episode_id}</p>
                  <p>Director: {film.director}</p>
                  <p>Producer: {film.producer}</p>
                  <p>Release Date: {film.release_date}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilmList;
