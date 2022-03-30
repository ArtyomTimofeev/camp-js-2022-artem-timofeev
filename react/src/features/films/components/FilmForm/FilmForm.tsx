import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { VFC } from 'react';
import { Film } from 'src/models/film';
import { CustomTextField } from './CustomTextField/CustomTextField';
import { FilmFormDateField } from './FilmFormDateField/FilmFormDateField';
import { validationSchema } from './FilmFormValidationSchema/FilmFormValidationSchema';

interface Props {

  /** Is Form Open. */
  readonly isFormOpen: boolean;

  /** HandleIsOpenFormChange func. */
  readonly handleIsOpenFormChange: (value: boolean) => void;
}

type FilmFormType = Omit<Film, 'id' | 'charactersIds' | 'planetsIds'>;

const initialValues: FilmFormType = {
  title: '',
  director: '',
  producer: '',
  openingCrawl: '',
  episodeId: 0,
  releaseDate: new Date(),
};

const FilmForm: VFC<Props> = ({ isFormOpen, handleIsOpenFormChange }) => {
  const handleClose = (): void => {
    handleIsOpenFormChange(false);
  };

  return (
    <Dialog open={isFormOpen} onClose={handleClose}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form>
          <DialogTitle>Adding a film to catalogue</DialogTitle>
          <DialogContent>
            <DialogContentText>
              If you want to add a film, please fill these fields.
            </DialogContentText>
            <CustomTextField label="Title" name="title" type="text" />
            <CustomTextField isMultiline label="Opening crawl" name="openingCrawl" type="text" />
            <CustomTextField label="Producer" name="producer" type="text" />
            <CustomTextField label="Director" name="director" type="text" />
            <CustomTextField label="Episode №" name="episodeId" type="number" />
            <FilmFormDateField label="Release date" name="releaseDate" />
          </DialogContent>
          <DialogActions>
            <Button type="reset" onClick={handleClose}>Cancel</Button>
            <Button color="secondary" type="submit">
              Submit
            </Button>
          </DialogActions>
        </Form>
      </Formik>
    </Dialog>
  );
};

export default FilmForm;
