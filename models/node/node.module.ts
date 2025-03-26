import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class NodeModule {}

export interface Node {
  id: string | number;
  name: string;
  data: any; // Your custom data
  expiresAt: string; // ISO timestamp
}


