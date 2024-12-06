import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SmileyComponent } from '../smiley/smiley.component';
import { TaskService } from '../task.service';
import { Taak } from '../taak/taak.module';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  tasks: Taak[] = [];

  constructor(protected taakService: TaskService) {
   }

  ngOnInit() {
    this.tasks = this.taakService.getTaken();
  }

  onTaskStatusChange() {
    this.taakService.setSmileyHumeur();
  }

  deleteTask(taskToDelete: Taak) {
    this.tasks = this.tasks.filter(task => task !== taskToDelete);
    this.taakService.taak = this.tasks;
    this.taakService.setSmileyHumeur();
  }


}
