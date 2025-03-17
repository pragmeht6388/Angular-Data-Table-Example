import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DummyService {

    users: any[] = [
      { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
      { id: 3, name: 'Robert Brown', email: 'robert.brown@example.com' }
      
  
    ];
  private arrayLengthSubject = new BehaviorSubject<number>(this.users.length); 
  constructor() { }

  addItem(item: any) {
    this.users.push(item);
    this.updateArrayLength();
  }
  getArrayLength$() {
    return this.arrayLengthSubject.asObservable();
  }

  private updateArrayLength() {
    this.arrayLengthSubject.next(this.users.length);
  }
}
