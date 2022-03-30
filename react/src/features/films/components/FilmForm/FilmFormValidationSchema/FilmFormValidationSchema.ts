import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  title: yup.string()
    .min(3, 'Should be at least 3 characters long.')
    .required('Required.').max(30),
  openingCrawl: yup.string()
    .min(3, 'Should be at least 3 characters long.')
    .required('Required'),
  director: yup.string()
    .min(3, 'Should be at least 3 characters long.')
    .required('Required'),
  producer: yup.string()
    .min(3, 'Should be at least 3 characters long.')
    .required('Required'),
  releaseDate: yup.string()
    .required('Required'),
  episodeId: yup.number()
    .required('Required'),
});
