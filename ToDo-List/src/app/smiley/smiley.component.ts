import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-smiley',
  templateUrl: './smiley.component.html',
  styleUrls: ['./smiley.component.scss'],
  standalone: true,
})
export class SmileyComponent  implements AfterViewInit {
  @ViewChild('outerCirkleSmiley', {static: false}) canvasRef!: ElementRef<HTMLCanvasElement> 
  private ctx!: CanvasRenderingContext2D;

  private red: string = 'rgb(255,0,0)';
  private green: string = 'rgb(173,255,47)';
  private yellow: string = 'rgb(255,255,0)';
  private orange: string = 'rgb(255,165,0)';
  private black: string = 'rgb(0,0,0)';
  private white: string = 'rgb(255,255,255)';
  
  humeur: string = 'default';
  private humeurSubscription!: Subscription;


  constructor(private taskService: TaskService) { }

  ngOnInit() {}


  ngAfterViewInit(): void
  {
    this.humeurSubscription = this.taskService.humeurSubject.subscribe( humeur => {
      this.humeur = humeur;
      this.tekenSmiley();
    });
    this.tekenSmiley();

  }

  ngOnDestroy(): void {
    if (this.humeurSubscription) {
      this.humeurSubscription.unsubscribe();
    }
  }


  tekenSmiley()
  {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;

    // leeg maken canvas
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Buitenkand
    this.ctx.beginPath();

    if(this.humeur == 'default')
    this.ctx.fillStyle = this.yellow;
    if(this.humeur == 'blij')
    this.ctx.fillStyle = this.green;
    if(this.humeur == 'neutraal')
      this.ctx.fillStyle = this.orange;
    if(this.humeur == 'sip')
      this.ctx.fillStyle = this.red;

    // this.ctx.arc(x, y, r, start angel, end angel);
    this.ctx.arc(canvas.width/2, canvas.height/2, 60, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    // Mond
    this.mondTekenen(canvas);

    // ogen
    this.ogenTekenen(canvas);
  }

  mondTekenen(canvas: HTMLCanvasElement)
  {
    this.ctx.lineWidth = 2;
    // Blij
    if (this.humeur == 'blij' || this.humeur == 'default')
    {
      this.ctx.beginPath();
      // this.ctx.arc(x, y, r, start angel, end angel);
      this.ctx.arc(canvas.width/2, canvas.height/2, 40, Math.PI, 0, true);
      this.ctx.stroke();
      this.ctx.closePath();
    }
    if (this.humeur == 'neutraal')
      {
        this.ctx.beginPath();
        this.ctx.moveTo(canvas.width/2 - 35, canvas.height/2 + 20)
        this.ctx.lineTo(canvas.width/2 + 35, canvas.height/2 + 20);
        this.ctx.stroke();
        this.ctx.closePath();
      }
      if (this.humeur == 'sip')
        {
          this.ctx.beginPath();
          // this.ctx.arc(x, y, r, start angel, end angel);
          this.ctx.arc(canvas.width/2, canvas.height/2 + 35, 35, 0, Math.PI, true);
          this.ctx.stroke();
          this.ctx.closePath();
        }
 
    this.ctx.lineWidth = 1;
  }

  ogenTekenen(canvas: HTMLCanvasElement)
  {
    // ogen links
    this.ctx.beginPath();
    this.ctx.fillStyle = this.white;
    // this.ctx.ellipse(x, y, xradius, yradius, rotation, Math.PI, 0, true);
    this.ctx.ellipse(canvas.width/2 - 20, canvas.height/2 - 20, 10, 15,0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    // ogen rechts
    this.ctx.beginPath();
    this.ctx.fillStyle = this.white;
    // this.ctx.ellipse(x, y, xradius, yradius, rotation, Math.PI, 0, true);
    this.ctx.ellipse(canvas.width/2 + 20, canvas.height/2 - 20, 10, 15,0, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
    this.ctx.closePath();

    if(this.humeur == 'sip')
    {
      // pupil links
      this.ctx.beginPath();
      this.ctx.fillStyle = this.black;
      // this.ctx.arc(x, y, r, start angel, end angel);
      this.ctx.arc(canvas.width/2 - 20, canvas.height/2 - 15, 2, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();

      // pupil rechts
      this.ctx.beginPath();
      this.ctx.fillStyle = this.black;
      // this.ctx.arc(x, y, r, start angel, end angel);
      this.ctx.arc(canvas.width/2 + 20, canvas.height/2 - 15, 2, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
    else{
      // pupil links
      this.ctx.beginPath();
      this.ctx.fillStyle = this.black;
      // this.ctx.arc(x, y, r, start angel, end angel);
      this.ctx.arc(canvas.width/2 - 20, canvas.height/2 - 20, 2, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();

      // pupil rechts
      this.ctx.beginPath();
      this.ctx.fillStyle = this.black;
      // this.ctx.arc(x, y, r, start angel, end angel);
      this.ctx.arc(canvas.width/2 + 20, canvas.height/2 - 20, 2, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.closePath();
    }
        
  }

}
