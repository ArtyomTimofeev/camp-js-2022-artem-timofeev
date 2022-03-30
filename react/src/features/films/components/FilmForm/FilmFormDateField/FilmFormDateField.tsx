import {
  ChangeEvent,
  memo, useCallback, VFC,
} from 'react';
import { TextField } from '@mui/material';
import {
  FieldHookConfig, useField,
} from 'formik';

interface Props {
  /** Field label. */
  readonly label: string;
}

/**
 * Format date for input with type date.
 * @param date Date.
 */
function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

const FilmFormDateFieldComponent: VFC<Props & FieldHookConfig<Date>> = ({
  label, name,
}) => {
  const [field, meta, helpers] = useField(name);

  const handleChange = useCallback((event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const date = event.target.value;
    helpers.setValue(new Date(date));
  }, [helpers]);

  return (
    <TextField
      margin="dense"
      variant="outlined"
      type="date"
      label={label}
      name={field.name}
      value={formatDate(field.value)}
      onChange={handleChange}
      error={Boolean(meta.error)}
      helperText={meta.error}
    />
  );
};

export const FilmFormDateField = memo(FilmFormDateFieldComponent);
