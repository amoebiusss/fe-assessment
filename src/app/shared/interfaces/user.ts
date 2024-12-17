export interface User {
    _id: number;
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