import { Component } from '@angular/core';

export interface User {
  id: string;
  name: string;
  surname: string;
  agency: string;
  email: string;
  phoneNumber: string;
  social: {
    title: string;
    link: string;
  }
};

@Component({
  selector: 'app-profile-details',
  imports: [],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.scss'
})
export class ProfileDetailsComponent {
  user: User = {
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
  };
}
