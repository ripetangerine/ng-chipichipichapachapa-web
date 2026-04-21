import { Component, signal, WritableSignal } from "@angular/core";
import { BehaviorService } from "../service/behavior.service";
import { interval } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AsyncPipe, DatePipe } from "@angular/common";

// 

@Component({
  imports: [AsyncPipe, DatePipe],
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent {
  stackTimer = signal(0);

  chipiCatImagePath = signal("");
  dancingTime = signal(""); // 자리수 처리 0:00:00
  dancingTimeLongest = signal(""); // 움직이지 않는 시점에 긴지 확인후 넣기
  msMoveCount = signal(0);
  isMoving = signal(false);
  
  constructor(private behaviorService: BehaviorService) {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(()=>{
        this.stackTimer.update(v=>v+1);
      });
  }





  // TODO : sync stream 구현 
  ngOnInit() {
    this.behaviorService.status$.subscribe(data => {
      this.dancingTimeLongest = data.dacingTimeLongest as unknown as WritableSignal<string>;
    });

    

  }
}