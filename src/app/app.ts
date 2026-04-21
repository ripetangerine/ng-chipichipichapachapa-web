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

  private moveTimeout:any;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent){
    console.log(e.clientX, e.clientY);
    this.behaviorService.updateMousePosition(e.clientX, e.clientY);
    this.behaviorService.updateStatusPosition({isMouseMoved:true, startMouseAt:Date.now().toString()});

    clearTimeout(this.moveTimeout); // TODO : 이거 확인
    this.moveTimeout = setTimeout(()=>{
      this.behaviorService.updateStatusIsMouseMoved(false);
    }, 2000)
  }
}
