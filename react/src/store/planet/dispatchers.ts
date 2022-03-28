import { createAsyncThunk } from '@reduxjs/toolkit';
import { PlanetService } from 'src/api/services/planet.service';
import { Film } from '../../models/film';

export const fetchRelatedPlanets = createAsyncThunk(
  'planets/fetchRelatedPlanets',
  (planetsIds: Film['planetsIds']) => PlanetService.fetchRelatedPlanets(planetsIds),
);
