import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import FooterLogo from './img/footer-logo.png';

export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      try {
        let list = await Tmdb.getHomeList();
        setMovieList(list);

        let originals = list.find(item => item.slug === 'trending');
        let originalsFiltered = originals.items.results.filter(item => item.media_type === "tv");

        let randomChosen = Math.floor(Math.random() * originalsFiltered.length);
        let chosen = originalsFiltered[randomChosen];

        let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
        setFeaturedData(chosenInfo);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    }


    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    }
    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, []);

  return (
    <div className="page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items}
            if></MovieRow>
        ))
        }
      </section>
      <footer>
        Todos os dados foram extraídos da <a href='https://tmdb.org' className='api--button'>API Tmdb.</a><br />
        Todos os direitos de imagem reservados a Netflix. <br /><br />
        <div className="footer-info">
          <p>powered by</p>
          <img src={FooterLogo} alt="Logo" className='footer-logo' />
        </div>
      </footer>

      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://c.tenor.com/Rfyx9OkRI38AAAAC/netflix-netflix-startup.gif" alt='loading' />
        </div>
      }
    </div>
  )
}
