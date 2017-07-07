import { MainService } from '../main/main.service';
import { YoutubeService } from '../youtube.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  public query: String;

  constructor(private mainService: MainService) { }

  ngOnInit() {

  }

  public search(event, query) {
    event.target.blur();
    this.mainService.search(query);
  }

  public searchAlbum(query: String) {
    if (!query) {
      return;
    }
    this.mainService.searchAlbum(query);
  }

}
