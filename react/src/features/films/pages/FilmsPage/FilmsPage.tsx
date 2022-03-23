import { Button, List, Typography } from '@mui/material';
import {
  memo, useEffect, useState, VFC,
} from 'react';
import { useAppDispatch, useAppSelector } from 'src/store';
import { fetchFilms, fetchMoreFilms } from 'src/store/post/dispatchers';
import { selectFilms } from 'src/store/post/selectors';
import { DEFAULT_SORTING_TYPE } from 'src/utils/constants';
import { PostCard } from '../../components/PostCard';
import { Search } from '../../components/Search/Search';
import { SortingSelect } from '../../components/SortingSelect';

const FilmsPageComponent: VFC = () => {
  const dispatch = useAppDispatch();
  const films = useAppSelector(selectFilms);

  const [sortingType, setSortingType] = useState(DEFAULT_SORTING_TYPE);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    dispatch(fetchFilms({ sortingType, searchValue }));
  }, [dispatch, sortingType, searchValue, films]);

  return (
    <>
      <Typography variant="h4" component="h1" align="center">SW Films</Typography>
      <SortingSelect sortingType={sortingType} setSortingType={setSortingType} />
      <Search searchValue={searchValue} setSearchValue={setSearchValue} />
      <List
        sx={{
          width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto', maxHeight: '500px',
        }}
      >
        {films.map(film => (
          <PostCard key={film.id} post={film} />
        ))}
        <Button onClick={() => dispatch(fetchMoreFilms())}>More </Button>
      </List>
    </>
  );
};

export const FilmsPage = memo(FilmsPageComponent);
