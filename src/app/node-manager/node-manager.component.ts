import { Component } from '@angular/core';
import { CarDataService } from '../services/node-storage.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-node-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './node-manager.component.html',
  styleUrl: './node-manager.component.css'
})
export class NodeManagerComponent {
  makes: any[] = [];
  models: any[] = [];
  selectedMakeId: number = 0;
  selectedModelId: number = 0;
  flag = false;

  constructor(private carDataService: CarDataService) {}

  ngOnInit(): void {
    this.loadMakes();
  }

  loadMakes() {
    this.carDataService.getMakes().subscribe({
      next: (makes) => {
        this.makes = makes;
      },
      error: (err) => {
        console.error('Error loading makes:', err);
      }
    });
  }

  onSelectMake(event: any): void {
    this.selectedMakeId = +event.target.value;
    if (this.selectedMakeId > 0) {
      this.loadModels(this.selectedMakeId);
    } else {
      this.models = [];
    }
  }

  loadModels(makeId: number) {
    this.carDataService.getModels(makeId).subscribe({
      next: (models) => {
        this.models = models;
      },
      error: (err) => {
        console.error('Error loading models:', err);
      }
    });
  }

  onSelectModel(event: any): void {
    this.selectedModelId = +event.target.value;
  }

  show() { this.flag = true; }
  back() { this.flag = false; }
}
