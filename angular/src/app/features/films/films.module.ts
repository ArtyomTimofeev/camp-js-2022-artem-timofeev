import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

import { AuthorizedGuard } from 'src/app/core/guards/authorized.guard';

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
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
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
