import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {
  private behaviorSubject = new BehaviorSubject({
    clickCount: 0,
    message: '얌전히 있어라'
  });
  private mousePosition = new BehaviorSubject({x: 0, y: 0});

  // 사용자가 계속 움직이는지 확인

  behavior$ = this.behaviorSubject.asObservable();
  mouse$ = this.mousePosition.asObservable();

  // increaseClick() {
  //   const current = this.behaviorSubject.value;
  //   const newState = {
  //     clickCount: current.clickCount + 1,
  //     message: current.clickCount > 5 
  //       ? '좀 그만해…' 
  //       : '좋다 더 눌러봐'
  //   };
  //   this.behaviorSubject.next(newState);
  // }

  updateMouse(x: number, y: number){
    this.mousePosition.next({x, y});
  }

  // ngOnInit() {
  
  // }
}