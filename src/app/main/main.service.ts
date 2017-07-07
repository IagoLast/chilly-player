import { LastfmService } from '../lastfm.service';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class MainService {

  public showSpinner: Subject<any> = new Subject();
  public tracks: Subject<any> = new Subject();

  constructor(private lastFmService: LastfmService) {
    this.getPopular();
  }

  public search(query: String) {
    if (!query) {
      return;
    }
    this.showSpinner.next(true);
    this.lastFmService.search(query).subscribe(this.onTracks.bind(this));
  }

  public searchAlbum(query: String) {
    if (!query) {
      return;
    }
    this.showSpinner.next(true);
    this.lastFmService.searchAlbum(query).subscribe(this.onTracks.bind(this));
  }

  public getPopular() {
    this.showSpinner.next(true);
    this.lastFmService.getPopular().subscribe(this.onTracks.bind(this));
  }

  private onTracks(tracks) {
    this.tracks.next(tracks);
    this.showSpinner.next(false);
  }

}
