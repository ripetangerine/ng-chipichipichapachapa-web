import { Component } from "@angular/core";
import { BehaviorService } from "../service/behavior.service";
import { interval } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AsyncPipe, DatePipe } from "@angular/common";

@Component({
  imports: [AsyncPipe, DatePipe],
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent {
  constructor(private behaviorService: BehaviorService) {
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(()=>{
        
      });
  }

  message = '';

  chipiCatImagePath = "";
  dancingTime = ""; // 자리수 처리 0:00:00
  dancingTimeLongest = ""; // 움직이지 않는 시점에 긴지 확인후 넣기
  msMoveCount = 0;


  // TODO : sync stream 구현 
  ngOnInit() {
    this.behaviorService.behavior$.subscribe(data => {
      this.message = data.message;
    });


  }
}