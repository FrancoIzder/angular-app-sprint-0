import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  isDisabled: boolean = true;

  patternValidator = Validators.pattern(/^[a-zA-Z\s]*$/);

  inputsValidators = {
    name: new FormControl('', [this.patternValidator, Validators.required]),
    lastname1: new FormControl('', [
      this.patternValidator,
      Validators.required,
    ]),
    lastname2: new FormControl('', [
      this.patternValidator,
      Validators.required,
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
  };
}
