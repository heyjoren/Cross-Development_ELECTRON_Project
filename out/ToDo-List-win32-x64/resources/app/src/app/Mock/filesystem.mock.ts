import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileSystemMock {
  async readFile(options: { path: string }): Promise<{ data: string }> {
    return { data: 'mock file content' };
  }

  async writeFile(options: { 
    path: string, 
    data: string, 
    recursive?: boolean 
  }): Promise<void> {
    console.log('Mock writing file:', options);
    return Promise.resolve();
  }

  async mkdir(options: { 
    path: string, 
    recursive?: boolean 
  }): Promise<void> {
    console.log('Mock creating directory:', options);
    return Promise.resolve();
  }

  async rmdir(options: { 
    path: string, 
    recursive?: boolean 
  }): Promise<void> {
    console.log('Mock removing directory:', options);
    return Promise.resolve();
  }
}