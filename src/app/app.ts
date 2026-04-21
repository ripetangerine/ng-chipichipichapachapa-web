import { Component, HostListener, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorService } from './components/service/behavior.service';
import { CharacterComponent } from './components/character/character.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [RouterOutlet, CharacterComponent],
})
export class App {
  protected readonly title = signal('first-chipi-ng');

  constructor(private behaviorService: BehaviorService){}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent){
    console.log(e.clientX, e.clientY);
    this.behaviorService.updateMousePosition(e.clientX, e.clientY);
  }

  // @HostListener('document:click', ['$event'])
  // onClick(e: MouseEvent){
  //   console.log(`clicked in : ${e.clientX, e.clientY}`);
  // }
}
