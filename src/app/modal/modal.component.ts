import { Component } from '@angular/core';
import { BackdropComponent } from '../backdrop/backdrop.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-modal',
  standalone: true,
  template: `
    <app-backdrop *ngIf="isVisible" (click)="closeModal()"></app-backdrop>
    <div class="modal-content" *ngIf="isVisible">
      <h1>Modal Title</h1>
      <p>This is a modal with a backdrop.</p>
      <button (click)="closeModal()">Close</button>
    </div>
  `,
  styleUrls: ['./modal.component.css'],
  imports: [BackdropComponent,CommonModule], // Import the backdrop component
})
export class ModalComponent {
  isVisible = false;

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }
}
