import { AfterViewInit, Component, OnInit } from '@angular/core';
import { longOperation } from './long-operation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, OnInit {


  title = 'web-worker';

  result: string = '0';
  sliderTranslate = 'translateX(0px)';
  private animation = {
    translate: 0,
    rightDirection: true
  };

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

  async handleLongOperation(): Promise<void> {
    // this.result = await this.client.call(w => w.doLongOperation());
    this.result = longOperation(5000);
    
    
    // if (typeof Worker !== 'undefined') {
    //   // Create a new
    //   const worker = new Worker(new URL('./app.worker', import.meta.url));
    //   worker.onmessage = ({ data }) => {
    //     console.log(`page got message: ${data}`);
    //     this.result = data;
    //   };
    //   worker.postMessage(5000);
    // } else {
    //   // Web Workers are not supported in this environment.
    //   // You should add a fallback so that your program still executes correctly.
    // }
  }

}

// if (typeof Worker !== 'undefined') {
//   // Create a new
//   const worker = new Worker(new URL('./app.worker', import.meta.url));
//   worker.onmessage = ({ data }) => {
//     console.log(`page got message: ${data}`);
//   };
//   worker.postMessage('hello');
// } else {
//   // Web Workers are not supported in this environment.
//   // You should add a fallback so that your program still executes correctly.
// }