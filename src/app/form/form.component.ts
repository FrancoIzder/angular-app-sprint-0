import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  isDisabled: boolean = true;
  patternValidator = Validators.pattern(/^[a-zA-Z\s]*$/);

  data = {
    correo_electronico: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombre: '',
    origen: 3,
  };

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

  setData = (statusType: string, i: number, data: any) => {
    const isValid = statusType === 'VALID' ? true : false;
    const value = isValid ? data.target.value : '';
    switch (i) {
      case 0:
        this.data.nombre = value;
        break;
      case 1:
        this.data.apellidoPaterno = value;
        break;
      case 2:
        this.data.apellidoMaterno = value;
        break;
      case 3:
        this.data.correo_electronico = value;
        break;
      default:
        return;
    }
    if (
      this.data.nombre !== '' &&
      this.data.apellidoPaterno !== '' &&
      this.data.apellidoMaterno !== '' &&
      this.data.correo_electronico !== ''
    ) {
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
  };

  submitUser = () => {
    console.log(this.data);
  };
}
