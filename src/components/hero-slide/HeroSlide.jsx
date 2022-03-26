import React from 'react';
import './heroSlide.scss';

import tmdbApi, { category, movieType} from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig';

const HeroSlide = () => {

    const [movieItems, setMovieItems] = React.useState([])

    React.useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, {params})
                setMovieItems(response.results.slice(0, 4))
                console.log(response)
            } catch (err) {
                console.log(err, 'error');
            }
        }
        getMovies();
    }, [])

  return (
    <div className="hero-slide">HeroSlide</div>
  )
}

export default HeroSlide