import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

function MovieForm() {
    const genreDropdown = useSelector(store => store.genreDropdown)
    const dispatch = useDispatch();
    const history = useHistory();
    const [newMovie, setNewMovie] = useState({ title: '', poster: '', description: '', genre_id: '' })

    useEffect(() => {
      dispatch({
        type: 'GET_GENRE_OPTIONS'
      });
    }, []);

    const submitMovie = (submit, event) => {
      event.preventDefault()
      if(submit) {
        dispatch({
          type: 'POST_MOVIE',
          payload: newMovie
        })
        setNewMovie({ title: '', poster: '', description: '', genre_id: ''})
        history.push('/')
      }
    }

    function handleChange(key, event) {
      switch(key) {
        case 'title':
          setNewMovie({...newMovie, title: event.target.value})
          break;
        case 'poster':
          setNewMovie({...newMovie, poster: event.target.value})
          break;
        case 'description':
          setNewMovie({...newMovie, description: event.target.value})
          break;
        case 'genre':
          setNewMovie({...newMovie, genre_id: event.target.value})
          break;
        default:
          console.log('Unable to add movie')
      }
    }

    return (
      <div>
      <form className="movieForm">
        <div className="textInput">
        <input
          type="text"
          placeholder="Title"
          onChange={(event) => handleChange('title', event)}
          value={newMovie.title}
        />
        <input
          type="text"
          placeholder="Poster URL"
          onChange={(event) => handleChange('poster', event)}
          value={newMovie.poster}
        />
        </div>
        <div className="descriptionInput">
        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          maxlength="200"
          placeholder="Movie Description"
          onChange={(event) => handleChange('description', event)}
          value={newMovie.description}
        ></textarea>
        <label htmlFor="genre">Genre:</label>
        <select
          name="genre"
          id="genre"
          value={newMovie.genre}
          onChange={(event) => handleChange('genre', event)}>
              <option value="" disabled>Choose Genre:</option>
                {genreDropdown.map(genre => {
                  return(
                    <option key={genre.id} value={genre.id}>{genre.name}</option>
                  )
                })}
          </select>
          </div>
          <div className="buttons">
            <button onClick={(event) => submitMovie(true, event)}>Submit</button>
          </div>
      </form>
      </div>
    )
}

export default MovieForm;