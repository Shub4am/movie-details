import { useState } from 'react';
import Card from './components/Card';
import EmptySearchInput from './components/EmptySearchInput';

import SearchIcon from './assets/search.png';

function App() {
  const [searchInput, setSearchInput] = useState('');
  const [movieData, setMovieData] = useState(null);
  const [showEmptySearch, setShowEmptySearch] = useState(false);

  const handleSearch = async () => {
    if (searchInput.trim() === '') {
      console.log('No search input');
      setShowEmptySearch(true);
      return;
    }

    setShowEmptySearch(false);

    const apiKey = import.meta.env.VITE_API_KEY;
    const apiUrl = `http://www.omdbapi.com/?t=${searchInput}&apikey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.Response === 'False') {
      setShowEmptySearch(true);
      setMovieData(null);
    } else {
      setMovieData(data);
    }
    setSearchInput('');
  };

  const handleEmptySearch = () => {
    setMovieData(null);
    setSearchInput('');
    console.log('No search input');
    setShowEmptySearch(true);
  };

  const isCardVisible = !!movieData;

  return (
    <div>
      <div
        className={`flex mx-auto w-80 sm:w-2/4 m-2 p-2 relative ${
          isCardVisible ? 'mt-4' : 'mt-60'
        }`}
      >
        <input
          id="search-input"
          className=" w-60 sm:w-3/4 h-10 pl-10 bg-transparent border-2 border-slate-3
          00 pr-2 rounded-xl text-xl capitalize"
          placeholder="Search Movies"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="Search Icon"
          className=" w-6 h-6 absolute left-4 top-4 cursor-pointer"
        />
        <button
          className="h-9 bg-amber-500 m-1 px-2 rounded-xl hover:bg-yellow-500"
          onClick={searchInput.trim() === '' ? handleEmptySearch : handleSearch}
        >
          Search
        </button>
      </div>
      {showEmptySearch ? (
        <EmptySearchInput />
      ) : (
        movieData && <Card movieData={movieData} />
      )}
    </div>
  );
}

export default App;
