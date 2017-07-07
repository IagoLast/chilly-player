import { WindowService } from './window.service';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class PlayerService {
  public state: Subject<number> = new Subject();
  public text: Subject<string> = new Subject();
  public percentage: Subject<string> = new Subject();
  private player;
  private window;
  private hacked: Boolean = false;

  public get STATES() {
    return {
      UNSTARTED: -1,
      ENDED: 0,
      PLAYING: 1,
      PAUSED: 2,
      BUFFERING: 3,
      CUED: 5,
    }
  }

  constructor(private $window: WindowService) {
    this.state.next(-1);
    this.window = $window.nativeWindow;
    this.window.onYouTubeIframeAPIReady = () => {
      new this.window.YT.Player('player', {
        height: '100%',
        width: '100%',
        playerVars: {
          autoplay: 1,
          controls: 2,
          rel: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          showinfo: 0,
          wmode: 'opaque',
          enablejsapi: 1,
          fs: 0,
          playsinline: 1,
        },
        videoId: 'I-AWRmSJc8Q',
        events: {
          onReady: event => {
            setInterval(() => {
              this.percentage.next(this.getPercentage());
            }, 250);
            this.player = event.target;
          },
          onStateChange: this.onStateChange.bind(this),
        }
      });
    }
  }


  loadTrack(text: string, id) {
    this.loadVideoById(id);
    this.text.next(text);
  }

  loadVideoById(id) {
    return this.player.loadVideoById(id);
  }

  getPlayerState() {
    if (!this.player) {
      return this.STATES.UNSTARTED;
    }
    return this.player.getPlayerState();
  }

  play() {
    this.player.playVideo();
  }

  pause() {
    this.player.pauseVideo();
  }

  getDuration() {
    return this.player.getDuration();
  }

  getCurrentTime() {
    return this.player.getCurrentTime();
  }

  seekTo(seconds) {
    return this.player.seekTo(seconds, true);
  }

  toggle() {
    const state = this.player.getPlayerState();
    if (state === this.STATES.PAUSED) {
      this.play();
    }
    if (state === this.STATES.PLAYING) {
      this.pause();
    }
  }

  onStateChange(event) {
    this.state.next(event.data);
  }

  hack() {
    if (!this.hacked) {
      this.play();
    }
    this.hacked = true;
  }

  getPercentage() {
    let time = 0;
    switch (this.getPlayerState()) {
      case this.STATES.PAUSED:
      case this.STATES.PLAYING:
        time = (this.getCurrentTime() / this.getDuration()) * 100;
        break;
      default:
        break;
    }
    return time + '0%';
  }
}
