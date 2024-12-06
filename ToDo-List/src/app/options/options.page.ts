import { Component, OnInit } from '@angular/core';
import { FileService } from '../file.service';
import { Directory, FileInfo } from '@capacitor/filesystem';
import { TaskService } from '../task.service';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-options',
  templateUrl: 'options.page.html',
  styleUrls: ['options.page.scss']
})
export class Options implements OnInit {

  isSaveModalOpen = false;
  fileName = '';
  isLoadModalOpen = false;
  files: string[] = [];

  constructor(private fileService: FileService, private taakService: TaskService, private alertController: AlertController,
    private platform: Platform, private navCtrl: NavController, private router: Router
  ) {}

  async ngOnInit() {
    await this.loadFileList();
    this.loadFileList();

    // Subscribe to the back button event
    this.platform.backButton.subscribe(() => {
      console.log("back button pressed");
      this.cancel();
    });
  }

  async loadFileList() {
    const files = await window.api.getFiles();
    this.files = files;
  }

  presentSaveModal() {
    this.loadFileList();
    this.isSaveModalOpen = true;
  }

  presentLoadModal() {
    this.loadFileList();
    this.isLoadModalOpen = true;
  }

  cancel() {
    this.isSaveModalOpen = false;
    this.isLoadModalOpen = false;
    this.fileName = '';
  }

  async saveFile() {
    if (!this.fileName) {
      return;
    }
    const content = this.taakService.getTaken();
    window.api.writeFiles(this.fileName, content);    
    this.cancel();
    this.fileName = '';
  }

  async saveExistingFile(selectedFile: string) {    
    try {
      const content = this.taakService.getTaken();
      window.api.writeFiles(selectedFile, content);    

      this.cancel();
      selectedFile = '';
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }

  async loadFile(selectedFile: string) {
    try {
      // const data = await this.fileService.readFile(selectedFile);
      const data = await window.api.readFile(selectedFile);
      if(data.error)
      {
        throw new Error(data.error)
      }
      
      // Validate if data is in correct format (array of Taak objects)
      if (Array.isArray(data.content) && data.content.every(item => 'toDo' in item && 'done' in item)) {
        // Add tasks to TaskService
        data.content.forEach(task => {
          this.taakService.SetTaak(task);
        });
        this.taakService.setSmileyHumeur();
        this.cancel();
      } else {
        throw new Error('Invalid file format');
      }
    } catch (error) {
      // Show error message to user.
      console.log("error: " + error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Could not load file. Invalid format.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
