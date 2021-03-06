import { useSelector } from 'react-redux';

function Details() {
  // get details from server 
  const details = useSelector(store => store.details);

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
    </>
  )
}

export default Details;