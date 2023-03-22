import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserServices {
  constructor(private http: HttpClient) {}

  getList = () => {
    return this.http.get<string>(
      'https://ja4j8mqyia.execute-api.us-east-1.amazonaws.com/dev/users/listUser '
    );
  };

  decryptData = (data: string) => {
    return this.http.post(
      ' https://ja4j8mqyia.execute-api.us-east-1.amazonaws.com/dev/security/decrypt',
      data
    );
  };

  encryptData = (userData: any) => {
    return this.http.post(
      'https://ja4j8mqyia.execute-api.us-east-1.amazonaws.com/dev/security/encrypt',
      { data: userData }
    );
  };

  registerUser = (encryptedData: any) => {
    return this.http.post(
      'https://d4qo4rsz5l.execute-api.us-east-1.amazonaws.com/dev/user/register',
      { data: encryptedData.body.data }
    );
  };
}
