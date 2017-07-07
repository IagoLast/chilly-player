import { OnDestroy } from '@angular/core/core';
import { WindowService } from '../window.service';
import { PlayerService } from '../player.service';
import { YoutubeService } from '../youtube.service';
import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit, OnDestroy {
  @Input() track;
  @Input() callback: Function;

  public name: string;
  public src: String = 'assets/vinyl.png';

  constructor(
    private youtubeService: YoutubeService,
    private playerService: PlayerService,
    private el: ElementRef,
    private $window: WindowService) { }

  ngOnInit() {
    this.name = this.track.name + ' ' + this.track.artist
  }

  ngAfterViewInit() {
    let el = this.el.nativeElement.querySelector('img');
    if ('IntersectionObserver' in this.$window.nativeWindow) {
      this.$window.nativeWindow.observer.observe(this.el.nativeElement.querySelector('img'));
    } else {
      el.setAttribute('src', el.getAttribute('data-o-src'));
    }
  }

  ngOnDestroy() {
    if ('IntersectionObserver' in this.$window.nativeWindow) {
      this.$window.nativeWindow.observer.unobserve(this.el.nativeElement.querySelector('img'));
    }
  }
}
