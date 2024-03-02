import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const Movies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [buttonClicked, setButtonClicked] = useState(false);

    const fetchMovies = async () => {
        try {
            const response = await fetch('http://localhost:3000/movies');
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.log('Error fetching data', error);
            setError(error.message);
        }
    };

    const fetchMovieByTitle = async () => {
        try {
            const response = await axios.get('http://localhost:3000/movies/search/title', {
                params: {
                    title: searchTerm,
                },
            });
            setMovies(response.data);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleButtonClick = () => {
        setButtonClicked(true);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        if (buttonClicked) {
            fetchMovieByTitle();
            setButtonClicked(false);
        }
    }, [buttonClicked]);

    return (
        <div className="container mt-5">
            <form className="mb-4 d-flex justify-content-center">
                <input
                    type="text"
                    className="form-control mr-2"
                    placeholder="Search movie by title"
                    value={searchTerm}
                    onChange={handleChange}
                />
                <button
                    type="button"
                    className="btn btn-primary ml-3"
                    onClick={handleButtonClick}
                >
                    Search
                </button>
            </form>
            {movies && movies.length > 0 ? (
                <div className='d-flex flex-wrap justify-content-around'>
                    {movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            ) : (
                <p className="text-center">No movies found</p>
            )}
        </div>
    );
};

export default Movies;
