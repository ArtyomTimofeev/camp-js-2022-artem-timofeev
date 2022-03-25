import { TextField } from '@mui/material';
import { VFC, Dispatch } from 'react';
import debounce from 'lodash.debounce';

interface Props {

  /** Search value. */
  readonly searchValue: string;

  /** Sets search value. */
  readonly setSearchValue: Dispatch<React.SetStateAction<string>>;
}

export const Search: VFC<Props> = ({ setSearchValue }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };
  const debounceOnChange = debounce(handleChange, 800);

  return (
    <TextField
      autoComplete="off"
      label="Search by title"
      color="secondary"
      onChange={debounceOnChange}
    />
  );
};
