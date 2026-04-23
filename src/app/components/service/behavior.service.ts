import { Injectable, signal } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  private _mousePosition = new BehaviorSubject({
    x: 0,
    y: 0
  });
  private _statusPosition = new BehaviorSubject({
    startMouseAt: "",
    dacingTimeLongest: "",
    isMouseMoved: false,
  });

  status$ = this._statusPosition.asObservable();
  mousePosition$ = this._mousePosition.asObservable();

  _currentMousePos = this._mousePosition;
  _formerMousePos = this._mousePosition;
  isMouseMoved = signal(false); // false

  init(){
    console.log(`date: ${Date.now} | mov: ${this._mousePosition}`);
    // console.log(``)
  }

  updateMousePosition(x: number, y: number){
    this._mousePosition.next({x, y});
    this._currentMousePos.next({x, y}); // TODO : 형 참조 오류 확인
    this.isMouseMoved.set(this.isChangedMove(x, y));
  }

  isChangedMove(x: number, y: number) : boolean {
    if(this._currentMousePos.value.x === this._formerMousePos.value.x && this._formerMousePos.value.y === this._currentMousePos.value.y){
      return true;
    }
    else if( x+10 > x && x > x-10 || y+10 > y && y > y-10){ // 마우스 얼마 움직지 않았다면
      this._currentMousePos.next({x,y});
      this._formerMousePos.next({x,y});
      return true;
    }
    return false;
  }

  updateStatusPosition({isMouseMoved, startMouseAt}: {isMouseMoved:boolean, startMouseAt:string}){
    this.isMouseMoved.set(isMouseMoved);
    this._statusPosition.value.isMouseMoved = this.isMouseMoved();
    this._statusPosition.value.startMouseAt = startMouseAt;
  }

  updateStatusIsMouseMoved(isMouseMoved: boolean){
    this.isMouseMoved.set(isMouseMoved);
    this._statusPosition.value.isMouseMoved = this.isMouseMoved();
  }


}