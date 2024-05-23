import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { longOperation } from 'src/app/long-operation';
// import * from "../../app.worker"
@Component({
  selector: 'app-web-worker',
  templateUrl: './web-worker.component.html',
  styleUrls: ['./web-worker.component.css']
})
export class WebWorkerComponent implements OnInit, AfterViewInit {

  result: string = '0';
  resultWebWorker = '0';
  sliderTranslate = 'translateX(0px)';
  private animation = {
    translate: 0,
    rightDirection: true
  };

  constructor(private cd: ChangeDetectorRef){

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(this.animateFrame.bind(this))
  }

  private animateFrame(): void {
    this.animation.translate = this.animation.rightDirection ?
                                this.animation.translate + 5 :
                                this.animation.translate - 5;

    if (this.animation.translate > (window.innerWidth * 0.2) + 40) {
      this.animation.rightDirection = false;
    } else if (this.animation.translate < 0){
      this.animation.rightDirection = true;
    }
    this.sliderTranslate = `translateX(${this.animation.translate}px)`;
    requestAnimationFrame(this.animateFrame.bind(this));
  }

  async handleLongOperation(isWebWorker: boolean): Promise<void> {
    if(!isWebWorker){
      this.result = '0';
      this.cd.detectChanges();
      this.result = longOperation(5000);
    } else {
      this.resultWebWorker = '0';
      if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker(new URL('../../app.worker', import.meta.url));
        worker.onmessage = ({ data }) => {
          console.log(`page got message: ${data}`);
          this.resultWebWorker = data;
        };
        worker.postMessage(5000);
      } else {
        // Web Workers are not supported in this environment.
        // You should add a fallback so that your program still executes correctly.
      } 
    }
  }

}
