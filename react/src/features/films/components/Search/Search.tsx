import { TextField } from '@mui/material';
import { VFC } from 'react';
import debounce from 'lodash.debounce';

interface Props {

  /** Search value. */
  readonly searchValue: string;

  /** Sets search value. */
  readonly handleSearchValueChange: (value: string) => void;
}

export const Search: VFC<Props> = ({ handleSearchValueChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    handleSearchValueChange(event.target.value);
  };
  const debounceOnChange = debounce(handleChange, 800);

  return (
    <TextField
      type="search"
      autoComplete="off"
      label="Search by title"
      color="secondary"
      onChange={debounceOnChange}
    />
  );
};
