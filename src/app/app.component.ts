import { PlayerService } from './player.service';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @HostListener('window:keydown.space', ['$event'])
  doSomething($event) {
    if($event.target === document.body){
      event.preventDefault();
      this.playerService.toggle();
    }
  }
  constructor(private playerService: PlayerService) { }
}
