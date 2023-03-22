import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServices } from 'src/services/users.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent {
  isDisabled: boolean = true;
  patternValidator = Validators.pattern(/^[a-zA-Z\s]*$/);

  constructor(private userServices: UserServices, private router: Router) {}

  rfcNumber = -1;

  data = {
    correo_electronico: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    nombre: '',
    origen: 3,
    rfc: `ROLA900320N${this.rfcNumber}`,
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

  getRfcNumber = async () => {
    const list = await lastValueFrom(this.userServices.getList());
    const decryptedData: any = await lastValueFrom(
      this.userServices.decryptData(list)
    );
    this.rfcNumber = decryptedData.body.data.items[0].usuariosLista.length + 1;
  };

  submitUser = async () => {
    this.getRfcNumber();
    const data = await lastValueFrom(this.userServices.encryptData(this.data));
    await lastValueFrom(this.userServices.registerUser(data));
    this.router.navigate(['/users']);
  };
}
