import { Component, computed, effect, inject, signal, OnDestroy, OnInit} from "@angular/core";
import { BehaviorService } from "../service/behavior.service";
import { interval } from "rxjs";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { AsyncPipe, DatePipe } from "@angular/common";


@Component({
  // imports: [AsyncPipe, DatePipe],
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent implements OnDestroy, OnInit{
  // chipiCatImagePathEven = 'assets/chipiCatEven.jpg';
  // chipiCatImagePathOdd = 'assets/chipiCatOdd.jpg'

  // chipiCatImagePath = this.chipiCatImagePathOdd;
  // dancingTime = signal(""); // 자리수 처리 0:00:00
  // maxDancingTime = signal(""); // 움직이지 않는 시점에 긴지 확인후 넣기
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
  dancingTime = signal(0); // 현재 유저가 연달아서 춤추고 있는 시간
  maxDancingTime = signal(0);

  DancingTimeComputed = computed(()=>{
    const sec = this.stackTimer();
    return `00:${Math.floor(sec/60)}:${(sec%60).toString().padStart(2, '0')}`;
  });


  private mouseStopEffect = effect(()=>{ // movingFalse일때의 로직
    if(!this.isMoving()){
      const currentDanceTime = this.stackTimer();
      if(currentDanceTime > this.maxDancingTime()){
        this.maxDancingTime.set(currentDanceTime);
      }
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
   * - maxDancingTime 등록
   * - 치피캣 멈춤
   */




  // TODO : sync stream 구현
  ngOnInit(): void{
    // this.behaviorService.status$.subscribe(data => {
    //   this.maxDancingTime = data.dacingTimeLongest as unknown as WritableSignal<string>;
    // });
    const userBehaviorStatus = toSignal(this.behaviorService.status$);
    const userBehaviorMousePosition = toSignal(this.behaviorService.mousePosition$);
    interval(1000)
      .pipe(takeUntilDestroyed())
      .subscribe(()=>this.stackTimer.update((v)=>v+1));

  }

  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
}