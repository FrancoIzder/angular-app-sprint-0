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

  inputsValidators = [
    {
      label: 'Nombre(s)',
      validator: new FormControl('', [
        this.patternValidator,
        Validators.required,
      ]),
    },
    {
      label: 'Apellido Paterno',
      validator: new FormControl('', [
        this.patternValidator,
        Validators.required,
      ]),
    },
    {
      label: 'Apellido Materno',
      validator: new FormControl('', [
        this.patternValidator,
        Validators.required,
      ]),
    },
    {
      label: 'Correo',
      validator: new FormControl('', [Validators.required, Validators.email]),
    },
  ];

  submitUser = () => {
    console.log('submitted!');
  };
}
