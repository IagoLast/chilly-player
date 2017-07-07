import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
const KEY_LASTFM = 'dec27cd158ba001c06e280ea9ff8513d';



@Injectable()
export class LastfmService {

  constructor(private http: Http) { }

  public getPopular() {
    return this.http
      .get(`https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${KEY_LASTFM}&format=json&limit=100`)
      .map(res => res.json())
      .map(response => {
        return response.tracks.track.map(track => {
          return {
            artist: track.artist.name,
            image: track.image[2]['#text'],
            name: track.name,
          }
        });
      });
  }


  public search(query: String) {
    return this.http
      .get(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=${KEY_LASTFM}&format=json&limit=100`)
      .map(res => res.json())
      .map(response => {
        return response.results.trackmatches.track.map(track => {
          return {
            artist: track.artist,
            image: track.image[2]['#text'],
            name: track.name,
          }
        });
      });
  }


  public searchAlbum(query: String) {
    return this.http
      .get(`https://ws.audioscrobbler.com/2.0/?method=album.search&album=${query}&api_key=${KEY_LASTFM}&format=json`)
      .map(res => res.json())
      .map(response => response.results.albummatches.album.map(album => {
        return {
          artist: album.artist,
          image: album.image[2]['#text'],
          name: album.name,
        }
      }))
  }
}
