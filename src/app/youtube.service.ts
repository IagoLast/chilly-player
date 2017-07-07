import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from "rxjs/Subject";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeService {
  private KEY_YOUTUBE: string = 'AIzaSyDZU_yBJllAoiU0C5bomj_j9sdW3htnLic';
  private BASE_URL: string = 'https://content.googleapis.com/youtube/v3/search?part=id,snippet&videoEmbeddable=true&type=video';


  constructor(private http: Http) { }


  loadVideo(query) {
    return this.http.get(`${this.BASE_URL}&q=${query}&key=${this.KEY_YOUTUBE}`)
      .map(this.extractData.bind(this))
  }

  private extractData(res: Response): String {
    return res.json().items[0].id.videoId;
  }
}
