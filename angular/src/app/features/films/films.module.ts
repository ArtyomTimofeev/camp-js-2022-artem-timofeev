import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';

import { FilmsPageComponent } from './films-page/films-page.component';
import { DetailsFilmPageComponent } from './details-film-page/details-film-page.component';
import { DialogWithFilmFormComponent } from './details-film-page/dialog-with-film-form/dialog-with-film-form.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsPageComponent,
  },
  {
    path: 'film-details/:id',
    component: DetailsFilmPageComponent,
  },
];

/**
 * FilmsModule.
 */
@NgModule({
  declarations: [FilmsPageComponent, DetailsFilmPageComponent, DialogWithFilmFormComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [MaterialModule],
})
export class FilmsModule { }
