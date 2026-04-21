import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  private mousePosition = new BehaviorSubject({x: 0, y: 0});
  mouse$ = this.mousePosition.asObservable();
  formerMousePos = this.mousePosition;
  currentMousePos = this.mousePosition;
  
  isMouseMoved = signal(false); // false
  
  private statusPosition = new BehaviorSubject({
    dacingTimeLongest: "",
    isMouseMoved: this.isMouseMoved ?? false,
  });
  status$ = this.statusPosition.asObservable();
  

  updateMousePosition(x: number, y: number){
    this.mousePosition.next({x, y});
    this.currentMousePos.next({x, y}); // TODO : 형 참조 오류 확인
    this.isMouseMoved.set(this.isChangedMove(x, y));
    // this.isMouseMoved.update(prev => this.isChangedMove(x, y))
  }

  isChangedMove(x: number, y: number) : boolean {
    if(this.currentMousePos.value.x === this.formerMousePos.value.x && this.formerMousePos.value.y === this.currentMousePos.value.y){
      return true;
    }
    else if( x+10 > x && x > x-10 || y+10 > y && y > y-10){ // 마우스 얼마 움직지 않았다면
      this.currentMousePos.next({x,y}); 
      this.formerMousePos.next({x,y});
      return true;
    }
    return false;
  }

  // ngOnInit() {
  
  // }
}