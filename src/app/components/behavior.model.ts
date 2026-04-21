import { NgModule } from "@angular/core";
import { CharacterComponent } from "./character/character.component";
import { BrowserModule } from "@angular/platform-browser";
import { App } from "../app";

@NgModule({
  declarations: [CharacterComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [App]
})
export class AppModule {}