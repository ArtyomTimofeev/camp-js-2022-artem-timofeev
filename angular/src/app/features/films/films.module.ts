import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../../material.module';

import { FilmsPageComponent } from './films-page/films-page.component';

const routes: Routes = [
  {
    path: '',
    component: FilmsPageComponent,
  },
];

/**
 * FilmsModule.
 */
@NgModule({
  declarations: [FilmsPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  exports: [MaterialModule],
})
export class FilmsModule { }
