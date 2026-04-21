import { Component } from "@angular/core";
import { BehaviorService } from "../service/behavior.service";

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html'
})
export class CharacterComponent {
  message = '';

  constructor(private behaviorService: BehaviorService) {}

  ngOnInit() {
    this.behaviorService.behavior$.subscribe(data => {
      this.message = data.message;
    });
  }
}