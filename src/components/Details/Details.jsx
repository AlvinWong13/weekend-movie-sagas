import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Details() {
  const history = useHistory()
  // get details from server 
  const details = useSelector(store => store.details);
  // get genres from server
  const genres = useSelector(store => store.genres);

  const handleBack = () => {
    history.push('/');
  }

    return(
      <>
      {details.map(info => {
        return(
          <div key={info.title}>
              <h1>{info.title}</h1>
              <img src={info.poster} alt={info.title}></img>
              <p>{info.description}</p>
          </div>
        )
      })}
      {genres.map(genre => {
        return(
          <p key={genre.name}>{genre.name}</p>
        )
      })}
      <button onClick={() => handleBack()}>Back to Movies</button>
    </>
  )
}

export default Details;