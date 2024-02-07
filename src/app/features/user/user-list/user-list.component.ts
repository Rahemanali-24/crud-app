import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  newUser: User = { id: 0, name: '', email: '' }; 
  editingUser: User | null = null; 
  searchQuery: string = '';
  isEditModalOpen: boolean = false;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users = this.localStorageService.getUsers();
    console.log('Loaded users:', this.users); 

  }

  

  addUser(): void {
    console.log('Adding user:', this.newUser); 
    this.newUser.id = this.generateUniqueId();

    this.localStorageService.addUser(this.newUser);
    this.loadUsers(); 
    this.newUser = { id: 0, name: '', email: '' }; 
  }
  deleteUser(userId: number): void {
    this.localStorageService.deleteUser(userId);
    this.loadUsers(); 
  }
 

  editUser(user: User): void {
    if (this.editingUser && this.editingUser.id === user.id) {
      this.editingUser = null;
    } else {
      this.editingUser = { ...user }; 
    }
  }


  updateUser(): void {
    if (this.editingUser) {
      const index = this.users.findIndex(user => user.id === this.editingUser!.id);
      if (index !== -1) {
        this.users[index] = { ...this.editingUser }; 
        this.localStorageService.updateUser(this.editingUser);
        this.localStorageService.saveUsers(this.users);
        this.editingUser = null; 
      }
    }
  }

  generateUniqueId(): number {
 
    return Date.now();
  }

  searchUsers(): void {
    if (this.searchQuery.trim() !== '') {
      const filteredUsers = this.users.filter(user =>
        user.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.users = filteredUsers.length > 0 ? filteredUsers : []; 
    } else {
      // If the search query is empty, restore the original list of users
      console.log('Reloading original list of users...');
      this.loadUsers();
      console.log('Original list of users reloaded:', this.users);
    }
  }
  
  
}
