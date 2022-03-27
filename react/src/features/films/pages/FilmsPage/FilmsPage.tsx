import { List, Typography } from '@mui/material';
import {
  useEffect, useMemo, useState, VFC,
} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilms, fetchMoreFilms } from 'src/store/film/dispatchers';
import { selectFilms, selectLastDocCursor } from 'src/store/film/selectors';
import { DEFAULT_SORTING_TYPE } from 'src/utils/constants';
import { FilmItem } from '../../components/FilmItem';
import { Search } from '../../components/Search';
import { SortingSelect } from '../../components/SortingSelect';
import styles from './FilmsPage.module.css';

export const FilmsPage: VFC = () => {
  const dispatch = useAppDispatch();

  const films = useAppSelector(selectFilms);
  const lastDocCursor = useAppSelector(selectLastDocCursor);

  const [sortingType, setSortingType] = useState<string>(DEFAULT_SORTING_TYPE);
  const [searchValue, setSearchValue] = useState<string>('');

  useEffect(() => {
    dispatch(fetchFilms({ sortingType, searchValue }));
  }, [dispatch, sortingType, searchValue]);

  const filmsList = useMemo(() => films.map(film => (
    <FilmItem key={film.id} film={film} />
  )), [films]);

  /** Fetches next films chunk. */
  const fetchNextFilmsChunk = (): void => {
    dispatch(fetchMoreFilms({ sortingType, lastDocCursor }));
  };

  const handleSearchValueChange = (value: string): void => {
    setSearchValue(value);
  };

  const handleSortingTypeChange = (value: string): void => {
    setSortingType(value);
  };

  return (
    <>
      <Typography variant="h4" component="h1" align="center">SW Films</Typography>
      <div className={styles.filterControls}>
        <Search searchValue={searchValue} handleSearchValueChange={handleSearchValueChange} />
        <SortingSelect sortingType={sortingType} handleSortingTypeChange={handleSortingTypeChange} />
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
          {filmsList}
        </InfiniteScroll>
      </List>
    </>
  );
};
