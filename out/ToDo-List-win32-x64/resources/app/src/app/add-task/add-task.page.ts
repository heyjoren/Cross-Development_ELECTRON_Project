import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Taak } from '../taak/taak.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.page.html',
  styleUrls: ['./add-task.page.scss'],
})
export class AddTaskPage implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private taakService: TaskService, private router: Router ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'todo': ['', Validators.required],
      'beschrijving': [''],
    });
  }
  addTask(){
    if(this.form.valid)
    {
      let newTaak = new Taak();

      newTaak.toDo = this.form.value.todo;
      newTaak.beschrijving = this.form.value.beschrijving;

      this.taakService.SetTaak(newTaak);
      this.router.navigate(['/tab/overview']);

      this.form.reset();
      console.log(this.taakService.getTaken());
      this.taakService.setSmileyHumeur();

    }

  }
}
