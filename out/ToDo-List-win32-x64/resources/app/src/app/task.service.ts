import { Inject, Injectable } from '@angular/core';
import { Taak } from './taak/taak.module';
import { BehaviorSubject, Subject } from 'rxjs';
import { FileSystemMock } from './Mock/filesystem.mock';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  taak: Taak [] = [];
  humeurSubject = new Subject<string>;

  // constructor() { }
  constructor(@Inject('FileSystem') private fileSystem: FileSystemMock) {}

  SetTaak(newTask: Taak)
  {
    this.taak.push(newTask);
  }

  getTaken(): Taak[]
  {
    return this.taak;
  }

  getDoneCount(): number {
    return this.taak.filter(task => task.done).length;
  }

  setSmileyHumeur()
  {
    const procent: number = (this.getDoneCount() / this.taak.length) * 100;
    let humeur: string =  "default";

    if(procent < 40)
    {
      humeur = 'sip'
    }
    else if(procent >= 40 && procent <= 60)
    {
      humeur = 'neutraal'
    }  
    else if(procent > 60)
    {
      humeur = 'blij'
    }

    this.humeurSubject.next(humeur);
  }

  async readSampleFile() {
    const result = await this.fileSystem.readFile({ path: '/sample.txt' });
    console.log(result.data);
  }

}
