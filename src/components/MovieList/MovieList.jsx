import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';
import PopupForm from '../PopupForm/PopupForm';
import PopupDetails from '../PopupDetails/PopupDetails';
import MovieForm from '../MovieForm/MovieForm';
import Details from '../Details/Details';

function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const [openForm, setOpenForm] = useState(false);
    const [openDetails, 
      setOpenDetails = (id) => {
        dispatch({
          type: 'GET_DETAILS',
          payload: id
        })
        dispatch({
          type: 'GET_GENRES',
          payload: id
        })
        history.push('/details')
      }
    ] = useState(false);

    useEffect(() => {
        dispatch({ 
          type: 'FETCH_MOVIES' 
        });
    }, []);

    return (
        <main>
          <section className="addMovieNav">
            <h1>MovieList</h1>
            <p>Can't find your movie?</p>
            <button onClick={() => setOpenForm(true)}>Add Movie</button>
          </section>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div
                          key={movie.id} 
                          onClick={() => setOpenDetails(true, movie.id)}
                          className="movieCard">
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} className="poster"/>
                        </div>
                    );
                })}
            </section>
            <PopupDetails
            openDetails = {openDetails}
            setOpenDetails = {setOpenDetails}
            >
              <Details />
            </PopupDetails>
            
            <PopupForm
            title="Add a New Movie"
            openForm = {openForm}
            setOpenForm = {setOpenForm}
            >
              <MovieForm />
            </PopupForm>
        </main>

    );
}

export default MovieList;