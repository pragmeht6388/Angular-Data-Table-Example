import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DummyService } from './dummy.service';


export interface User {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
 
  title = 'dummy';
  flag:boolean=false
  ct:number=0;
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Robert Brown', email: 'robert.brown@example.com' },
    { id: 4, name: 'Alice Johnson', email: 'alice.johnson@example.com' },
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
    { id: 3, name: 'Robert Brown', email: 'robert.brown@example.com' },
    { id: 4, name: 'Alice Johnson', email: 'alice.johnson@example.com' },

  ];

  constructor(private arrayService:DummyService)
  {
    
  }
  ngOnInit(): void {
    // Subscribe to the array length observable
    this.arrayService.getArrayLength$().subscribe(length => {
      this.ct = length;
    });
  }
   abc = {
    id: '4',
    name: 'saumya',
    email: 'saumya@gmail.com'
  }
  add(){
    this.arrayService.addItem(this.abc)
  }

  // Function to delete a user from the table
  deleteUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }
}
