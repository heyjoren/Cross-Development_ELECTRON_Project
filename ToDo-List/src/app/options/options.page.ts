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
    const fileInfos = await this.fileService.listFiles();
    this.files = fileInfos.map(fileInfo => fileInfo.name);
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
      // You might want to add a toast or alert here
      return;
    }
    
    try {
      await this.fileService.writeFile(this.taakService.getTaken(), this.fileName);
      // this.isSaveModalOpen = false;
      this.cancel();
      this.fileName = '';
      // this.router.navigate(['/tab/overview']);
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }

  async saveExistingFile(selectedFile: string) {    
    try {
      await this.fileService.writeFile(this.taakService.getTaken(), selectedFile);
      // this.isSaveModalOpen = false;
      this.cancel();
      selectedFile = '';
      // this.router.navigate(['/tab/overview']);
      // this.navCtrl.navigateRoot('/tab/overview');
    } catch (error) {
      console.error('Error saving file:', error);
    }
  }

  async loadFile(selectedFile: string) {
    try {
      const data = await this.fileService.readFile(selectedFile);
      
      // Validate if data is in correct format (array of Taak objects)
      if (Array.isArray(data) && data.every(item => 'toDo' in item && 'done' in item)) {
        // Add tasks to TaskService
        data.forEach(task => {
          this.taakService.SetTaak(task);
        });
        this.taakService.setSmileyHumeur();
        this.cancel();
      } else {
        throw new Error('Invalid file format');
      }
    } catch (error) {
      // Show error message to user
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Could not load file. Invalid format.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

}
