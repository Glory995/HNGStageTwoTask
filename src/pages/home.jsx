import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import logo from "../images/tv.png";
import idmb from  "../images/rate.png"
import { FaHeart } from 'react-icons/fa';

function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [swiperMovies, setSwiperMovies] = useState([]);
  const [error, setError] = useState(null);
  const [likedMovies, setLikedMovies] = useState({});

  useEffect(() => {
    const apiKey = 'c05ff6f724839c90f05218dd30ad637e';

    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
        );

        if (response.data.results) {
          const firstTenMovies = response.data.results.slice(0, 10);
          console.log(firstTenMovies)
          setPopularMovies(firstTenMovies);
          setSwiperMovies(response.data.results.slice(1, 20));
        }
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setError('An error occurred while fetching data. Please try again later.');
      }
    };

    fetchPopularMovies();
  },[]);

  const slickSettings = {
       infinite: true,
    speed: 500,
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll per action
    autoplay: true, // Enable auto-play
    autoplaySpeed: 3000, // Time between slides in milliseconds
  };


  function formatDateToUTC(dateString) {
    const date = new Date(dateString);
    // Use methods to obtain the UTC date components
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }  


  const toggleLike = (movieId) => {
    setLikedMovies((prevLikedMovies) => ({
      ...prevLikedMovies,
      [movieId]: !prevLikedMovies[movieId],
    }));
  };

  return (
    <div>

      {/* Hero section */}
      <div className="hero">

      <div className="swiper">
        <Slider {...slickSettings} className='Slider'>
          {swiperMovies.map((movie) => (
            <div key={movie.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
             
            </div>
          ))}
        </Slider>
      </div>

        {/* Navbar search section */}
        <div className="navwrap">
          <nav className="navbar">
          <div className="logodiv">
              <img src={logo} alt="" className="navlogo" />
              <h3>Movie Box</h3>
          </div>
         
          <div class="input-container">
  <input className='inputseacrch' type="search" placeholder='What do you want to watch' />
  <span class="material-symbols-outlined">search</span>
</div>

          <div className="button">
              <button className='signin'>sign in</button>
              <button className='equals'>=</button>
          </div>
         
        </nav>
        </div>
        

          {/* Agba swippper */}
       


      </div>

      {/* Other Section */}
      {error && <p className="error-message">{error}</p>}
      <h1>Featured Movies</h1>
      <div className="movie-grid">
        {popularMovies.map((movie) => (
          <div key={movie.id} data-testid="movie-card" className="movie-card">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              data-testid="movie-poster"
              className="movie-poster"
            />

            <FaHeart
            className={`heart-icon ${likedMovies[movie.id] ? 'liked' : ''}`}
            onClick={() => toggleLike(movie.id)}
            color={likedMovies[movie.id] ? 'red' : 'gray'}
          />
            <h2 className="movie-title" data-testid="movie-title">
              {movie.title}
            </h2>
            <p className="movie-release-date" data-testid="movie-release-date">
            Release Date: {formatDateToUTC(movie.release_date)}
            </p>

              <div className="idmb">
                <img src={idmb} alt="" />
                <p>{(movie.vote_average)*10}/100</p>
              </div>

              <Link className='seeDe' to={`/movies/${movie.id}`}>See Details</Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
