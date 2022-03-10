import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { ReactiveFormsModule } from '@angular/forms';

import { FilmsPageComponent } from './films-page/films-page.component';
import { DetailsFilmPageComponent } from './details-film-page/details-film-page.component';
const routes: Routes = [
  {
    path: '',
    component: FilmsPageComponent,
  },
  {
    path: 'film-details',
    component: DetailsFilmPageComponent,
  },
];

/**
 * FilmsModule.
 */
@NgModule({
  declarations: [FilmsPageComponent, DetailsFilmPageComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule.forChild(routes),
  ],
})
export class FilmsModule { }
