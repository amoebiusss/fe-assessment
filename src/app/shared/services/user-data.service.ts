import { Injectable } from '@angular/core';

const USER_ID_KEY = 'USER_ID';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  getData() {
    const data = localStorage.getItem(USER_ID_KEY);
    if (data) {
      return JSON.parse(data as string);
    }
  }

  setData(data: { id?: string, name?: string, notFound?: boolean, image?: string }): void {
    const { id, name, notFound, image } = data;
    localStorage.setItem(USER_ID_KEY, JSON.stringify({ id, name, notFound, image }));
  }

  clearData() {
    localStorage.removeItem(USER_ID_KEY);
  }

  getRandomUserId(userIds: string[] = []): string {
    const randomIndex = Math.floor(Math.random() * userIds.length);
    return userIds[randomIndex];
  }
}
