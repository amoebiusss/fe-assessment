import { Injectable } from '@angular/core';

import { User } from '../interfaces';

const USER_ID_KEY = 'USER_ID';

const MOCK_USER_DATA: User[] = [{
  _id: 1,
  id: 'MM12345',
  name: 'Matthias',
  surname: 'Maurer',
  agency: 'ESA',
  email: 'matthias.maurer@esa.com',
  phoneNumber: '+49 1111 1111',
  social: {
    title: 'wikipedia page',
    link: '#',
  }
},
{
  _id: 2,
  id: 'MM12332',
  name: 'Matthias2',
  surname: 'Maurer2',
  agency: 'ESA',
  email: 'matthias.maurer2@esa.com',
  phoneNumber: '+49 1111 1111',
  social: {
    title: 'wikipedia page',
    link: '#',
  }
}];

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  mockUsers = MOCK_USER_DATA;

  getData() {
    const data = localStorage.getItem(USER_ID_KEY);
    if (data) {
      return JSON.parse(data as string);
    }
  }

  setData(id: string): void {
    localStorage.setItem(USER_ID_KEY, JSON.stringify({ id }));
  }

  clearData() {
    localStorage.removeItem(USER_ID_KEY);
  }

  getUser(id: number): User {
    return this.mockUsers.find(user => user._id === +id) || {} as User;
  }
}
