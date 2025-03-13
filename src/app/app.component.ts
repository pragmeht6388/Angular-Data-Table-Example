import { Component } from '@angular/core';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <button (click)="modal.openModal()">Open Modal</button>
    <app-modal #modal></app-modal>
  `,
  imports: [ModalComponent],
})
export class AppComponent {}
