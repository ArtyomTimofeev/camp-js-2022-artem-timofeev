import { List, Typography } from '@mui/material';
import { useEffect, useState, VFC } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilms, fetchMoreFilms } from 'src/store/film/dispatchers';
import { selectFilms, selectLastDocCursor } from 'src/store/film/selectors';
import { DEFAULT_SORTING_TYPE } from 'src/utils/constants';
import { FilmItem } from '../../components/FilmItem';
import { Search } from '../../components/Search';
import { SortingSelect } from '../../components/SortingSelect';
import styles from './FilmsPage.module.css';

export const FilmsPageComponent: VFC = () => {
  const dispatch = useAppDispatch();

  const films = useAppSelector(selectFilms);
  const lastDocCursor = useAppSelector(selectLastDocCursor);

  const [sortingType, setSortingType] = useState(DEFAULT_SORTING_TYPE);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(fetchFilms({ sortingType, searchValue }));
  }, [dispatch, sortingType, searchValue]);

  const fetchNextFilmsChunk = (): void => {
    dispatch(fetchMoreFilms({ sortingType, lastDocCursor }));
  };

  return (
    <>
      <Typography variant="h4" component="h1" align="center">SW Films</Typography>
      <div className={styles.filterControls}>
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <SortingSelect sortingType={sortingType} setSortingType={setSortingType} />
      </div>
      <List
        id="scrollableList"
        className={styles.scrollableList}
        component="div"
      >
        <InfiniteScroll
          dataLength={films.length}
          next={fetchNextFilmsChunk}
          scrollableTarget="scrollableList"
          hasMore
          loader
        >
          {films.map(film => (
            <FilmItem key={film.id} film={film} />
          ))}
        </InfiniteScroll>
      </List>
    </>
  );
};
