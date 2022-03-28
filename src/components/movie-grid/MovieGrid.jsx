import React from 'react';
import './movie-grid.scss';

import MovieCard from '../movie-card/MovieCard';
import Input from '../input/Input'
import { useParams, useHistory } from 'react-router';

import tmdbApi, { movieType, tvType, category } from '../../api/tmdbApi';
import { OutlineButton } from './../button/Button';

const MovieGrid = (props) => {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(0);

  const { keyword } = useParams();

  React.useEffect(() => {
    const getList = async () => {
      let response = null;
      const params = {};
      if (keyword === undefined) {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.category, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getList();
  }, [props.category, keyword]);

  const loadMore = async () => {
    let response = null;
    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.category) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.category, { params });
    }
    setItems([...items, ...response.results]);
    setPage(page + 1);
  };

  return (
    <>
      <div className="movie-grid">
        {items.map((item, i) => (
          <MovieCard key={i} category={props.category} item={item} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClick={loadMore}>
            Load more
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {

    const history = useHistory()
    const [keyword, setKeyword] = React.useState(props.keyword ? props.keyword : '')

    return (
        <div className="movie-search">
            <Input 
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
        </div>
    )
}

export default MovieGrid;
