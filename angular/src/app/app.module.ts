import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { environment } from './../environments/environment';
import { FilmsModule } from './features/films/films.module';
import { DialogWithFilmFormComponent } from './shared/components/dialog-with-film-form/dialog-with-film-form.component';

/** Root module. */
@NgModule({
  declarations: [AppComponent, NavbarComponent, DialogWithFilmFormComponent],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatCommonModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    FilmsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AngularFireModule.initializeApp(environment.firebase),
  ],
  bootstrap: [AppComponent],
  providers: [],
})
export class AppModule { }
