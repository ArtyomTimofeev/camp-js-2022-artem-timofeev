import { VFC, Dispatch } from 'react';
import {
  Box, InputLabel, MenuItem, FormControl,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { EPISODE_ID_PROPERTY, RELEASE_DATE_PROPERTY, TITLE_PROPERTY } from 'src/utils/constants';

interface Props {

  /** Sorting type. */
  readonly sortingType: string;

  /** Sets sorting type. */
  readonly setSortingType: Dispatch<React.SetStateAction<string>>;
}

export const SortingSelectComponent: VFC<Props> = ({ sortingType, setSortingType }) => {
  const handleChange = (event: SelectChangeEvent): void => {
    setSortingType(event.target.value);
  };

  return (
    <Box>
      <FormControl sx={{ minWidth: 240 }}>
        <InputLabel id="sorting-select-label">Sorting</InputLabel>
        <Select
          color="secondary"
          labelId="sorting-select-label"
          id="sorting-select"
          value={sortingType}
          label="Sorting"
          onChange={handleChange}
        >
          <MenuItem value={TITLE_PROPERTY}>By Title</MenuItem>
          <MenuItem value={EPISODE_ID_PROPERTY}>By Episode №</MenuItem>
          <MenuItem value={RELEASE_DATE_PROPERTY}>By Release Date</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
