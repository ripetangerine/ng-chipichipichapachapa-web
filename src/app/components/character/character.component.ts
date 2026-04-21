import { Component, computed, effect, HostListener, inject, signal, WritableSignal } from "@angular/core";
import { BehaviorService } from "../service/behavior.service";
import { interval } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { AsyncPipe, DatePipe } from "@angular/common";


@Component({
  // imports: [AsyncPipe, DatePipe],
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent {
  
  // chipiCatImagePathEven = 'assets/chipiCatEven.jpg';
  // chipiCatImagePathOdd = 'assets/chipiCatOdd.jpg'
  
  // chipiCatImagePath = this.chipiCatImagePathOdd;
  // dancingTime = signal(""); // 자리수 처리 0:00:00
  // dancingTimeLongest = signal(""); // 움직이지 않는 시점에 긴지 확인후 넣기
  // msMoveCount = signal(0);
  // isMoving = signal(false);
  // stackTimer = signal(0);

  // private behaviorService = inject(BehaviorService);
  // constructor(private behaviorService: BehaviorService) { // 썌얘
  //   interval(1000)
  //     .pipe(takeUntilDestroyed())
  //     .subscribe(()=>{
  //       this.stackTimer.update(v=>{
  //         return v+1;
  //       });
  //     });
  // }

  private behaviorService = inject(BehaviorService);

  stackTimer = signal(0);
  isMoving = signal(false);

  dancingTime = computed(()=>{
    const sec = this.stackTimer();
    return `00:${Math.floor(sec/60)}:${(sec%60).toString().padStart(2, '0')}`;
  });

  dancingTimeLongest = signal(this.dancingTime || null);

  private stopEffect = effect(()=>{
    if(!this.isMoving()){
      this.dancingTimeLongest.update(v=>v>this.dancingTimeLongest()? v: this.dancingTimeLongest());
    }
  });

  

  //handler
  /**
   * stackTimer에 쌓일때
   * - 마우스 움직임 확인 (움직인다면 속도에 비례한 카운트 증가, 움직임 변수 활성화)
   * - 1초에 한번 치피캣 움직임 (사용자 빠르게 움직이면 얘도 0.5초에 한 번 움직임)
   * - dancingTime 증가
   * 
   * 움직임이 멈춘다면
   * - isMoving -> false
   * - dancingTime -> 0
   * - dancingTimeLongest 등록
   * - 치피캣 멈춤
   */




  // TODO : sync stream 구현 
  ngOnInit() {
    // this.behaviorService.status$.subscribe(data => {
    //   this.dancingTimeLongest = data.dacingTimeLongest as unknown as WritableSignal<string>;
    // });
  }
}