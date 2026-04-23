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

  constructor(
    private readonly _behaviorService: BehaviorService
  ){}

  private moveTimeout:any;

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent){
    console.log(e.clientX, e.clientY);
    this._behaviorService.updateMousePosition(e.clientX, e.clientY);
    this._behaviorService.updateStatusPosition({isMouseMoved:true, startMouseAt:Date.now().toString()});

    clearTimeout(this.moveTimeout); // TODO : 이거 확인
    this.moveTimeout = setTimeout(()=>{
      this._behaviorService.updateStatusIsMouseMoved(false);
    }, 2000);
  }

  ngOnInit(){
    this._behaviorService.init();
  }

  // ngOnDestory(){
  //   this._behaviorService.destory();
  // }
}
