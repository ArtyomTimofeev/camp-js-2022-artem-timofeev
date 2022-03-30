import { TextField } from '@mui/material';
import { FieldHookConfig, useField } from 'formik';
import { VFC, memo } from 'react';

interface Props {

  /** Field label. */
  readonly label: string;

  /** Is Multiline. */
  readonly isMultiline?: boolean;

  /** Name. */
  readonly name: string;

  /** Field type. */
  readonly type: string;

}

const CustomTextFieldComponent: VFC<Props & FieldHookConfig<string>> = ({
  label, name, isMultiline, type,
}) => {
  const [field, meta] = useField(name);

  return (
    <TextField
      margin="dense"
      fullWidth
      variant="outlined"
      type={type}
      multiline={isMultiline}
      label={label}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      error={Boolean(meta.error)}
      required
    />
  );
};

export const CustomTextField = memo(CustomTextFieldComponent);
