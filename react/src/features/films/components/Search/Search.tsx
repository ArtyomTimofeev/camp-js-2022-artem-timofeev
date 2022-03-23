import { TextField } from '@mui/material';
import { VFC, Dispatch, memo } from 'react';
import debounce from 'lodash.debounce';

interface Props {

  /** Search value. */
  searchValue: string;

  /** Sets search value. */
  setSearchValue: Dispatch<React.SetStateAction<string>>;
}

const SearchComponent: VFC<Props> = ({ setSearchValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };
  const debounceOnChange = debounce(handleChange, 800);

  return (
    <TextField
      autoComplete="off"
      id="outlined-name"
      label="Search by title"
      variant="standard"
      color="secondary"
      onChange={debounceOnChange}
    />
  );
};

export const Search = memo(SearchComponent);
