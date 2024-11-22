import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly TODO_FOLDER = 'ToDoList';
  private readonly Extension = '.txt';

  constructor() { }

  async ensureTodoDirectory() {
    try {
      await Filesystem.readdir({
        path: this.TODO_FOLDER,
        directory: Directory.Documents
      });
    } catch {
      // Directory doesn't exist, create it
      await Filesystem.mkdir({
        path: this.TODO_FOLDER,
        directory: Directory.Documents,
        recursive: true
      });
    }
  }

  async writeFile(data: any, fileName: string) {
    await this.ensureTodoDirectory();
    const encoded = JSON.stringify(data) as string;
    const txtFileName = fileName.endsWith(this.Extension) ? fileName : fileName + this.Extension;
    const filepath = this.TODO_FOLDER + '/' + txtFileName ;
    await Filesystem.writeFile({
      path: filepath,
      data: encoded,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
  }
  
  async readFile(fileName: string) {
    const txtFileName = fileName.endsWith(this.Extension) ? fileName : fileName + this.Extension;
    const filepath = this.TODO_FOLDER + '/' + txtFileName ;
    const contents = await Filesystem.readFile({
      path: filepath,
      directory: Directory.Documents,
      encoding: Encoding.UTF8
    });
    return JSON.parse(contents.data as string);
  }

  async listFiles() {
    const result = await Filesystem.readdir({
        path: this.TODO_FOLDER,
        directory: Directory.Documents
    });
    return result.files.filter(file => file.name.endsWith(this.Extension));
  }
}
