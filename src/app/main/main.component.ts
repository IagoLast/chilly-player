import { PlayerService } from '../player.service';
import { MainService } from './main.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { YoutubeService } from '../youtube.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  public showSpinner: Boolean = true;
  public tracks = [];

  constructor(private playerService: PlayerService, private youtubeService: YoutubeService, private mainService: MainService, ref: ChangeDetectorRef) {
    this.mainService.tracks.subscribe(tracks => {
      this.tracks = tracks;
      ref.detectChanges();
    });
    this.mainService.showSpinner.subscribe(value => {
      this.showSpinner = value;
      ref.detectChanges();
    });
  }

  ngOnInit() {

  }

  playTrack(name) {
    this.playerService.hack();
    this.youtubeService.loadVideo(name).subscribe(videoId => {
      this.playerService.loadTrack(name, videoId);
    })
  }

}
