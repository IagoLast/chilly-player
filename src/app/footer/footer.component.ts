import { PlayerService } from '../player.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  public state = -1;
  public text: String = '';

  public time;
  public duration;

  constructor(private playerService: PlayerService, ref: ChangeDetectorRef) {
    this.playerService.state.subscribe(value => {
      this.state = value;
      this.duration = playerService.getDuration();
      ref.detectChanges()
    });
    this.playerService.text.subscribe(value => {
      this.text = value;
      ref.detectChanges();
    });
    this.playerService.percentage.subscribe(value => {
      if (this.playerService.getPlayerState() !== this.playerService.STATES.BUFFERING) {
        this.time = value;
        ref.detectChanges();
      }
    })
  }

  play() {
    this.playerService.play();
  }

  pause() {
    this.playerService.pause();
  }

  onClick($event) {
    const offsetWidth = $event.currentTarget.offsetWidth;
    const offset = $event.offsetX;
    const percentage = (offset / offsetWidth);
    const seconds = this.playerService.getDuration() * percentage;
    this.playerService.seekTo(seconds);
  }

  displayPause() {
    switch (this.playerService.getPlayerState()) {
      case this.playerService.STATES.PLAYING:
      case this.playerService.STATES.BUFFERING:
        return true;
      default:
        return false;
    }
  }
}
