import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'sw-dialog-with-film-form',
  templateUrl: './dialog-with-film-form.component.html',
  styleUrls: ['./dialog-with-film-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogWithFilmFormComponent implements OnInit {

  public constructor(private readonly fb: FormBuilder) { }

  public form!: FormGroup;

  public submitForm(): void {
    console.log(this.form.value);
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      director: ['', [Validators.required, Validators.max(100)]],
      producer: ['', [Validators.required, Validators.max(100)]],
      openingCrawl: ['', [Validators.required, Validators.max(100)]],
      characterIds: ['', [Validators.required, Validators.max(100)]],
      planetsIds: ['', [Validators.required, Validators.max(100)]],
      releaseDate: ['', [Validators.required, Validators.max(100)]],
    });
  }

}
