import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import logo from "../images/tv.png"
import play from "../images/Play.png"

function Details() {
  const { id } = useParams();

  // Initialize details as an empty array
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const apiKey = 'c05ff6f724839c90f05218dd30ad637e';

    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
        );

        if (response.data) {
          console.log(response.data);
          setDetails([response.data]); // Wrap the response data in an array
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  function formatDateToUTC(dateString) {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } 


  function formatRuntime(runtimeInMinutes) {
    const hours = Math.floor(runtimeInMinutes / 60);
    const minutes = runtimeInMinutes % 60;
    
    if (hours === 0) {
      return `${minutes} min`;
    } else if (minutes === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${minutes} min`;
    }
  }
  

  
  

  return (
    <div>
       <div className="ni">
          <nav className="navbar">
          <div className="logodiv">
              <img src={logo} alt="" className="navlogo" />
              <h3>Movie Box</h3>
          </div>
         
          <Link className='linkHome' to={"/"}>Home</Link>

          <div className="button">
              <button className='signin'>sign in</button>
              <button className='equals'>=</button>
          </div>
         
        </nav>
        </div>

      {details.map((element, index) => (
        <div key={index}>

          <h2 className='elementTitle' data-testid="movie-title">{ element.original_title}</h2>
            <div className='imagediv'>
                <img src={`https://image.tmdb.org/t/p/w500/${element.backdrop_path}`}></img>

                <img src="" alt="" className="watchtrailer" />
                <h2>Watch Trailer  
                  
                </h2>
                <img className='video' src={play} alt="" />
            </div>


            <div className="realesgen">

                    <div className="realeseRuntime">
                        
                        <h4 data-testid="movie-release-date">Realease Date : <span>{formatDateToUTC(element.release_date)}</span></h4>
      
                        <h4 data-testid="movie-runtime">Runtime: <span>{formatRuntime(element.runtime)}</span></h4>
                    </div>

                    <div className="genre">
                    <h3>Genre</h3>
                    <ul>
                    {element.genres.map((genre)=>(
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                    </ul>
                    
                    </div>
            </div>
            

            <div className="overview">
                <p className="overviewp"  data-testid=" movie-overview">{ element.overview}</p>

              </div>

              



            

          


        </div>
      ))}
    </div>
  );
}

export default Details;
