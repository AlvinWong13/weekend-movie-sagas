import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';

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
            <div className="detailView" key={info.title}>
                <h1>{info.title}</h1>
                <img className="photo" src={info.poster} alt={info.title} onClick={() => handleBack()}></img>
                <p className="details-description">{info.description}</p>
                <Button
                  variant="contained"
                  color="secondary">
                  Edit
                </Button>
            </div>
          )
        })}
        {genres.map(genre => {
          return(
            <p key={genre.name}>{genre.name}</p>
          )
        })}
        
    </>
  )
}

export default Details;