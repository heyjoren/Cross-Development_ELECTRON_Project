import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class Taak { 
  
  id?: string;
  toDo: string;
  beschrijving?: string;
  done: boolean;

  constructor() {
    this.id = '';
    this.toDo = '';
    this.beschrijving = '';
    this.done = false;
  }
}
