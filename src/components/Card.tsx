import React from 'react';

type MovieDetails = {
  Poster: string;
  Title: string;
  Year: string;
  Rated: string;
  imdbRating: string;
  Runtime: string;
  Genre: string;
  Plot: string;
  Actors: string;
  BoxOffice: string;
};

const Card: React.FC<{ movieData: MovieDetails | null }> = ({ movieData }) => {
  if (!movieData) {
    return null;
  }

  const {
    Poster,
    Title,
    Year,
    imdbRating,
    Runtime,
    Rated,
    Genre,
    Plot,
    Actors,
    BoxOffice,
  } = movieData;

  const ConvertToHours = (runtimeInMinutes: string): string => {
    const minutes = parseInt(runtimeInMinutes, 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const runtimeInHours = ConvertToHours(Runtime);

  return (
    <div className="card mx-auto w-80 sm:w-2/4 p-2 rounded">
      <div className="flex">
        <img
          src={Poster}
          alt="poster"
          className=" w-36 md:w-1/4 md:h-1/4 rounded-xl relative"
        />
        <div className="flex-col w-full text-center">
          <p className="text-2xl uppercase my-1 mt-4">{Title}</p>

          <p className="text-xl my-1">{imdbRating}</p>

          <p className="text-xl my-1">
            {Year} · {Rated} · {runtimeInHours}
          </p>
          <p className="text-lg my-1">{Genre}</p>
          <p className="text-lg my-1">{BoxOffice}</p>
        </div>
      </div>
      <div className="flex-col my-5">
        <p className="text-3xl my-1">Plot</p>
        <p className="text-base my-1">{Plot}</p>
        <p className="text-3xl my-1">Cast</p>
        <p className="text-lg my-1">{Actors}</p>
      </div>
    </div>
  );
};

export default Card;
