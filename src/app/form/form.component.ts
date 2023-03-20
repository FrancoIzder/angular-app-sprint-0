import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserData } from '../users/users.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  isDisabled: boolean = true;
  patternValidator = Validators.pattern(/^[a-zA-Z\s]*$/);

  constructor(private http: HttpClient, private router: Router) {}

  data = {
    correo_electronico: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombre: '',
    origen: 3,
    rfc: 'ROLA900320N55',
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

  encryptData = () => {
    return this.http
      .post(
        'https://ja4j8mqyia.execute-api.us-east-1.amazonaws.com/dev/security/encrypt',
        { data: this.data }
      )
      .toPromise();
  };

  registerUser = (encryptedData: any) => {
    return this.http
      .post(
        'https://d4qo4rsz5l.execute-api.us-east-1.amazonaws.com/dev/user/register',
        { data: encryptedData.body.data }
      )
      .toPromise();
  };

  submitUser = async () => {
    const data = await this.encryptData();
    await this.registerUser(data);
    //this.router.navigate(['/users']);
  };
}
