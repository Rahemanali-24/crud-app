

import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly STORAGE_KEY = 'users';

  constructor() {
    this.initializeLocalStorage();
   } 


  getUsers(): User[] {
    const usersString = localStorage.getItem(this.STORAGE_KEY);
    if (usersString !== null) {
      return JSON.parse(usersString);
    } else {
      return [];
    }
  }
 

  addUser(user: User): void {
    const users = [...this.getUsers()];
    console.log('Existing users:', users); // Debug statement
    users.push(user);
    console.log('New users:', users); // Debug statement
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
    console.log('Users added to local storage:', users); // Debug statement
  }

  
  deleteUser(userId: number): void {
    let users = [...this.getUsers()];
    users = users.filter(user => user.id !== userId);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  updateUser(updatedUser: User): void {
    const users = this.getUsers();
    const index = users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      users[index] = { ...updatedUser }; 
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
     }
  }

  initializeLocalStorage(): void {
    const existingUsers = this.getUsers();
    if (existingUsers.length === 0) {
      const initialUsers: User[] = [
        { id: 1, name: 'John', email: 'john@example.com' },
      ];
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialUsers));
      console.log('Local storage initialized with initial users:', initialUsers); 
    }
  }
  saveUsers(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

}
