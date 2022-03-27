import { VFC, useMemo } from 'react';
import {
  Box, InputLabel, MenuItem, FormControl,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { EPISODE_ID_PROPERTY, RELEASE_DATE_PROPERTY, TITLE_PROPERTY } from 'src/utils/constants';

interface Props {

  /** Sorting type. */
  readonly sortingType: string;

  /** Sets sorting type. */
  readonly handleSortingTypeChange: (value: string) => void;
}

interface MenuItemValue{

  /** Menu Item id. */
  id: number;

  /** Menu Item value. */
  value: string;

  /** Menu Item label. */
  label: string;
}

export const SortingSelect: VFC<Props> = ({ sortingType, handleSortingTypeChange }) => {
  const MenuItemValues = useMemo<MenuItemValue[]>(() => [
    { id: 1, value: TITLE_PROPERTY, label: 'By Title' },
    { id: 2, value: EPISODE_ID_PROPERTY, label: 'By Episode №' },
    { id: 3, value: RELEASE_DATE_PROPERTY, label: 'By Release Date' }], []);

  const handleChange = (event: SelectChangeEvent): void => {
    handleSortingTypeChange(event.target.value);
  };

  const menuItemList = useMemo(() => MenuItemValues.map(item => (
    <MenuItem value={item.value} key={item.id}>
      {item.label}
    </MenuItem>
  )), [MenuItemValues]);

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
          {menuItemList}
        </Select>
      </FormControl>
    </Box>
  );
};
