import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorService } from './components/service/behavior.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('first-chipi-ng');

  constructor(private behaviorService: BehaviorService){}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent){
    console.log(e.clientX, e.clientY);
    this.behaviorService.updateMouse(e.clientX, e.clientY);
  }

  @HostListener('document:click', ['$event'])
  onClick(e: MouseEvent){
    console.log(`clicked in : ${e.clientX, e.clientY}`);
  }
}
